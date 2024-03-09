/*
 * When a user sends a message, we need to publish that message out to other systems
 * the other systems are all connected to the same Redis server
 */

import redis from "ioredis";
import { REDIS_URL } from "../config";
