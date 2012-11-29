# Getting started with Sinatra and Redis on Wercker

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

## Specify dependencies through a Gemfile

We declare our dependencies through a `Gemfile` file:

**Gemfile**

``` ruby
source 'http://rubygems.org'

gem 'sinatra'
gem 'redis'
gem 'hiredis'

group :test do
  gem 'rspec'
  gem 'rack-test'
end
```

## Write a test

We are going to write a simple unit test using the [should framework](https://github.com/visionmedia/should.js)


**test/test.js**

``` ruby

```

## Create a wercker.json file

Now we're ready to create our `wercker.json` file to specify that we want to use Redis for our code:

**wercker.json**

``` javascript
{
  "services" : {
  "redis" : true
  }
}
```

## Push out your code

``` bash
$git push origin master
```