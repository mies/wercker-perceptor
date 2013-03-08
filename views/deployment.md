# Deployment

The main benefit of using wercker is that you can Deploy Continuously.

Wercker support deploying to Heroku and to your own servers (Custom).

In [wercker.json](werckerjson) you can specify which scripts need to be run.

For Custom the best practice is to create a folder named `deploy` in the root of your project and put everything related to deployment in this folder.


<ol class="steps steps--fourteen"><li><span>1</span>[Create deploy target](#create_deploy_target)</li><li><span>2</span>[Create build](#create_build)</li>
    <li><span>3</span>[Start](start)</li>
    <li><span>4</span>[Create environment](#create_environment)</li>
    <li><span>5</span>[Setup](#setup)</li>
    <li><span>6</span>[Pre-deploy](#predeploy)</li>
    <li><span>7</span>[Pre-deploy custom](#predeploy_custom)</li>
    <li><span>8</span>[Deploy](#deploy)</li>
    <li><span>9</span>[Post-deploy custom](#postdeploy_custom)</li>
    <li><span>10</span>[Post-deploy](#postdeploy)</li>
    <li><span>11</span>[Post-deploy test](#postdeploy_test)</li>
    <li><span>12</span>[Report](#report)</li>
    <li><span>13</span>[Post-deploy log test](#postdeploy_log_test)</li>
    <li><span>14</span>[Post-deploy metrics test](#postdeploy_metrics_test)</li>
</ol>


## <a id="create_deploy_target"></a>Create deploy target

To specify where to deploy to, create a deploy target in the deployment tab of a project.

There are two types: Heroku and Custom.

Heroku is used to deploy to Heroku's PaaS offering, and Custom can be used to deploy to your own servers (Amazon, Rackspace, etc)

Environment variables needed during deployment can be set by the administrator.

## <a id="create_build"></a>Create build

Before deploying, a build needs be to be created of which all tests have passed.

More information: [Build](build)

## <a id="start"></a>Start

When ready to deploy, go to the build in wercker, click Deploy and pick your Deploy Target.

It is also possible to automatically start a deploy by adding #*deploytargetname* in your commit message. This is not recommended for your production environment.

Only successful builds will be deployed.

## <a id="create_environment"></a>Create environment

A sandbox is created for the deployment.

For Custom this sandbox has the same specifications as the sandbox that was used to create the build.

For Heroku a Heruko sandbox is created.

The following environment variables are set:

```
WERCKER=true
DEPLOY=true
WERCKER_ROOT=/build/X
WERCKER_PLATFORM_VERSION=X.X.X
WERCKER_POSTDEPLOY_WARMUP_SECONDS=30
```

**Heroku only**

```
HEROKU_USER=username
HEROKU_KEY=apikey (hidden from log)
HEROKU_APP_NAME=appname
```

## <a id="setup"></a>Setup

**Heroku only**

A test is performed to check if your API key still is valid and a ssh-key is generated to communicate with Heroku.

## <a id="predeploy"></a>Pre-deploy

**Heroku only**

Maintance mode is set to true (`heroku maintenance:on`).

## <a id="predeploy_custom"></a>Pre-deploy custom

During pre-deploy you can run scripts needed to run before the deployment itself.

For Heroku, these script are run on the server of Heroku (`heroku run`)

The script or scripts in [wercker.json](werckerjson) in `pre-deploy` are performed.

## <a id="deploy"></a>Deploy

During deploy the script(s) needed to do the actual deployment are executed.

### <a id="heroku"></a>Heroku

The code is pushed to Heroku: `git push -f git@heroku.com:$HEROKU_APP_NAME.git master`.

### <a id="custom"></a>Custom

The script or scripts in [wercker.json](werckerjson) in `deploy` are run.

## <a id="postdeploy_custom"></a>Post-deploy custom

During post-deploy you can execute scripts needed to run after the deployment itself.

For Heroku, these script are performed on the server of Heroku (`heroku run`)

The script or scripts in [wercker.json](werckerjson) in `post-deploy` are run.


## <a id="postdeploy"></a>Post-deploy

**Heroku only**

The process is restarted and maintance mode is set to false (`heroku ps:restart` `heroku maintenance:off`).

## <a id="postdeploy_test"></a>Post-deploy test

During post-deploy test you can run scripts needed to verify if the deployment was successful.

For example, you can try to download the homepage and check if a specfic word exists on the page.

```
  "post-deploy test" : ["curl $URL| grep welcome"]
```


The script or scripts in [wercker.json](werckerjson) in `post-deploy test` are run.

## Report

After the provisioning ends, the log can be retrieved in the provisioning tab of the project.

When using [the Google Chrome extension](concepts#google-chrome-extension) a notification is shown whether is passed or failed.


## <a id="postdeploy_log_test"></a>Post-deploy log test

It is possible to check the logs to verify if the new version is running without any problems.

This is done a few minutes after deploying, so there is some time to fill the logs.

Wercker currently supports <a href="http://loggly.com/" target="_blank">Loggly</a> as source to query.

To use Loggly, two steps need to be taken by the administrator.

* In the Admin tab of the project a connection should be made with Loggly
* In the Deploy Target the Loggly domain and the query that retrieves errors should be specified.

The query can be `inputname:app json.application:wercker-sentinel json.level:error` for example.

For more information, see the <a href="http://www.loggly.com/support/using-data/search-basics/" target="_blank">Loggly documentation</a>.

**Heroku**

The Heroku logs are also checked to see if an error has occurred.




## <a id="postdeploy_metrics_test"></a>Post-deploy metrics test

It is possible to check if certain metrics are 'off' after deploying.

This is done a few minutes after deploying, so there is some time to collect some metrics.

The most simple implementation is a heartbeat. Every 30 seconds a heartbeat is send.
If after deploying the heartbeat stops, it's clear something is wrong.

[Heartbeat implementation in Node.js](graphite-hearbeat-nodejs)

Wercker uses <a href="http://graphite.wikidot.com//" target="_blank">Graphite</a> to collect the metrics.

In the deployment tab, you can find the servername of the Graphite server. You also need the metrics key, to identify which Deploy Target is sending metrics.

For more information about Graphite, see the <a href="http://graphite.readthedocs.org/" target="_blank">Graphite documentation</a>.

