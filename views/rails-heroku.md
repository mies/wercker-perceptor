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

You will now have access to several environment variables including:

	WERCKER_POSTGRESQL_HOST
	WERCKER_POSTGRESQL_PORT
	WERCKER_POSTGRESQL_USERNAME
	WERCKER_POSTGRESQL_PASSWORD
	WERCKER_POSTGRESQL_DATABASE
	
and the convenience url in the form of `postgres://postgres:wercker@10.0.3.223:5432/werckerdb1` that you can access via the environment variable:
	
	WERCKER_POSTGRESQL_URL

Commit and push this file to your git repository.

## Setting up the wercker addon

Wercker comes with a Heroku addon which you can find on the Heroku marketplace (currently still in beta so not visible yet). By running the following command you will add the wercker addon to your Heroku app that you've created in previous steps:

	$ heroku addons:add wercker

This will set up a wizard that will guide you through subsequent steps needed to deploy your application. You can open this wizard and dashboard by running:

	$ heroku addons:open wercker

## Adding your application to wercker

Wercker comes with a command line interface (CLI) that will help you in setting up your applications with wercker. It is a Python program that can be installed via `pip install wercker`. Please see the [specific CLI documentation](/articles/cli "The wercker command line interface") for more. Running `wercker create` will add your application to wercker and set up your Heroku deploy target.

	$ wercker create
	Searching for git remote information...
	Found 1 repository location(s)...

	Please choose one of the following options:
	 (1) git@github.com:wercker/rails-sample.git
	Make your choice (1=default):

This command will also trigger an initial build. If this build is green you are ready for deployment.

## Deploy to Heroku

You can now deploy your green build to Heroku. You can do so via the dashboard that you can invoke by running `heroku addons:open wercker` and hit deploy next to a green build or by executing the following command through the command line interface:

	$ wercker deploy
	
	-----------------------
	welcome to wercker-cli
	-----------------------

	Looking for login token...
	Retreiving builds from wercker...
	Found 1 result(s)...

	┌───┬────────┬──────────┬────────┬──────────┬───────────────────┬──────────────────────┐
	│   │ result │ progress │ branch │ hash     │ created           │ message              │
	├───┼────────┼──────────┼────────┼──────────┼───────────────────┼──────────────────────┤
	│ 1 │ passed │ 100.0%   │ master │ bf3fc264 │ 04/04/13 13:49:19 │ init                 │