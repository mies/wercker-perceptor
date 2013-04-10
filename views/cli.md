# wercker CLI

Wercker has a command line interface. It is written in python and on Linux/Mac OSX can be installed by running:

	pip install wercker
	
Depending on your operating systems you may have to run this with superuser privileges (i.e. use `sudo pip install wercker`). You should now be able to run:

	$ wercker
	-----------------------
	welcome to wercker-cli
	-----------------------
	
	Usage:
	    wercker create
	    wercker status
	    wercker deploy
	    wercker builds
	    wercker open targets
	    wercker queue
	    wercker apps
	    wercker link
	    wercker login
	    wercker logout
	    wercker targets add
	    wercker targets list
	    wercker targets details
      wercker update
	    wercker --version
	    wercker --help

## Commands
Wercker supports the following commands:

### create
Adds an application to wercker. This will create a `.wercker` file in
your repository.

### status
Show the status of the most recent build.

### deploy
Deploy a build to a deploy target

### login
Logs the user in and stores the token on the machine

### logout
Removes the login token from the machine

### open targets
Opens a webpage showing a deploy target's details
### apps
List apps the user has access to

### link
Link a repository back up to an application on wercker. Useful if a repository does not contain the .wercker file.

### builds
Shows a list of the most recent builds and the results.

### targets add
Add a heroku application as a deploy target.

### targets list
Gets a list of all deploy targets for the current application.

### targets details
Alias for open targets
