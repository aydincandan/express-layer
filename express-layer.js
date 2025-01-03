'use strict';

const expresslayer = (params) => {
        const { myport, aciklama = "", filename = "default.txt" } = params || {};
        // console.log(`Port: ${myport}, Description: ${aciklama}, Filename: ${filename}`);


        // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

        // https://www.youtube.com/watch?v=uxMADW3CmN4  [ I Stopped Using Express.js: Because Bun and Hono ]
        const express = require('express');
        const app = express();
        // https://www.youtube.com/watch?v=uxMADW3CmN4  [ I Stopped Using Express.js: Because Bun and Hono ]


        // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

        // hatırla : https://chatgpt.com/share/676fdcb9-353c-8011-93ca-bc7b28b0b787
        const http = require('http');
        const server = http.createServer(app);
        server.maxHeadersCount = 0; // İstenilen bağlantı başlıklarının sayısı (0 sınırsız anlamına gelir)
        server.maxHeaderSize = 75 * 1024 * 1024; // İstenilen başlık boyutu sınırı (75 MB)
        server.on('listening', () => {
                // selftest() // belki

                // console.log()
                // console.log("server adresi", server.address());
                const SERVERLISTENINFO = "SERVER http://localhost:" + port + " üzerinde ** " + aciklama + "(express-layer) ** BAŞLADI."
                app.set('port', port);
                app.set('LISTENINFO', SERVERLISTENINFO)

                // {
                //         require('./test_mongo_db'); // aslında artık burda buna gerek yok   npm run baslat (nodemon test_mongo_db) ile çalıştırabiliriz
                // }
        });
        // hatırla : https://chatgpt.com/share/676fdcb9-353c-8011-93ca-bc7b28b0b787


        // Express timeout ayarı
        app.timeout = 60000; // 60 saniye

        const infoDisplay = (port) => {
                console.log()
                console.log()
                console.log(">>>>>> express-layer <<<<<<<<<")
                console.log("*************************************************************");
                console.log("*", aciklama, "node version " + process.version);
                console.log("*", filename);
                console.log("*");
                console.log("*", "http://localhost:" + port + "/kukiler");
                console.log("*");
                console.log("*", new Date().toLocaleString());
                console.log("*");
                console.log("*", `Worker ${process.pid} is running on port`, port);
                console.log("*************************************************************");
                console.log(">>>>>> express-layer <<<<<<<<<")
                console.log()
                console.log()
        }

        // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

        //*-*-*-
        const { port, kaynak } = require('portgetset')// öncelikle .env den gelen PORT=, yoksa commandline: 0 < port

        const startPort = myport ? myport  // myport varsa myport geçerli
                :
                // aksi durumda diğer koşullar geçerli..
                ((port === undefined || port == 0) ? 7001 : port) // (hiçyoksa veya commandline:0) ise 7001 den başlayan (tryAvailablePort) sonraki boş olan bir port olacak.

        console.log({ startPort })

        // sabit (ENV)
        // geçici sabit (CLI)
        // hiç yoksa; öncelikle basePort=7001 ile baslayan, boş değilse de bir sonraki, boş olan bir port olacak.
        if (false) {
                if (kaynak == "ENV" && port != undefined && port > 2999) {
                        console.log("FIX")
                        console.log("kaynak:", kaynak)
                        console.log("port:", port)

                } else if (kaynak == "CLI" && port > 2999) {
                        console.log("MANUEL")
                        console.log("kaynak:", kaynak)
                        console.log("port:", port)

                } else {
                        console.log("port:", port)
                        console.log("// port 3000 den küçük olmasin")
                        console.log("kaynak:", kaynak)
                        // process.exit(1);
                }
                console.log(kaynak, "için: istenen (sabit bilinçli) port uygunsa başlat, değilse DURDUR. bul ve sunucuyu başlat", { startPort }, { port })
        }

        if (true) {
                const net = require('net');

                const tryAvailablePort = (port, deneCallback) => {
                        const servertmp = net.createServer();
                        servertmp.listen(port);
                        console.log()
                        console.log("tryAvailablePort BAŞLADI", port, kaynak)
                        servertmp.once('error', (err) => {
                                if (err.code === 'EADDRINUSE') {
                                        // port doluymuş. +1 yaparak kendimizi çağırıyoruz
                                        port = port + 1
                                        console.log(`Port ${port - 1} kullanılıyor, bir sonraki ${port} port deneniyor...`);
                                        tryAvailablePort(port, deneCallback);
                                } else {
                                        deneCallback(err, null);
                                }
                        });

                        servertmp.once('listening', () => {
                                // servertmp yi kapatıyoruz çünkü "dinleyebiliyoruz" çalışan bu port'u esas server için kullanacağız.
                                servertmp.close(() => { deneCallback(null, port) });
                        })
                }
                const tryCallBack = (err, availablePort) => {

                        if (err) { console.error('Port kontrolü sırasında bir hata oluştu:', err); return }

                        server.listen(availablePort, () => { infoDisplay(availablePort) }) // ***
                        // veya // ***
                        // app.listen(availablePort, () => { infoDisplay(availablePort) }) // ***
                }
                tryAvailablePort(startPort, tryCallBack);

        } else {
                server.listen(startPort, () => { infoDisplay(startPort) }) // ***
                // veya // ***
                // app.listen(startPort, () => { infoDisplay(startPort) }) // ***
        }




        //*-*-*-

        // list endpoints
        // const expressListEndpoints = require('express-list-endpoints');
        // list endpoints
        // // list endpoints
        // const endpoints = expressListEndpoints(app);
        // console.log({endpoints});
        // // list endpoints



        // view engine setup (herkes için genel çalışacak devam et) 3538 den tam olarak kaldır.
        app.set('view engine', 'pug');
        app.set('views', './pugviews');
        // app.get('/', (req, res) => {
        //         res.status(200).json({ islem: "buraya bu api için pug page tanıtım sayfası gelecek" })
        // });

        const cookieParser = require('cookie-parser');
        app.use(cookieParser());
        app.get('/kukiler', cookieParser(), (req, res) => {
                res.status(200).json({ kukiler: req.cookies })
        });

        // const session = require('express-session');
        // // https://www.npmjs.com/package/express-session
        // app.set('trust proxy', 1) // trust first proxy
        // app.use(session({
        //         secret: 'keyboard cat',
        //         resave: false,
        //         saveUninitialized: true,
        //         cookie: { secure: true }
        // }))
        // app.get('/oturumlar', session(), (req, res) => {
        //         // her uygulamanın kendisinin olması lazım (burası çekirdek)
        //         res.status(200).json({ oturumlar: req.sessionStore, session })
        // });



        const selftest = () => {
                // ------------- https://github.com/expressjs/multer/issues/1176 ------------
                const boundary = 'AaB03x'
                const body = [
                        '--' + boundary,
                        'Content-Disposition: form-data; name="file"; filename="test.txt"',
                        'Content-Type: text/plain',
                        '',
                        'test without end boundary'
                ].join('\r\n')
                const options = {
                        hostname: 'localhost',
                        port,
                        path: '/upload',
                        method: 'POST',
                        headers: {
                                'content-type': 'multipart/form-data; boundary=' + boundary,
                                'content-length': body.length,
                        }
                }
                const req = http.request(options, (res) => {
                        console.log(res.statusCode)
                })
                req.on('error', (err) => {
                        console.log(err)
                })
                req.write(body)
                req.end()
                // ------------- https://github.com/expressjs/multer/issues/1176 ------------
        }

        // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
        function onError(error) {
                console.log("ALOOOOOOOOOOOOOOOOOOOOO onError return"); return;
                if (error.syscall !== 'listen') {
                        throw error;
                }

                var bind = typeof port === 'string'
                        ? 'Pipe ' + port
                        : 'Port ' + port;

                // handle specific listen errors with friendly messages
                switch (error.code) {
                        case 'EACCES':
                                console.log(bind + ' requires elevated privileges');
                                process.exit(1);
                                break;
                        case 'EADDRINUSE':
                                console.log(bind + ' is already in use');
                                process.exit(1);
                                break;
                        default:
                                throw error;
                }
        }

        function onListening() {
                console.log("ALOOOOOOOOOOOOOOOOOOOOO 111111111111111111111111111111")
                var addr = server.address();
                var bind = typeof addr === 'string'
                        ? 'Pipe ' + addr
                        : 'Port ' + addr.port;
                // console.log('server.on("listening" ____ ' + bind);
                console.log(addr);
                console.log(" ");
                console.log("##### onListening->", app.get('LISTENINFO'));
                // console.log(server)
        }
        // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

        // https://chatgpt.com/share/6769a4cf-cdb4-8011-81f1-a2f96895e178
        const catchallroute = (req, res) => {
                const warn = `${req.method}, tipinde kodlanmamis bir istekte bulundunuz, from SERVER ${req.url}`;
                console.log(404, { warn });
                res.status(404).json(warn);
                // https://chatgpt.com/share/08435163-74e9-4899-8b19-fa9e6758b1fd
                // res.status(404);
                // res.set('X-Status-Text', 'Custom Not Found Message');
                // res.json({
                //   status: 404,
                //   message: "Page Not Found"
                // });

                // res.status(404).json({
                //   status: 404,
                //   message: "Page Not Found"
                // });
                // https://chatgpt.com/share/08435163-74e9-4899-8b19-fa9e6758b1fd
        }

        // module.exports = { express, app, server, port, catchallroute };
        return { express, app, server, port, catchallroute }
}
        ;
