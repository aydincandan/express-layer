'use strict';

const expresslayer = (params) => {
        const { myport, aciklama = "", filename = "your__filename.js" } = params || {};
        const { version } = require('./package.json');
        const express = require('express');
        const app = express();

        const http = require('http');
        const server = http.createServer(app);
        server.maxHeadersCount = 0; // İstenilen bağlantı başlıklarının sayısı (0 sınırsız anlamına gelir)
        server.maxHeaderSize = 75 * 1024 * 1024; // İstenilen başlık boyutu sınırı (75 MB)
        server.on('listening', () => {

                const SERVERLISTENINFO = "SERVER http://localhost:" + port + " üzerinde ** " + aciklama + "(express-layer) ** BAŞLADI."
                app.set('port', port);
                app.set('LISTENINFO', SERVERLISTENINFO)

        });

        app.timeout = 60000; // 60 saniye

        const infoDisplay = (port) => {
                console.log()
                console.log()
                console.log(">>>>>> express-layer ("+version+") <<<<<<<<<")
                console.log("*************************************************************");
                console.log("*", aciklama, "node version " + process.version);
                console.log("*", filename);
                console.log("*");
                // console.log("*", "http://localhost:" + port + "/kukiler");
                // console.log("*");
                // console.log("*", new Date().toLocaleString());
                console.log("*");
                console.log("*", `Worker ${process.pid} is running on port`, port);
                console.log("*************************************************************");
                console.log()
                console.log()
        }

        const { port, kaynak } = require('portgetset')// öncelikle .env den gelen PORT=, yoksa commandline: 0 < port

        const currentPort = myport ? myport  // myport varsa myport geçerli
                :
                // aksi durumda diğer koşullar geçerli..
                ((port === undefined || port == 0) ? 7001 : port) // (hiçyoksa veya commandline:0) ise 7001 den başlayan (tryAvailablePort) sonraki boş olan bir port olacak.

        console.log({ currentPort })

        if (true) {
                const net = require('net');

                const tryAvailablePort = (port, deneCallback) => {
                        const servertmp = net.createServer();
                        servertmp.listen(port);
                        // console.log()
                        // console.log("tryAvailablePort BAŞLADI", port, kaynak)
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
                tryAvailablePort(currentPort, tryCallBack);

        } else {
                server.listen(currentPort, () => { infoDisplay(currentPort) }) // ***
                // veya // ***
                // app.listen(currentPort, () => { infoDisplay(currentPort) }) // ***
        }

        // const cookieParser = require('cookie-parser');
        // app.use(cookieParser());
        // app.get('/kukiler', cookieParser(), (req, res) => {
        //         res.status(200).json({ kukiler: req.cookies })
        // });

        const catchallroute = (req, res) => {
                const warn = `${req.method}, tipinde kodlanmamis bir istekte bulundunuz, from SERVER ${req.url}`;
                console.log(404, { warn });
                res.status(404).json(warn);
        }

        // module.exports = { express, app, server, port, catchallroute };
        return { express, app, server, port: currentPort, catchallroute }
}
        ;
module.exports = expresslayer
