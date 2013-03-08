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

## Create our API

**main.rb**

``` ruby
require 'sinatra'
require 'redis'
require 'json'
require 'pp'

configure :production do
    uri = URI.parse(ENV["REDISGREEN_URL"])
    $redis = Redis.new(url: ENV["REDISGREEN_URL"], driver: :hiredis)
end

configure :test do
    $redis = Redis.new(url: ENV["WERCKER_REDIS_URL"], driver: :hiredis)
end

configure :development do
  $redis = Redis.new()
end


get '/' do
  "Transform!"
end

get '/decepticons.json' do
  content_type :json
  decepticons = $redis.smembers('decepticons')
  return decepticons.to_json
end

get '/add' do
  erb :new
end

post '/add' do
  data = JSON.parse(request.body.read)
  $redis.sadd('decepticons', data["decepticon"])
  redirect '/'
end
```

## Create a Rack Configuration

**config.ru**

``` ruby
require './main'
run Sinatra::Application
```

## Create a spec folder and add a Spec Helper

** spec/spec_helper.rb **

``` ruby
  require File.join(File.dirname(__FILE__), '..', 'main.rb')

  require 'sinatra'
  require 'rack/test'

  set :environment, :test
  set :run, false
  set :raise_errors, true
  set :logging, false

  def app
    Sinatra::Application
  end

  RSpec.configure do |config|
    config.include Rack::Test::Methods
  end
```

## Write a test

We are going to write a simple unit test using the [rspec](http://rspec.info/) framework.

**spec/app_spec.rb**

``` ruby

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