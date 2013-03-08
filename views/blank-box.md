# Using a Blank Wercker Box

In this article we will explain how to get started with a blank box if you use a development environment which is not currently supported by Wercker.
You can find the code for this tutorial on [Github](https://github.com/mies/gobox)

## Introducing Go
[Go](http://golang.org) is an open source language developed by Google. We are going to add support for Go on top of a Wercker blank box. If you want to learn more about Go, check out the Go homepage or the excellent site, [Go by Example](https://gobyexample.com)

## Create your Repository and Project on Wercker
First create a repository on [github.com](http://github.com) and add it to Wercker. When picking your environment, select `Create your own (beta)`.

## Create a Wercker.json file
The `wercker.json` file is a powerful way of specifying your development environment requirements. Check out the devcenter [article](/articles/werckerjson) to get up to speed on the topic. For this project we will be using the `custom steps` and `pre-install` declaration to set up our custom box.

**wercker.json**

``` json
{
  "pre-install" : [
    "mkdir -p $HOME/go/src",
    "export GOPATH=$HOME/go",
    "sudo DEBIAN_FRONTEND=noninteractive apt-get -y install golang"
  ],
  "custom steps": { "go build" : "go build" }
}
```

Here we tell Wercker to install the golang package and export our `$GOPATH` environment variable. We use a noninteractive mode so the install does not hang at a menu that pops up.

If we commit and push our `wercker.json` file to GitHub, Wercker picks up our changes and starts the build process. It will install the Go package and we now have a 'Go-enabled' box that's tries to compile your project.

## Create a Go Unit Test

We will now create a simple Go program and a unit test to go along with it.

**intlib.go**

``` go
package intpkg

func Add2Ints(i, j int) int {
    return i + j
}
```

**intlib_test.go**

``` go
package intpkg

import (
    "testing"
    )

func Test_Add2Ints(t *testing.T) {
    t.Error("Hardcoded error")
}
```


## Update our wercker.json file

We are now ready to add a custom build step to our `wercker.json` file so we can run the unit test. Our wercker.json file now looks like:

``` json
{
  "pre-install" : [
    "mkdir -p $HOME/go/src",
    "export GOPATH=$HOME/go",
    "sudo DEBIAN_FRONTEND=noninteractive apt-get -y install golang"
  ],
  "custom steps": {
    "go build" : "go build",
    "go unit test" : "go test"
  }
}

```

Push your changes to Github and see our unit test fail.

Now that you know how to add Go support to Wercker you are ready to take this to the next level and build a Go application with MongoDB support with this article: [Getting Started with Go and MongoDB](/articles/golang-mongo/)