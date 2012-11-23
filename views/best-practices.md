# Best practices

<a id="deployment"></a>
## Deployment

<a id="deployment-staging-production"></a>
### Staging/Production

A common pattern with deployment is to have two different environments: staging and production.

Production is where your users go to and staging is the place where you can validate your code changes.

To do this within Wercker, create two [Deploy targets](concepts#deploy-targets) "staging" and "production".
When a [Build](concepts#builds) is passed you first [Deploy](concepts#deploys) it to "staging".
After you have made sure the deploy is stable, you can [Deploy](concepts#deploys) the same [Build](concepts#builds) to "production".