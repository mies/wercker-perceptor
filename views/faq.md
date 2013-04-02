# FAQ

### Why can't I add any public repository to wercker?
wercker needs to have some additional rights to the repository so it can:

* receive events when new code is added to the repository.
* so it can use things such as the status api for GitHub

If you want to run tests on a public/open source library, but have no permissions on the project: you could fork it and add that project to wercker.

### What happens to my code when I run a build?
Simplified we:

1. do a checkout your code and parse the wercker.json.
2. Based on the wercker.json and an analyzis of the code, boot up machines in a sandboxed environment.
3. install additional software, packages and or libraries.
4. Run the tests inside the sandboxed environment
5. Teardown and destroy the sanboxed environment.
6. remove your code.

For more details see the [build](/articles/build) page

### Can you add support for X?
If you feel we should support a certain service (for instance memcached) or language, feel free to [contact](mailto:pleasemailus@wercker.com) us.

### Is there a public api with documentation for wercker?
We are currently working on our api and are planning to release an api with documentation as soon as we are ready.

