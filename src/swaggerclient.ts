import SwaggerClient from 'swagger-client';

const myRequestInterceptor = (req) => {
  console.log('executing request interceptor');
  console.log(req);
  return req;
};

const myResponseInterceptor = (res) => {
  console.log('executing response interceptor');
  console.log(res);
  return res;
};

new SwaggerClient({
  url: 'http://petstore.swagger.io/v2/swagger.json',
  requestInterceptor: myRequestInterceptor,
  responseInterceptor: myResponseInterceptor,
  authorizations: { ApiKey: { value:"special_key"} }
}).then((client) =>
  client.apis.store.getInventory()
);