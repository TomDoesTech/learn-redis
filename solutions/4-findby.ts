/*
 * We store users in JSON format with their ID as the key
 * write a function to fetch a user by their email address
 */

import redis from "ioredis";
import { REDIS_URL } from "../config";

const client = new redis(REDIS_URL);

(async function () {
  await client.flushall();
})();

const users = Array.from({ length: 10 }, (_, i) => {
  return {
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
  };
});

// insert users
for (const user of users) {
  client.hset(`user:${user.id}`, user);
}

async function findUserByEmail(email) {}

async function run() {
  const user = await findUserByEmail("user1@example.com");

  console.time("findUserByEmail");

  console.log("found the user", user);

  console.timeEnd("findUserByEmail");
}

run();
