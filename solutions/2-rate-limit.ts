/*
 * the doSomeWork function is expensive to run and must be protected from abuse
 * throw an error if the function is called more than 5 times in a 5 second window
 */

import redis from "ioredis";
import { REDIS_URL } from "../config";

const client = new redis(REDIS_URL);

(async function () {
  await client.flushall();
})();

async function rateLimiter(userId, maxRequests, windowSizeInSeconds) {
  const key = `rate:${userId}`;
  const current = await client
    .multi() // Starts a Redis transaction block
    .incr(key) // Increments the count for the user ID. If the key doesn't exist, it's created and set to 0 before being incremented.
    .expire(key, windowSizeInSeconds) // Sets an expiration time (in seconds) on the key. This resets the rate limit window.
    .exec(); // Executes all commands in the transaction block atomically.

  if (!current || current.length === 0) {
    return false; // Error or no commands were run
  }

  for (let i = 0; i < current.length; i++) {
    if (current[i][0]) {
      console.error("Redis error:", current[i][0]);
      return false; // Error in command
    }
  }

  // Assuming the first command in multi is always incr
  const requestCount = current[0][1] as number;

  if (requestCount > maxRequests) {
    return false; // limit exceeded
  }

  return true; // under the limit
}

async function doSomeWork() {
  // Use a constant string to limit all requests with a single ratelimit
  // Or use a userID, apiKey or ip address for individual limits.

  const success = await rateLimiter("some-user", 2, 1);

  if (!success) {
    throw new Error("Rate limit exceeded");
  }

  return "Success";
}

for (let i = 0; i < 5; i++) {
  doSomeWork()
    .then(() => console.log(`Request ${i} succeeded`))
    .catch((err) =>
      console.error(`Request ${i} failed with error: ${err.message}`)
    );
}
