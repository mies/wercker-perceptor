# Wercker concepts

This page explains some of the core concepts of wercker:

* [builds](#builds)
* [tests](#tests)
* [provisioning](#provisioning)
* [Deploy targets](#deploy-targets)
* [deploys](#deploys)
* [collaborators](#collaborators)
* [Google Chrome extension](#google-chrome-extension)

<a id="builds"></a>
## Builds

Every time a push to git is done, Wercker pulls this commit. Wercker compiles, tests and packages the code.

When no compilation is needed, this step is skipped. This process is called building, and in Wercker
each seperate push leads to one Build.

In the project overview there is a list of the latest builds.

More information: [Build](build)

<a id="tests"></a>
## Tests

During a [Build](#builds) tests can be run. By default Wercker tries to run the tests. For example in a Node.js environment
```npm test``` is executed.

To add custom tests, use the `custom steps` property in [wercker.json](werckerjson).

<a id="provisioning"></a>
## Provisioning

Before deploying a [Build](#builds) to a [Deploy Target](#deploy-targets), you first have to create this environment. This process is called provisioning, if you want to deploy to Heroku, Heroku takes care of provisioning.

More information: [Provisioning](provisioning)

<a id="deploy-targets"></a>
## Deploy targets

To deploy code, a deploy target needs to be created. There are two types: Heroku and Custom.

With Heroku you can deploy your code to Heroku and with Custom you can deploy to your own servers, like Amazon and RackSpace.

Custom deploy code can be specified in [wercker.json](werckerjson)

It's possible to set environment variables that can be used in your custom deploy code.

``` json
{
  "pre-deploy" : ["echo my-pre-deploy-script.sh"],
  "deploy" : ["echo my-deploy-script.sh"],
  "post-deploy" : ["echo my-post-deploy-script.sh"]
}
```

More information: [Deployment](deployment)

<a id="deploys"></a>
## Deploys

When a [Build](#builds) is passed, it can be deployed to a [Deploy Target](#deploy-targets).
This can be done from the [Build](#builds) overview

More information: [Deployment](deployment)

<a id="collaborators"></a>
## Collaborators

*Under construction*


<a id="google-chrome-extension"></a>
## Google Chrome extension

You can get real-time notifications of what is happining with your projects, using
<a href="https://chrome.google.com/webstore/detail/wercker-build-notificatio/hdbipaohmcaebblpcioidpgkeijnikch" target="_blank">the Wercker Google Chrome extension</a>.
You will get notified when the following events occur:

*   [Build](#builds) failed
*   [Deploy](#deploys) passed or failed
*   Provisioning passed or failed

You can find <a href="https://chrome.google.com/webstore/detail/wercker-build-notificatio/hdbipaohmcaebblpcioidpgkeijnikch" target="_blank">the extension</a> in the Chrome web store.

