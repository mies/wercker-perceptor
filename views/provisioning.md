# Provisioning

One of the principles of DevOps and Continuous Delivery is that you automate everything.

So when a new environment is created, this should be done automated.

In [wercker.json](werckerjson) you can specify which scripts need to be run.

You have to create these scripts yourself. What kind of scripts are up to you: you can use bash scripts, Chef, Puppet, anything.

The best practice is to create a folder named <code>provision</code> in the root of your project and put everything related to provisioning in the folder.


<table class="diagram">
  <tr>
    <td>Create and run</td>
    <td>Create environment</td>
    <td>Pre-provision</td>
    <td>Provision</td>
    <td>Post-provision</td>
    <td>Report</td>
  </tr>
</table>

## Create and run

If administrator, you can go to the provisioning tab of a project
Click "Provision new host" to start provisiong a new host.

* Host: the IP address or domain name of the host
* SSH key: the SSH key used to login to the host
* Build: the build containing the provision script to be used
* Environment variables: additional variables needed by the provision script

Only the log will be saved, so your SSH key won't be stored anywhere on Wercker.

Click "Provision new host" in the form to provision a new host.

## Create environment

A sandbox is created to run the scripts. This sandbox has the same specifications as the sandbox that was used to create the build.

## Pre-provision

During pre-provision you can run scripts needed to run before the actual provisioning.

The script or scripts in [wercker.json](werckerjson) in <code>preProvision</code> are run.

## Provision

During provision the script(s) needed to do the actual provisioning are run.

The script or scripts in [wercker.json](werckerjson) in <code>provision</code> are run.


## Post-provision

During post-provision you can run scripts needed to run after the provisioning is successful.

For example when a new webserver is added, the loadbalancer can be notified.

The script or scripts in [wercker.json](werckerjson) in <code>postProvision</code> are run.

## Report

After the provisioning ends, the log can be retrieved in the provisioning tab of the project.

When using [the Google Chrome extension](concepts#google-chrome-extension) a notification is shown whether is passed or failed.