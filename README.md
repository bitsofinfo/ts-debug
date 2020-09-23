# swagger-client typescript issue 1

https://github.com/swagger-api/swagger-js/issues/1730

```
node -v
v12.18.4

npm -v
6.14.8
```

Clone this project, change into `ts-debug`, install dependencies and generate js from ts:
```
npm install
npx tsc
```

Run it:
```
node dist/swaggerclient.js

/Users/bof/ts-debug/dist/swaggerclient.js:14
new swagger_client_1.default({
^

TypeError: swagger_client_1.default is not a constructor
    at Object.<anonymous> (/Users/bof/ts-debug/dist/swaggerclient.js:14:1)
    at Module._compile (internal/modules/cjs/loader.js:1137:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)
    at Module.load (internal/modules/cjs/loader.js:985:32)
    at Function.Module._load (internal/modules/cjs/loader.js:878:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
```

Manually modify the js:

From:
```
...
new swagger_client_1.default({
...
```

To:
```
new swagger_client_1({
```

Run again... it now works
```
...
...
executing response interceptor
{
  ok: true,
  url: 'https://petstore.swagger.io/v2/store/inventory',
  status: 200,
  statusText: 'OK',
  headers: {
    'access-control-allow-headers': [ 'Content-Type', 'api_key', 'Authorization' ],
    'access-control-allow-methods': [ 'GET', 'POST', 'DELETE', 'PUT' ],
    'access-control-allow-origin': '*',
    connection: 'close',
    'content-type': 'application/json',
    date: [ 'Wed', '23 Sep 2020 15:03:36 GMT' ],
    server: 'Jetty(9.2.9.v20150224)',
    'transfer-encoding': 'chunked'
  },
  text: '{"sold":9,"swimming":1,"availablee":1,"string":42,"Nonavailable":1,"pending":8,"available":425,"HtTpS://2604595554411105325.owasp.org":1,"free":1,"Gone":1,"notAvailable":1}',
  data: '{"sold":9,"swimming":1,"availablee":1,"string":42,"Nonavailable":1,"pending":8,"available":425,"HtTpS://2604595554411105325.owasp.org":1,"free":1,"Gone":1,"notAvailable":1}',
  body: {
    sold: 9,
    swimming: 1,
    availablee: 1,
    string: 42,
    Nonavailable: 1,
    pending: 8,
    available: 425,
    'HtTpS://2604595554411105325.owasp.org': 1,
    free: 1,
    Gone: 1,
    notAvailable: 1
  },
  obj: {
    sold: 9,
    swimming: 1,
    availablee: 1,
    string: 42,
    Nonavailable: 1,
    pending: 8,
    available: 425,
    'HtTpS://2604595554411105325.owasp.org': 1,
    free: 1,
    Gone: 1,
    notAvailable: 1
  }
}
```


# The solution:

https://discord.com/channels/508357248330760243/746390817228456068/758348828331212860

Add to `tsconfig.json`:
```
...
"typeRoots": [ "./types", "./node_modules/@types"],
"exclude": ["node_modules", "types" ]
...
```

Declare a module for `swagger-client`
```
mkdir types/swagger-client
echo "declare module 'swagger-client';" > types/swagger-client/index.d.ts
```

Run tsc w/ `--esModuleInterop`:
```
npx tsc --esModuleInterop
```