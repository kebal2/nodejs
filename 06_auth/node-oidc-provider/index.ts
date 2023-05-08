import Provider from "oidc-provider"

const configuration = {
  // refer to the documentation for other available configuration
  clients: [{
    client_id: 'CLIENT_ID',
    client_secret: 'CLIENT_SECRET',
    redirect_uris: ['http://localhost:8002/api/v1/callback'],
  }],
};

const oidc = new Provider('http://localhost:3000', configuration);

oidc.listen(3000, () => {
  console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration');
});