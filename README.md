# aws-es-proxy
## THIS IS STILL IN BETA
aws-es-proxy is a small web server application sitting between your HTTP client and Amazon Elasticsearch service. It will sign your requests using latest AWS Signature Version 4 before sending the request to Amazon Elasticsearch. When response is back from Amazon Elasticsearch, this response will be sent back to your HTTP client. The purpose of this is to simplify the request signing process, and allow connections via tooling that does not natively support AWS Elasticsearch Service (es-hadoop, logstash, elasticsearch beats, etc). 

AWS Elasticsearch has pretty limited support for auth integrations. This proxy allows you to integrate with popular auth providers, and delegate the authentication from Elasticsearch to your auth provider. 

## Getting Started

### Usage
All configuration happens in the `proxy-config.yml`
You can see `proxy-config-sample.yml` for a sample configuration

Currently the supported auth providers are `[none, okta, jwt]`
this can be configured via the config file. 

To specify an auth provider, update config file `auth.provider` to your preferred provider.

## Configuring Credentials

Before using **aws-es-proxy**, ensure that you've configured your AWS IAM user credentials. The best way to configure credentials on a development machine is to use the `~/.aws/credentials` file, which might look like:

```
[default]
aws_access_key_id = ID112233445566
aws_secret_access_key = MY-SECRET-KEY
```

Alternatively you can set the following environment variables:

```
export AWS_ACCESS_KEY_ID=ID112233445566
export AWS_SECRET_ACCESS_KEY=MY-SECRET-KEY
```


### Starting Application 


### Build from source
```js
npm i 
npm run build
```


# aws-es-proxy
