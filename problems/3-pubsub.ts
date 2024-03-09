/*
 * When a user sends a message, we need to publish that message out to other systems
 * the other systems are all connected to the same Redis server
 */

import redis, { Redis } from "ioredis";
import { REDIS_URL } from "../config";

const subscriberClient = new Redis(REDIS_URL);

const CHANNEL_NAME = "chat:my_channel";

subscriberClient.subscribe(CHANNEL_NAME, (error) => {
  if (error) {
    console.error("Failed to subscribe", error);
  }
});

subscriberClient.on("message", (channel, message) => {
  console.log(`Got message "${message} on channel "${channel} "${new Date()}"`);
});

const publisherClient = new Redis(REDIS_URL);
setInterval(() => {
  publisherClient.publish(CHANNEL_NAME, "Hello from publishers");
}, 2_000);
