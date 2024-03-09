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
  client.hset(`users:${user.id}`, user);

  client.set(`users_email_idx:${user.email}`, user.id);
}

async function findUserByEmail(email) {
  const userId = await client.get(`users_email_idx:${email}`);

  const user = await client.hgetall(`users:${userId}`);

  return user;
}

async function run() {
  console.time("findUserByEmail");
  const user = await findUserByEmail("user1@example.com");

  console.log("found the user", user);

  console.timeEnd("findUserByEmail");
}

run();
