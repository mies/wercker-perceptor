# Getting started with Express and Mocha

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-nodejs-api)

### Table of Contents
* Prerequisites
* Add project to Wercker
* Write the API
* Declare dependencies through a `package.json` file
* Create a test folder and add a Mocha unit test
* Initiate your Git repository and push your changes to Github

## Prerequisites
* Basic knowledge on node.js, and Express
* Have the Mocha testing framework installed (`npm install -g mocha`).
* A Wercker account and a GitHub repository for the code you will write

## Add project to Wercker
Add your GitHub project to Wercker


## Write the API
Create an Express application with the following code:

**app.js**

``` javascript
  var express = require('express');
  var app = express();
  
  app.get('/', function(req, res){
    res.send("Hello Cybertron!")
  });
  
  app.get('/insecticons.json', function(req, res){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({insecticons : ["Shrapnel","Bombshell", "Kickback"]}));
    res.end();
  });

  var port = process.env.PORT || 5000;
  app.listen(port);
  
  module.exports = app;
```

## Declare our dependencies through a `package.json` file

**package.json**

``` json
  {
    "name": "wercker-nodejs-api",
    "version": "0.0.1",
    "engines" : {
    "node": "0.6.x"
    },
    "dependencies": {
      "express": "3.x",
      "nodeunit": "0.7.4",
      "supertest" : "0.4.0",
      "mocha" : "1.6.0"
    },
    "scripts": {
      "test": "mocha",
      "start": "app.js"
    }
  }
```

Next, run `npm install` to set up your local environment.

## Create a test folder and add a unittest

** test/test.js **

``` javascript
  var request = require('supertest')
    , express = require('express');
  
  var app = require('../app.js');
  
  describe('GET /', function(){
    it('respond with plain text', function(done){
      request(app)
        .get('/')
        .expect(200, done);
    })
  })
  
  describe('GET', function(){
    it('respond with json', function(done){
      request(app)
      .get('/insecticons.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })
```

** Note: For simple node.js applications, Wercker does not need a `wercker.json` file to run the unit tests. It automatically runs them if you've defined them correctly in your `package.json` **

## Initiate your Git repository and push your changes to Github
```
  $ git init
  $ git commit -m 'init'
  $ git push origin master
```