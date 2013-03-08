# wercker.json

The `wercker.json` file allows you to set up your test environment, ranging from any services you might need to custom test commands. The [services](http://devcenter.wercker.com/articles/available-services/) section describes how to use different databases and other backend services. In this article we'll go into detail on how to get initially started with the `wercker.json` file. The article assumes you know what steps there are for each build as described on the [build](build) page.

Below we see a `wercker.json` sample file:

** wercker.json **

``` json
{
"custom steps" : {
    "setup locale" : [
      "export LANG=en_US.UTF-8",
      "export LC_ALL=en_US.UTF-8",
    ],
    "less" : "node_modules/less/bin/lessc public/style/site.less public/style/site.css"
  },
  "post-deploy test" : ["curl $BASE_URL| grep home"]
}
```

By utilizing the `custom steps` directive we can add any build steps we might like, in this case exporting some language settings and compiling our `less` stylesheets.

We also add a `post-deploy test` directive to see if our application is running through a `curl` command.

Other clauses available in `wercker.json`:

``` json
{
  "lang" : "python",
  "version" : "2.7",
  "packages" : ["nano", "vim"],
  "stepname" : false,
  "services" : { "servicename" : true },
  "pre-install" : ["echo my-pre-install-script.sh"],
  "pre-test" : ["echo my-pre-test-script.sh"],
  "post-test" : ["echo my-post-install-script.sh"],
  "pre-deploy" : ["echo my-pre-deploy-script.sh"],
  "deploy" : ["echo my-deploy-script.sh"],
  "post-deploy" : ["echo my-post-deploy-script.sh"],
  "pre-provision" : ["echo my-pre-provision-script.sh"],
  "provision" : ["echo my-provision-script.sh"],
  "post-provision" : ["echo my-post-provision-script.sh"]
}
```

All commands are logged by default. If you have sensitive information, it is possible to hide commands from the log.
In stead of the command, use an object and set log to false:

``` json
{
  "pre-install" : [{ "cmd" : "echo my-pre-install-script.sh", "log" : false }]
}
```

You can combine commands that should be logged and that shouldn't be logged:

``` json
{
  "pre-install" : ["echo 1", { "cmd" : "echo my-pre-install-script.sh", "log" : false }, "echo 2"]
}
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
``` json
{
  "packages" : ["nano", "vim"]
}
```