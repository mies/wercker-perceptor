# Getting started with node.js and Redis on Wercker

### Table of Contents
* Prerequisites
* Introducing Redis
* Add project to Wercker
* Write a test
* Push your code
* TODO: Deploy

## Prerequisites
* Basic knowledge on node.js and have Redis installed.
* A Wercker account and a GitHub repository for the code you will write

## Introducing Redis
Redis is an open-source key-value store that can contain data structures such as lists, hashes and sets.

## Add project to Wercker
Add your GitHub project to Wercker

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

## Push out your code

``` bash
$git push origin master
```