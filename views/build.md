# Build

To know the quality of your code, it is inpected everytime you push new code.

Wercker runs default scripts, so the basics are being tested.

In [wercker.json](werckerjson) you can specify additional scripts that need to be run. Also you can disable any step.


<table class="diagram">
  <tr>
    <td>$git push</td>
    <td>Get code</td>
    <td>Setup Environment</td>
    <td>Environment Variables</td>
    <td>Platform</td>
    <td>Pre-install</td>
    <td>Dependencies</td>
    <td>Pre-test</td>
    <td>Auto test</td>
    <td>Custom test</td>
    <td>Post-test</td>
    <td>Package</td>
    <td>Report</td>
  </tr>
</table>


## $git push

When new code is pushed to git, Wercker get's a notification.

## Get code

The repository is retrieved, together with any git submodules.

Wercker needs permission to the repository. You can add the user 'wercker' to your project with read rights.

## Setup Environment

A new sandbox is created to run the build.

Wercker tries to determine which programming language is used. When no language can be determined, it falls back to "blank", a simple sandbox.

In [wercker.json](werckerjson) you can use <code>lang</code> to override the programming language.

New sandboxes for supporting services are also created.

The [services](available-services) defined in [wercker.json](werckerjson) in <code>services</code> are created.

## Environment Variables

Environment variables that can be used in code are set.

```
WERCKER=true
CI=true
WERCKER_ROOT=/build/X
WERCKER_PLATFORM_VERSION=X.X.X
```

Each [service](available-services) also sets some environment variables.

## Platform

The programming language is setup. For Ruby this means rbenv, for Python virtualenv and for Node.js nodeenv.

The default version of the programming language is used.

You can use <code>version</code> in [wercker.json](werckerjson) to override this version.

## Pre-install

Before installing the dependencies of your project, this step is run.
This is a good place to set your own environment variables and run apt-get install.

The script or scripts in [wercker.json](werckerjson) in <code>preInstallScripts</code> are run.

## Dependencies

The depencies of your project are installed.

For Ruby this means <code>bundle install</code>, for Python <code>pip install -r requirements.txt</code>,
for Node.js <code>npm install</code> and for blank <code>make</code>

## Pre-test

Before running the tests of your project, this step is run.

The script or scripts in [wercker.json](werckerjson) in <code>preTestScripts</code> are run.

## Auto test

Wercker tries to automatically run the tests of your project.

For Ruby this means <code>bundle exec rake</code>,
for Node.js <code>npm test</code> and for blank <code>make test</code>.

If your Node.js project contains a jshint configuration file, jshint is also run.

In [wercker.json](werckerjson) you can disable a step using <code>stepname : false</code>.

## Custom test

The script or scripts in [wercker.json](werckerjson) in <code>customSteps</code> are run.

## Post-test

After running the tests of your project, this step is run.

The script or scripts in [wercker.json](werckerjson) in <code>postTestScripts</code> are run.

## Package

If all steps are successful, the resulting folder is packaged to a zip file, to be used later in the deployment process.

## Report

After the build finishes, the log of each step can be retrieved by going to the build in the project overview.

When using [the Google Chrome extension](concepts#google-chrome-extension) a notification is shown if the build failed.
