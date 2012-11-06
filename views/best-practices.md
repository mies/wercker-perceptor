# Best practices

## Deployment

### Staging/production

A common pattern to use is having two different environments: staging and production.

Production is where your users goto and staging is the place where you can validate your
code changes work.

To accomplish this, create two [Deploy targets](concepts#deploy-targets) "staging" and "production".
When a [Build](concepts#builds) is passed you first [Deploy](concepts#deploys) it to "staging".
After you're sure it's stable, you can [Deploy](concepts#deploys) the same [Build](concepts#builds) to "production".