module.exports = expresslayer







// // mailer
// // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
// function onError(error) {
//         if (error.syscall !== 'listen') {
//                 throw error;
//         }

//         var bind = typeof port === 'string'
//                 ? 'Pipe ' + port
//                 : 'Port ' + port;

//         // handle specific listen errors with friendly messages
//         switch (error.code) {
//                 case 'EACCES':
//                         console.log(bind + ' requires elevated privileges');
//                         process.exit(1);
//                         break;
//                 case 'EADDRINUSE':
//                         console.log(bind + ' is already in use');
//                         process.exit(1);
//                         break;
//                 default:
//                         throw error;
//         }
// }

// function onListening() {
//         var addr = server.address();
//         var bind = typeof addr === 'string'
//                 ? 'Pipe ' + addr
//                 : 'Port ' + addr.port;
//         console.log({ bind });
//         console.log({ addr });
//         console.log("");
//         console.log("##### onListening->", app.get('LISTENINFO'));
//         // console.log(server)
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log(new Date().toLocaleString());
//         console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|");
// }
// // mailer



// // multerApp
// function onError(error) {
//         if (error.syscall !== 'listen') {
//                 throw error;
//         }

//         var bind = typeof port === 'string'
//                 ? 'Pipe ' + port
//                 : 'Port ' + port;

