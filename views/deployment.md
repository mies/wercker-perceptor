# Deployment

The main benefit of using Wercker is that you can Deploy Continuously.

Wercker support deploying to Heroku and to your own servers (Custom).

In [wercker.json](werckerjson) you can specify which scripts need to be run.

For Custom the best practice is to create a folder named <code>deploy</code> in the root of your project and put everything related to deployment in this folder.

<table class="diagram">
  <tr>
    <td>Create deploy target</td>
    <td>Create build</td>
    <td>Start</td>
    <td>Create environment</td>
    <td>Setup</td>
    <td>Pre-deploy</td>
    <td>Pre-deploy custom</td>
    <td>Deploy</td>
    <td>Post-deploy custom</td>
    <td>Post-deploy</td>
    <td>Post-deploy test</td>
    <td>Report</td>
    <td>Post-deploy log test</td>
    <td>Post-deploy metrics test</td>
  </tr>
</table>


## Create deploy target

To specify where to deploy to, create a deploy target in the deployment tab of a project.

There are two types: Heroku and Custom.

Heroku is used to deploy to Heroku, and Custom can be used to deploy to your own servers (Amazon, Rackspace, etc)

Environment variables needed during deployment can be set by the administrator.

## Create build

Before deploying, a build needs be to be created and passes all tests.

More information: [Build](build)

## Start

When ready to deploy, go to the build in Wercker, click Deploy and choose your Deploy Target.

It is also possible to automatically start a deploy by adding #*deploytargetname* in your commit message.

Only successful builds will be deployed.

## Create environment

A sandbox is created for the deployment.

For Custom this sandbox has the same specifications as the sandbox that was used to create the build.

For Heroku a Heruko sandbox is created.

## Setup

**Heroku only**

A test is done if your API key still is valid and a ssh-key is generated to communicate with Heroku.

## Pre-deploy

**Heroku only**

Maintance mode is set to true (<code>heroku maintenance:on</code>).

## Pre-deploy custom

During pre-deploy you can run scripts needed to run before the deployment itself.

For Heroku, these script are run on the server of Heroku (<code>heroku run</code>)

The script or scripts in [wercker.json](werckerjson) in <code>preDeploy</code> are run.

## Deploy

During deploy the script(s) needed to do the actual deployment are run.

### Heroku

The code is pushed to Heroku: <code>git push -f git@heroku.com:$HEROKU_APP_NAME.git master</code>.

### Custom

The script or scripts in [wercker.json](werckerjson) in <code>deploy</code> are run.

## Post-deploy custom

During post-deploy you can run scripts needed to run after the deployment itself.

For Heroku, these script are run on the server of Heroku (<code>heroku run</code>)

The script or scripts in [wercker.json](werckerjson) in <code>postDeploy</code> are run.


## Post-deploy

**Heroku only**

The process is restarted and maintance mode is set to false (<code>heroku ps:restart</code> <code>heroku maintenance:off</code>).

## Post-deploy test

During post-deploy test you can run scripts needed to verify if the deployment was successful.

For example you can try to download the homepage and check if a word exists on the page.

```
  "postDeployTest" : ["curl $URL| grep welcome"]
```


The script or scripts in [wercker.json](werckerjson) in <code>postDeployTest</code> are run.

## Report

After the provisioning ends, the log can be retrieved in the provisioning tab of the project.

When using [the Google Chrome extension](concepts#google-chrome-extension) a notification is shown whether is passed or failed.


## Post-deploy log test

It is possible to check the logs to verify if the new version is running without any problems.

This is done a few minutes after deploying, so there is some time to fill the logs.

Wercker currently supports <a href="http://loggly.com/" target="_blank">Loggly</a> as source to query.

To use Loggly, two steps need to be taken by the administrator.

* In the Admin tab of the project a connection should be made with Loggly
* In the Deploy Target the Loggly domain and the query that retrieves errors should be specified.

The query can be <code>inputname:app json.application:wercker-sentinel json.level:error</code> for example.

For more information, see the <a href="http://www.loggly.com/support/using-data/search-basics/" target="_blank">Loggly documentation</a>.

**Heroku**

The Heroku logs are also checked to see if an error has occurred.


<a id="post-deploy-metrics-test"></a>

## Post-deploy metrics test

It is possible to check if certain metrics are off after deploying.

This is done a few minutes after deploying, so there is some time to collect some metrics.

The most simple implementation is a heartbeat. Every 30 seconds a heartbeat is send.
If after deploying the heartbeat stops, it's clear something is wrong.

[Heartbeat implementation in Node.js](graphite-hearbeat-nodejs)

Wercker uses <a href="http://graphite.wikidot.com//" target="_blank">Graphite</a> to collect the metrics.

In the deployment tab, you can find the servername of the Graphite server. You also need the metrics key, to identify which Deploy Target is sending metrics.

For more information about Graphite, see the <a href="http://graphite.readthedocs.org/" target="_blank">Graphite documentation</a>.

