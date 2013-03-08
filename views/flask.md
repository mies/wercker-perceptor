# Getting Started with Flask

You can find the code for this tutorial on [Github](https://github.com/mies/wercker-flask-api)

### Table of Contents
* Prerequisites
* Set up virtualenv
* Declare dependencies through `requirements.txt`
* Add project to Wercker
* Write the API
* Create a simple unit test
* Create a wercker.json file
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

``` bash
	$ virtualenv venv --distribute
	New python executable in venv/bin/python
	Installing distribute...............done.
	Installing pip...............done.
```

And now activate your newly created environment:

``` bash
	$ source venv/bin/activate
```
## Declare dependencies in a `requirements.txt` file

``` bash
	$ pip install flask
	$ pip freeze > requirements.txt
```

## Add project to Wercker
Add your GitHub project to Wercker using the Wercker dashboard
* Goto `Add project`
* Pick GitHub and select your repository for this project

## Write the API

Create a simple Flask API

**app.py**

```python

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
```

## Create a simple Unit Test

We're now ready to write a simple unit test for our API. We're going to leverage Python's `unittest` module for our testcase and check if the HTTP response code is a `200, OK` and if the json served by the API is the json data that we are expecting.

**app_test.py**

``` python
from app import app

import unittest
import json

class StunticonTestCase(unittest.TestCase):

  def test_index(self):
    tester = app.test_client(self)
    response = tester.get('/stunticons.json', content_type='application/json')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, json.dumps(["Motormaster", "Dead End", "Breakdown", "Wildrider", "Drag Strip"]))

if __name__ == '__main__':
    unittest.main()
```

## Create a wercker.json file

Now that we have our unit test we need to let Wercker know it should run it, we do this through a `wercker.json` file within out project folder.

**werkcer.json**

``` json
{
  "custom steps" : {
    "setup_environment" : {
      "commands": [
        "export LANG=en_US.UTF-8",
        "export LC_ALL=en_US.UTF-8",
        "export WERCKER=true",
        "export VIRTUALENV_DISTRIBUTE=true"
      ]
    },
    "flask_test" : {
      "commands" : [
        "python app_test.py"
      ]
    }
  }
}
```

Here you ca see we added a custom step called `flask_test` that will run `python app_test.py` as a separate buildstep.

## Create a Procfile and Heroku deploy target

We are going to deploy our simple API to Heroku, which expects a Procfile that defines our process types:

**Procfile**

``` bash
	web: python app.py
```

From the Wercker dashboard select the deployment tab and create a Heroku deploy target by adding your Heroku API key.from your [account page on Heroku](https://dashboard.heroku.com/account)

## Push your code to GitHub

``` bash
	git add .
	git commit -m 'init'
	git push origin master
```

As you have previously added this repository to Wercker, your push gets automatically picked up and triggers a build.

## Deploy your application to Heroku

If all went well you now have a green build, which is ready to be deployed to Heroku.
Select your build and hit the deploy button. Your Python Flask API is now live.