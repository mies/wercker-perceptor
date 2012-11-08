# Getting Started with Flask

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-flask-api)

### Table of Contents
* Prerequisites
* Set up virtualenv
* Declare dependencies through `requirements.txt`
* Add project to Wercker
* Write the API
* Create a test folder and add a unit test
* Create a Procfile and Heroku deploy target
* Push your changes to Github
* Deploy to Heroku

## Prerequisites
* Basic knowledge on Python and the [Flask](http://flask.pocoo.org) micro framework
* Have Python 2.7 and [virtualenv](http://pypi.python.org/pypi/virtualenv) installed
* Use [pip](http://pypi.python.org/pypi/pip) for dependencies
* A Wercker account and a GitHub repository for the code you will write

## Set up our Virtualenv

Within your project folder:

	:::bash
	$ virtualenv venv --distribute
	New python executable in venv/bin/python
	Installing distribute...............done.
	Installing pip...............done.

And now activate your newly created environment:

	:::bash
	$ source venv/bin/activate

## Declare dependencies in a `requirements.txt` file

	:::bash
	$ pip install flask
	$ pip freeze > requirements.txt

## Add project to Wercker
Add your GitHub project to Wercker using the Wercker dashboard
* Goto `Add project`
* Pick GitHub and select your repository for this project

## Write the API

Create a simple Flask API

**app.py**

    :::python

	import os
	from flask import Flask
	from flask import Response
	from flask import json

	app = Flask(__name__)

	@app.route('/')
	def hello():
	  return 'Hello Cybertron!'

	@app.route('/stunticons.json')
	def stunticons():
	  data = ["Motormaster", "Dead End", "Breakdown", "Wildrider", "Drag Strip"]
	  resp = Response(json.dumps(data), status=200, mimetype='application/json')
	  return resp

	if __name__ == '__main__':
	  port = int(os.environ.get('PORT', 5000))
	  app.debug = True
	  app.run(host='0.0.0.0', port=port)


## Create a Procfile and Heroku deploy target

We are going to deploy our simple API to Heroku, which expects a Procfile that defines our process types:

** Procfile

	:::bash
	web: python app.py

From the Wercker dashboard select the deployment tab and create a Heroku deploy target by adding your Heroku API key.from your [account page on Heroku](https://dashboard.heroku.com/account)

## Push your code to GitHub

	:::bash
	git add .
	git commit -m 'init'
	git push origin master

As you have previously added this repository to Wercker, your push gets automatically picked up and triggers a build.

## Deploy your application to Heroku

If all went well you now have a green build, which is ready to be deployed to Heroku.
Select your build and hit the deploy button. Your Python Flask API is now live.