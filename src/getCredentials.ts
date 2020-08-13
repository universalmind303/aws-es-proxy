import AWS from 'aws-sdk';
const getCredentials = async () => {
  const credentialProvider = new AWS.CredentialProviderChain();
  const credentials = await credentialProvider.resolvePromise().catch(console.error);
  return {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
  };
};
export default {
  getCredentials,
};
