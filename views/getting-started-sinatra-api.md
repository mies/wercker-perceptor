# Getting Started with a Sinatra API

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-ruby-api)

### Table of Contents
* Prerequisites
* Add project to wercker
* Write the API
* Create a Rack Configuration
* Declare your gem dependencies using Bundlder
* Create a spec folder and add a Spec Helper
* Create a spec
* Create a Rakefile
* Create a wercker.json file
* Initiate your Git repository and push your changes to Github
* Deploying to Heroku

## Prerequisites
* Basic knowledge on Ruby, Sinatra and have Ruby 1.9.3 installed alongside Rubygems, Bundler and Sinatra.
* A wercker account and a GitHub repository for the code you will write

## Add project to wercker
Add your GitHub project to wercker


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

## Create your spec

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

## Create a wercker.json file

For wercker to know how to run our tests we create a `wercker.json` file
in our repository:

** wercker.json **

``` javascript
    {
      "custom steps" : {
            "rake" : ["bundle exec rake"]
        }
    }
```

Don't forget to add this to your Git repository.

## Initiate your Git repository and push your changes to Github

```
  $ git init
  $ git commit -m 'init'
  $ git push origin master
```

## Deploying to Heroku

If you have a Heroku account you can now create an application and
deploy it through wercker. If not, sign up at
[http://heroku.com](http://heroku.com).

```
 $ heroku create
```

Now add the wercker add-on through the Heroku CLI:

```
 $ heroku addons:add wercker
```

The wercker add-on page can be invoked through the resources page on the
Heroku dashboard or via the Heroku CLI:

```
 $ heroku addons:open wercker
```

You can now add your project to wercker via the [wercker command line
interface](http://devcenter.wercker.com/articles/cli):

```
 $ wercker create
```

This will trigger a build. If all is well you can now deploy to Heroku,
again via the CLI:

```
 $ wercker deploy
```
Happy coding!
