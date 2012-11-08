# Wercker concepts

<a id="builds"></a>
## Builds

Every time a push to git is done, Wercker pulls this commit. Wercker compiles, tests and packages the code.

When no compilation is needed, this step is skipped. This process is called building, and in Wercker
each seperate push leads to one Build.

In the project overview there is a list of the latest builds.

<a id="collaborators"></a>
## Collaborators

*Under construction*

<a id="deploy-targets"></a>
## Deploy targets

To deploy code, a deploy target needs to be created. There are two types: Heroku and Custom.

With Heroku you can deploy your code to Heroku and with Custom you can deploy to your own servers, like Amazon and RackSpace.

Custom deploy code can be specified in [wercker.json](werckerjson)

It's possible to set environment variables that can be used in your custom deploy code.

``` javascript  
  "preDeploy" : ["echo my-pre-deploy-script.sh"]
  
  "deploy" : ["echo my-deploy-script.sh"]
  
  "postDeploy" : ["echo my-post-deploy-script.sh"]
```

<a id="deploys"></a>
## Deploys

When a [Build](#builds) is passed, it can be deployed to a [Deploy Target](#deploy-targets).
This can be done from the [Build](#builds) overview

<a id="tests"></a>
## Tests

During a [Build](#builds) tests can be run. By default Wercker tries to run the tests. For example in a Node.js environment
```npm test``` is executed.

To add custom tests, use the ```customSteps``` property in [wercker.json](werckerjson).

