# Getting started with node.js and Redis on Wercker

### Table of Contents
* Prerequisites
* Introducing Redis
* Specify dependencies through package.json
* Add project to Wercker
* Write a test
* Add a wercker.json file
* Push your code
* TODO: Deploy

## Prerequisites
* Basic knowledge on node.js and have Redis installed.
* A Wercker account and a GitHub repository for the code you will write

## Introducing Redis
Redis is an open-source key-value store that can contain data structures such as lists, hashes and sets.

## Add project to Wercker
Add your GitHub project to Wercker

## Specify dependencies through package.json

We declare our dependencies through a `package.json` file:

**package.json**

``` json
{
  "name": "wercker-redis-node",
  "version" : "0.0.1",
  "dependencies" : {
    "should" : "1.2.1",
    "mocha" : "1.6.0",
    "redis" : "0.8.2"
  },
  "engines" : {
    "node" : "0.8.x",
    "npm" : "1.1.x"
  },
  "scripts" : {
    "test" : "mocha",
  }
}
```

## Write a test

We are going to write a simple unit test using the [should framework](https://github.com/visionmedia/should.js)


**test/test.js**

``` javascript
var redis = require('redis')
  , should = require('should');

describe("Decepticons", function() {
  it("", function(done) {
    var client = redis.createClient(process.env.WERCKER_REDIS_PORT, process.env.WERCKER_REDIS_HOST);
    client.sadd('decepticons', 'megatron');
    client.sadd('decepticons', 'shockwave');
    client.sadd('decepticons', 'astrotrain');

    client.smembers('decepticons', function(err, value) {
    if (err) {
      console.log(err);
    }
    value.should.eql(['astrotrain', 'shockwave','megatron']);
    done();
    });
  });
}
```

## Create a wercker.json file

Now we're ready to create our `wercker.json` file to specify that we want to use Redis for our code:

**wercker.json**

``` json
{
  "services" : {
    "redis" : true
  }
}
```

## Push out your code

``` bash
git push origin master
```