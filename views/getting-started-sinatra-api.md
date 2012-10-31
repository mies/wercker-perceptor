# Getting Started with a Sinatra API

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-ruby-api)

### Table of Contents
* Prerequisites
* Add project to Wercker
* Write the API
* Create a Rack Configuration
* Declare your gem dependencies using Bundlder
* Create a spec folder and add a Spec Helper
* Create a  Rakefile
* Initiate your Git repository and push your changes to Github

## Prerequisites
* Basic knowledge on Ruby, Sinatra and have Ruby 1.9.3 installed alongside Rubygems, Bundler and Sinatra.
* A Wercker account and a GitHub repository for the code you will write

## Add project to Wercker
Add your GitHub project to Wercker


## Write the API
Create a Sinatra application with the following code:

**main.rb**

``` ruby
require 'sinatra'
require 'json'

get '/' do
  "Hello Cybertron!"
end

get '/decepticons.json' do
  content_type :json
  return {:decepticons => ["Megatron", "Soundwave", "Starscream", "Astrotrain"]}
end
```

## Create a Rack Configuration

**config.ru**

``` ruby
require './main'
run Sinatra::Application
```

## Declare your gem dependencies using Bundler

A basic `Gemfile` for this application would be:

**Gemfile**
  
``` ruby
source :rubygems
gem 'sinatra'
gem 'thin'
gem 'json'
  
group :test do
  gem 'rspec'
end
```

Next, run `bundle install` to set up your local bundle.

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

** spec/spec_app.rb **

``` ruby
  require 'spec_helper'
  
  describe "Decepticon API" do
    it "should respond to GET" do
      get '/decepticons.json'
      last_response.should be_ok
    end
  end
```

## Create a Rakefile

Finally we need to create a Rakefile to run the rspec test:

** Rakefile **

``` ruby
    require 'rspec/core'
  require 'rspec/core/rake_task'

  task :default => :spec

  desc "Run our Spec"
  RSpec::Core::RakeTask.new(:spec)
```

## Initiate your Git repository and push your changes to Github

```
  $ git init
  $ git commit -m 'init'
  $ git push origin master
```