//         // handle specific listen errors with friendly messages
//         switch (error.code) {
//                 case 'EACCES':
//                         console.log(bind + ' requires elevated privileges');
//                         process.exit(1);
//                         break;
//                 case 'EADDRINUSE':
//                         console.log(bind + ' is already in use');
//                         process.exit(1);
//                         break;
//                 default:
//                         throw error;
//         }
// }

// function onListening() {
//         var addr = server.address();
//         var bind = typeof addr === 'string'
//                 ? 'Pipe ' + addr
//                 : 'Port ' + addr.port;
//         console.log({ bind });
//         console.log({ addr });
//         console.log("");
//         console.log("##### onListening->", app.get('LISTENINFO'));
//         // console.log(server)
//         console.log("Back-End-NodeMulter servisi calisiyor: http://localhost:" + addr.port);
//         console.log("************************************************************");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log("");
//         console.log(new Date().toLocaleTimeString());
//         console.log("=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|");
// }
// // multerAPP


// // mongoAPP
// // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
// function onError(error) {
//         if (error.syscall !== 'listen') {
//                 throw error;
//         }

//         var bind = typeof port === 'string'
//                 ? 'Pipe ' + port
//                 : 'Port ' + port;

//         // handle specific listen errors with friendly messages
//         switch (error.code) {
//                 case 'EACCES':
//                         console.log(bind + ' requires elevated privileges');
//                         process.exit(1);
//                         break;
//                 case 'EADDRINUSE':
//                         console.log(bind + ' is already in use');
//                         process.exit(1);
//                         break;
//                 default:
//                         throw error;
//         }
// }

// function onListening() {
//         var addr = server.address();
//         var bind = typeof addr === 'string'
//                 ? 'Pipe ' + addr
//                 : 'Port ' + addr.port;
//         // console.log('server.on("listening" ____ ' + bind);
//         console.log(addr);
//         console.log(" ");
//         console.log("##### onListening->", app.get('LISTENINFO'));
//         // console.log(server)
// }
// // =|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
// // mongoAPP

