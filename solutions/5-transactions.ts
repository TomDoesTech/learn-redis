/*
 * We need to execute several operations on the Redis database
 * We want to execute them atomically
 * If one of the operations fails, we want to rollback the entire transaction
 */

import redis from "ioredis";
import { REDIS_URL } from "../config";

const client = new redis(REDIS_URL);

async function run() {
  // Initially set key 'shouldFail' to a non-integer value
  await client.set("shouldFail", "notAnInteger");
}

run();
