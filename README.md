# Learn Just Enough Redis to be Productive

<img src="redis-logo.svg" width="45%" style="float:left;" />
<img src="upstash.svg" width="45%" />


## Useful links
- [Build & Deploy a Realtime App that Scales with Upstash Redis, Next.js & Fastify](https://youtu.be/cfEqS1A5diM)
- [Upstash Redis](https://upstash.com/?utm_source=tom1)


## What you will learn
- What Redis is
- Why Redis is so popular
- How to use Redis
- How to use Redis to solve some common problems in Node.js

**What you will need**
- Node.js
- Upstash Redis account (free) https://upstash.com/


**What is Redis?**
- Key value store
- Can handle lots of different data structures: https://redis.io/docs/data-types/
- Has lots of features that you’d expect from a database:
    - Pub/Sub https://redis.io/docs/interact/pubsub/
    - Transactions https://redis.io/docs/interact/transactions/
    - Persistence https://redis.io/docs/management/persistence/
    - Programmability with Lua https://redis.io/docs/interact/programmability/


## Video sturcture
1. Getting started with Upstash Redis
2. Basic commands & data structures
3. Problems Redis can solve
    - Caching
    - Rate limiting
    - Pub/Sub
    - Indexes
    - Transactions

## Basic commands
https://redis.io/commands/

- Set `set mykey tom`
- Get `get mykey`
- Del `DEL mykey`
- Set with TTL `SETEX key seconds value`
- Check if key exists `EXISTS mykey`
- List keys `KEYS *`

### Data structures
**JSON**
```
SET user:100 '{"name": "John", "age": 30, "email": "john@example.com"}'
GET user:100
```

**Hash**
Hashes are used to store objects, represented by fields and values.
```
HSET user:101 name "Alice"
HSET user:101 age 24
HSET user:101 email "alice@example.com"

HGET user:101 name
```

**Sets**
Sets are collections of unique elements
```
SADD myset 1 2 3

SMEMBERS myset
```
```
SADD users tom
SADD users alice
SADD users tom

SMEMBERS users
```

**Sorted Sets**
Sorted sets are similar to sets, but every member of a sorted set is associated with a score, that is used in order to take the sorted set ordered, from the smallest to the greatest score.
```
ZADD myzset 1 "one"
ZADD myzset 2 "two"
ZADD myzset 3 "three"

ZRANGE myzset 0 -1
```

**Counters**
```
INCR counter
INCRBY counter 10
DECR counter
DECRBY counter 5

GET counter
```