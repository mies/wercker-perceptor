# Getting stated with Rails and Mongodb on Wercker
You can find the code for this tutorial on [Github](https://github.com/mies/mongodb-demo)

### Table of Contents
* Prerequisites
* Add project to Wercker
* Create a new Rails project
* Declare dependencies
* Create your mongoid configuration
* Create a wercker.json file
* TODO: Create a Procfile and Heroku deploy target
* Push your changes to Github
* TODO: Add Mongolab
* TODO: Deploy to Heroku

## Create your rails project

``` bash
rails new mongodb-demo --skip-active-record
```

## Declare dependencies

**Gemfile**

``` ruby
gem 'mongoid
```
## Create your mongoid configuration

Generate a `mongoid.yml` file

``` bash
rails g mongoid:config
```

and update it:

``` bash
<%= ENV['WERCKER_MONGODB_HOST'] %>
```

## Create your wercker.json

**wercker.json**

``` javascript
{
  "services" :
  {
    "mongodb" : true
  }
}
```

## Push to GitHub

``` bash
git add .
git commit -am 'init'
git push origin master
```

