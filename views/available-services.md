# Available Services

Most applications use a database to store data or a message queue to handle jobs asynchronously. With Wercker you can specify which services you require and Wercker will provision them for you.

This is done by specifying the required services in your `wercker.json` file. Through environment variables you will then be able to access these services.

wercker.json

To be able to use services you must first specify them in the service property in the `wercker.json` file. You simply specify the name as the key and use 'true' as the value:

``` json
  {
    "services": {
      "mysql": true
    }
  }
```

## Supported services

These are the services which are supported by Wercker. The list also includes the environment variables needed to access the service. It is important that you use these environment variables, since the login information might change.

* mysql
```
    Host: WERCKER_MYSQL_HOST
    Port: WERCKER_MYSQL_PORT
    Username: WERCKER_MYSQL_USERNAME
    Password: WERCKER_MYSQL_PASSWORD
```
There is also a convencience environment variable in the form of `mysql://username:password@hostname:port/databasename`:

```
    WERCKER_MYSQL_URL
```

* postgresql
```
    Host: WERCKER_POSTGRESQL_HOST
    Port: WERCKER_POSTGRESQL_PORT
    Username: WERCKER_POSTGRESQL_USERNAME
    Password: WERCKER_POSTGRESQL_PASSWORD
```
There is also a convencience environment variable in the form of `postgres://username:password@hostname:port/databasename`:

```
    WERCKER_POSTGRESQL_URL
```



* mongodb
```
      Host: WERCKER_MONGODB_HOST
      Port: WERCKER_MONGODB_PORT
```

* rabbitmq
```
      Host: WERCKER_RABBITMQ_HOST
      Port: WERCKER_RABBITMQ_PORT
```

* redis version 2.4.14
```
    Host: WERCKER_REDIS_HOST
    Port: WERCKER_REDIS_PORT
```

More information on language and services:

* [Getting Started with Node.js and Redis](/articles/nodejs-redis/)