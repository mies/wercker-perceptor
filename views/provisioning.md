# Provisioning

One of the principles of DevOps and Continuous Delivery is that you automate everything.

So when a new environment is created, this should be done automated.

In [wercker.json](werckerjson) you can specify which scripts need to be run.

You have to create these scripts yourself. What kind of scripts are up to you: you can use bash scripts, Chef, Puppet, anything.

The best practice is to create a folder named `provision` in the root of your project and put everything related to provisioning in this folder.


<ol class="steps steps--six">
    <li><span>1</span>[Create and run](#create_and_run)</li>
    <li><span>2</span>[Create environment](#create_environment)</li>
    <li><span>3</span>[Pre-provision](#preprovision)</li>
    <li><span>4</span>[Provision](#provision)</li>
    <li><span>5</span>[Post-provision](#postprovision)</li>
    <li><span>6</span>[Report](#report)</li>
</ol>
## <a id="create_and_run"></a>Create and run

If administrator, you can go to the provisioning tab of a project
Click "Provision new host" to start provisiong a new host.

* Host: the IP address or domain name of the host
* SSH key: the SSH key used to login to the host
* Build: the build containing the provision script to be used
* Environment variables: additional variables needed by the provision script

Only the log will be saved, so your SSH key won't be stored anywhere on Wercker.

Click "Provision new host" in the form to provision a new host.

## <a id="create_environment"></a> Create environment

A sandbox is created to run the scripts. This sandbox has the same specifications as the sandbox that was used to create the build.

The following environment variables are set:

```
WERCKER=true
PROVISION=true
WERCKER_ROOT=/build/X
WERCKER_PLATFORM_VERSION=X.X.X
PROVISION_HOST=host
PROVISION_SSH_KEY=key (hidden from log)
```

## <a id="preprovision"></a>Pre-provision

During pre-provision you can run scripts needed to run before the actual provisioning.

The script or scripts in [wercker.json](werckerjson) in `pre-provision` are run.

## <a id="provision"></a>Provision

During provision the script(s) needed to do the actual provisioning are run.

The script or scripts in [wercker.json](werckerjson) in `provision` are run.


## <a id="postprovision"></a>Post-provision

During post-provision you can run scripts needed to run after the provisioning is successful.

For example when a new webserver is added, the loadbalancer can be notified.

The script or scripts in [wercker.json](werckerjson) in `post-provision` are run.

## <a id="report"></a>Report

After the provisioning ends, the log can be retrieved in the provisioning tab of the project.

When using [the Google Chrome extension](concepts#google-chrome-extension) a notification is shown whether is passed or failed.