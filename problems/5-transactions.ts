/*
 * We need to execute several operations on the Redis database
 */

import redis from "ioredis";
import { REDIS_URL } from "../config";

const client = new redis(REDIS_URL);

(async function () {
  await client.flushall();
})();

async function run() {
  // Initially set key 'shouldFail' to a non-integer value
  await client.set("shouldFail", "notAnInteger");

  const pipeline = client.multi();

  pipeline.set("key1", "value 1");
  pipeline.incr("shouldFail");
  pipeline.set("key2", "value 2");

  await pipeline.exec();

  const value1 = await client.get("key1");

  console.log("value 1: ", value1);
  console.log("value 2: ", await client.get("key2"));

  console.log("shouldFail value: ", await client.get("shouldFail"));
}

run();
