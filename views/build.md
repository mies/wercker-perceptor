# Build

To know the quality of your code, it is inpected every time you push out new code.

Wercker runs several default scripts, such that the basics will be tested.

In [wercker.json](werckerjson) you can specify additional scripts that need to be run. You can also disable any step.

<ol class="steps"><li><span>1</span>[git push](#git_push)</li><li><span>2</span>[Get code](#get_code)</li><li><span>3</span>[Setup Environment](#setup_environment)</li><li><span>4</span>[Environment Variables](#environment_variables)</li><li><span>5</span>[Platform](#platform)</li><li><span>6</span>[Pre-install](#pre_install)</li><li><span>7</span>[Dependencies](#dependencies)</li><li><span>8</span>[Pre-test](#pre_test)</li><li><span>9</span>[Auto test](#auto_test)</li><li><span>10</span>[Custom test](#custom_test)</li><li><span>11</span>[Post-test](#post_test)</li><li><span>12</span>[Package](#package)</li><li><span>13</span>[Report](#report)</li>
</ol>
## <a id="git_push"></a>git push ##

When new code is pushed to git, wercker receives a notification.

## <a id="get_code"></a> Get code

The repository is retrieved, alongside any git submodules.

Wercker needs permission to the repository. You can add the user 'wercker' to your project with read rights.

## <a id="setup_environment"></a>Setup Environment

A new sandbox is created in which the build is run.

Wercker tries to determine which programming language is used. When no language can be determined, it falls back to "blank", a simple sandbox.

In [wercker.json](werckerjson) you can use `lang` to override the programming language.

New sandboxes for supporting services are also created.

The [services](available-services) defined in [wercker.json](werckerjson) in `services` are created.

## <a id="environment_variables"></a> Environment Variables

Environment variables that can be used in code are set.

```
WERCKER=true
CI=true
WERCKER_ROOT=/build/X
WERCKER_PLATFORM_VERSION=X.X.X
```

Any [service](available-services) used will also set several environment variables.

## <a id="platform"></a>Platform

The programming language is set up. For Ruby this means rbenv, for Python virtualenv and for Node.js nodeenv.

The default version of the programming language is used.

You can use `version` in [wercker.json](werckerjson) to override this version number.

## <a id="pre_install"></a>Pre-install

Before installing the dependencies of your project, this step is run.
This is a good place to set your own environment variables and run apt-get install for any library you might need.

The script or scripts in [wercker.json](werckerjson) in `pre-install` are run.

## <a id="dependencies"></a>Dependencies

The depencies of your project are installed.

For Ruby this means `bundle install`, for Python `pip install -r requirements.txt`,
for Node.js `npm install` and for blank `make`

## <a id="pre_test"></a>Pre-test

Before running the tests of your project, this step is run.

The script or scripts in [wercker.json](werckerjson) in `pre-test` are run.

## <a id="auto_test"></a>Auto test

Wercker tries to automatically run the tests of your project.

For Ruby this means `bundle exec rake`,
for Node.js `npm test` and for blank `make test`.

If your Node.js project contains a jshint configuration file, jshint is also run.

In [wercker.json](werckerjson) you can disable a step using `stepname : false`.

## <a id="custom_test"></a>Custom test

The script or scripts in [wercker.json](werckerjson) in `custom steps` are run.

## <a id="post_test"></a>Post-test

After running the tests of your project, this step is run.

The script or scripts in [wercker.json](werckerjson) in `post-test` are run.

## <a id="package"></a>Package

If all steps are successful, the resulting folder is packaged to a zip file, to be used later in the deployment process.

## <a id="report"></a>Report

After the build finishes, the log of each step can be retrieved by going to the build in the project overview.

When using [the Google Chrome extension](concepts#google-chrome-extension) a notification is shown if the build failed.

