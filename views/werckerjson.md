# wercker.json

The `wercker.json` file allows you to set up your test environment, ranging from any services you might need to custom test commands. The [services](http://devcenter.wercker.com/articles/available-services/) section describes how to use different databases and other backend services. In this article we'll go into detail on how to get initially started with the `wercker.json` file. The article assumes you know what steps there are for each build as described on the [build](build) page.

Below we see a `wercker.json` sample file:

** wercker.json **

``` json
{
"customSteps" : {
    "say_hi" : "echo hi",
    "setup_environment" : {
      "commands": [
        "export LANG=en_US.UTF-8",
        "export LC_ALL=en_US.UTF-8",
      ]
    },
    "less" : {
      "commands": [
        "less": "node_modules/less/bin/lessc public/style/site.less public/style/site.css"
      ]
    }
  },
  "postDeployTest" : ["curl $BASE_URL| grep home"]
}
```

By utilizing the `customSteps` directive we can add any build steps we might like, in this case exporting some language settings and compiling our `less` stylesheets.

We also add a `postDeployTest` directive to see if our application is running through a `curl` command.

Other clauses available in `wercker.json`:

``` javascript

  "lang" : "python"

  "version" : "2.7"

  "packages" : ["nano", "vim"],

  "stepname" : false

  "services" : { "servicename" : true }

  "preInstallScripts" : ["echo my-pre-install-script.sh"]

  "preTestScripts" : ["echo my-pre-test-script.sh"]

  "postTestScripts" : ["echo my-post-install-script.sh"]

  "preDeploy" : ["echo my-pre-deploy-script.sh"]

  "deploy" : ["echo my-deploy-script.sh"]

  "postDeploy" : ["echo my-post-deploy-script.sh"]

  "preProvision" : ["echo my-pre-provision-script.sh"]

  "provision" : ["echo my-provision-script.sh"]

  "postProvision" : ["echo my-post-provision-script.sh"]
```

All commands are logged by default. If you have sensitive information, it is possible to hide commands from the log.
In stead of the command, use an object and set log to false:

``` javascript
  "preInstallScripts" : [{cmd : "echo my-pre-install-script.sh", log : false}]
```

You can combine commands that should be logged and that shouldn't be logged:

``` javascript
  "preInstallScripts" : ["echo 1", {cmd : "echo my-pre-install-script.sh", log : false}, "echo 2"]
```

### lang

Possible values:

* blank
* nodejs
* python
* ruby

### services

Possible values:

* mongodb
* mysql
* postgresql
* rabbitmq
* redis

### packages

You can use the packages element to install (apt-get) packages which are not already installed.
``` javascript
  "packages" : ["nano", "vim"]
```
