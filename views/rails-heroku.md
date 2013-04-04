# Getting started with Rails and Heroku

* Prerequisites
* Create your Rails project
* Set up Heroku
* Create your Procfile
* A note on database configurations
* Creating your wercker.json file
* Adding your application to wercker
* Deploy to heroku

## Prerequisites

* A Heroku account
* Have Python installed if you wish to use the wercker command line interface and utilize `pip` for third-party libraries.
* A GitHub or Bitbucket repository that hosts your code.

## Create your Rails project

We will start with a clean Rails project which we will set up with a Postgres database. In your terminal run the following command:

	$ rails new rails-sample

Next we replace the sqlite gem in your Gemfile with `pg`; the Postgres gem for Ruby.

## Set up Heroku

	$ heroku create
	
## Create your Procfile

We will be using Unicorn as our web server, so we will add it to our Gemfile:

	gem 'unicorn'

Don't forget to run `bundle install` afterwards. Next we will define a Procfile for Heroku:

	web: bundle exec unicorn -p $PORT -E $RACK_ENV

Also don't forget to commit and push this file to your repository.

## A note on database configurations

It is the convention to not include the `database.yml` file in your repository. Wercker will autogenerate one if you have defined a `wercker.json` file with the database you require. See the [services article](/articles/available-services "Available Services") and [wercker.json article](/articles/werckerjson "wercker.json file") for more information. For our Rails application we will leverage Postgres as our database server and set this up in the next step.

## Creating your wercker.json file

The `wercker.json` file helps you define any services you might need for your application such as databases and queues. We will leverage it to set up Postgres. Create a `wercker.json` file with the following contents:

	{
	    "services": {
        	"postgresql" : true
    	}
	}

Commit and push this file to your git repository. You will now have access to several environment variables including:

	WERCKER_POSTGRESQL_HOST
	WERCKER_POSTGRESQL_PORT
	WERCKER_POSTGRESQL_USERNAME
	WERCKER_POSTGRESQL_PASSWORD
	WERCKER_POSTGRESQL_DATABASE
	
and the convenience url in the form of `postgres://postgres:wercker@10.0.3.223:5432/werckerdb1` that you can access via the environment variable:
	
	WERCKER_POSTGRESQL_URL

Please note that if you have not 

## Adding your application to wercker

Wercker comes with a command line interface (CLI) that will help you in setting up your applications with wercker. It is a Python program that can be installed via `pip install wercker`. Please see the [specific CLI documentation](/articles/cli "The wercker command line interface") for more. Running `wercker create` will add your application to wercker and set up your Heroku deploy target.

	$ wercker create
	Searching for git remote information...
	Found 1 repository location(s)...

	Please choose one of the following options:
	 (1) git@github.com:wercker/rails-sample.git
	Make your choice (1=default):

This command will also trigger an initial build.