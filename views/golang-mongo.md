# Getting stated with Go and MongoDB on Wercker
You can find the code for this tutorial on [Github](https://github.com/mies/wercker-golang-mongo)

### Table of Contents
* Prerequisites
* Add project to Wercker
* Create your structs
* Create a Unit Test
* Create a wercker.json file
* TODO: Create a Procfile and Heroku deploy target
* Push your changes to Github
* TODO: Add Mongolab
* TODO: Deploy to Heroku

## Prerequisites
For this tutorial you need to have knowledge of [Go](http://golang.org) and MongoDB.
We will be using [mgo](http://labix.org/mgo) as a Go MongoDB driver.

## Add project to Wercker
First, create a repo to hold you code and add your project on Wercker.

## Create your structs

We define our `Decepticon` struct which has a name and a date field, that we can store into MongoDB.

**main.go**
```go
package main

import (
  "time"
)

type Decepticon struct {
  Name string
  Date time.Time
}
```

## Create a Unit Test

Our unit test will create two decepticons and will check if one of them can be retrieved from MongoDB.

**main_test.go**

```go
package main

import (
  "os"
  "testing"

  "labix.org/v2/mgo"
  "labix.org/v2/mgo/bson"
)

func Test_StoreAndFind(t *testing.T) {
  session, err := mgo.Dial(os.Getenv("WERCKER_MONGODB_HOST"))
  if err != nil {
    panic(err)
  }
  defer session.Close()

  conn := session.DB("test").C("decepticons")
  err = conn.Insert(&Decepticon{"Shockwave"}, &Decepticon{"Starscream"})
  if err != nil {
    t.Error("Could not insert a Decepticon")
  }

  result := Decepticon{}
  err = conn.Find(bson.M{"name": "Shockwave"}).One(&result)
  if err != nil {
    t.Error("Could not find a Decepticon")
  }
  t.Log("Test Passed")
}

```

## Create a wercker.json file

Through `wercker.json` we define that we want a MongoDB service on wercker. Through a [blank box definition](/articles/blank-box/) we add support for Go and install our application dependencies, i.e. the Go MongoDB driver. The `customSteps` tells Go to run our unit test.

**wercker.json**

```javascript
{
  "services" : {
    "mongodb" : true
  },
  "customSteps": {
    "go_unit_test" : {
      "commands" : [
      "go test"
      ]
    }
  },
  "preInstallScripts" : [
    "mkdir -p $HOME/go/src",
    "export GOPATH=$HOME/go",
    "sudo DEBIAN_FRONTEND=noninteractive apt-get -y install golang bzr",
    "go get labix.org/v2/mgo"
  ]
}
```
