## express-layer
easier express usage



# Kullanım
Bunu projenize dahil etmek için aşağıdakileri yapın.

```
$ npm i express-layer
```

ve aşağıdakileri bir js dosyasına yapıştırın.

```
const { express, app, server, port, catchallroute } = require('express-layer').parametre({ filename: __filename })

server.on('listening', () => {
    app.get('/', (req, res) => { res.send('Express uygulaması isteklerinizi portta bekliyor: ' + port) });
    app.all('*', catchallroute); console.log("ok. express-layer hazır")
});
```

[express-layer](https://github.com/aydincandan/express-layer/pulls) için önerileriniz dikkate alınacaktır.


# Usage
To include it in your project, do the following.

```
$ npm i express-layer
```

and paste the following into a js file.

```
const { express, app, server, port, catchallroute } = require('express-layer').parametre({ filename: __filename })

server.on('listening', () => {
    app.get('/', (req, res) => { res.send('Express application is waiting for your requests on port: ' + port) });
    app.all('*', catchallroute); console.log("ok. express-layer is ready")
});
```

Your suggestions for [express-layer](https://github.com/aydincandan/express-layer/pulls) will be taken into consideration.