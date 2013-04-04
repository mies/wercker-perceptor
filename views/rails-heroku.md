# Getting started with Rails and Heroku

* Prerequisites
* Create your Rails project
* Set up Heroku
* Create your Procfile
* A note on database configurations
* Adding your application to wercker
* Deploy to heroku

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

Also don't forget to commit this file to your repository.

## A note on database configurations

It is the convention to not include the `database.yml` file in your repository. Wercker will autogenerate one

## Adding your application to wercker

Wercker comes with a command line interface (CLI) that will help you in setting up your applications with wercker. It is a Python program that can be installed via `pip install wercker`. Please see the [specific CLI documentation](/articles/cli "The wercker command line interface") for more.

	$ wercker create