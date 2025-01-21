'use strict';

const expresslayer = (params) => {
        const { myport, info_desc = "", filename = "your__filename.js" } = params || {};


        let { silent, verbose } = params || {};
        
        if (silent == undefined || silent == false) { silent = false } else { silent = true } 
        if (verbose == undefined || verbose == true) { verbose = true } else { verbose = false } 



        const { version } = require('./package.json');
        const express = require('express');
        const app = express();

        const http = require('http');
        const server = http.createServer(app);
        server.maxHeadersCount = 0; 
        server.maxHeaderSize = 75 * 1024 * 1024; 
        server.on('listening', () => {
                app.set('port', port);

                const SERVERLISTENINFO = "SERVER http://localhost:" + port + " üzerinde ** " + info_desc + "(express-layer) ** BAŞLADI."
                app.set('LISTENINFO', SERVERLISTENINFO)

        });

        app.timeout = 60000; 

        const infoDisplay = (port) => {
                if (silent == false) {
                        console.log()
                        console.log()
                        console.log(">>>>>> express-layer (" + version + ") <<<<<<<<<")
                        console.log("**************************************");
                        if (verbose == true) {
                                console.log("*");
                                console.log("*", info_desc, "node version " + process.version);
                                console.log("*", filename);
                                console.log("*");
                                
                                
                                
                        }
                        console.log("*");
                        console.log("*", `Worker ${process.pid} is running on port`, port);
                        console.log("*");
                        console.log("**************************************");
                        console.log()
                        console.log()
                }
        }

        const { port, kaynak } = require('portgetset')

        const currentPort = myport ? myport  
                :
                
                ((port === undefined || port == 0) ? 7001 : port) 

        if (silent == false) console.log({ currentPort })

        if (true) {
                const net = require('net');

                const tryAvailablePort = (port, deneCallback) => {
                        const servertmp = net.createServer();
                        servertmp.listen(port);
                        
                        
                        servertmp.once('error', (err) => {
                                if (err.code === 'EADDRINUSE') {
                                        
                                        port = port + 1
                                        console.log(`Port ${port - 1} kullanılıyor, bir sonraki ${port} port deneniyor...`);
                                        tryAvailablePort(port, deneCallback);
                                } else {
                                        
                                        console.log(`Port ${port} ile devam ediyoruz...`);
                                        deneCallback(err, null);
                                }
                        });

                        servertmp.once('listening', () => {
                                
                                
                                servertmp.close(() => { deneCallback(null, port) });
                        })
                }
                const tryCallBack = (err, availablePort) => {

                        if (err) { console.error('Port kontrolü sırasında bir hata oluştu:', err); return }

                        server.listen(availablePort, () => { infoDisplay(availablePort) }) 
                        
                        
                }
                tryAvailablePort(currentPort, tryCallBack);

        } else {
                server.listen(currentPort, () => { infoDisplay(currentPort) }) 
                
                
        }

        
        
        
        
        

        const catchallroute = (req, res) => {
                const warn = `${req.method}, tipinde kodlanmamis bir istekte bulundunuz, from SERVER ${req.url}`;
                console.log(404, { warn });
                res.status(404).json(warn);
        }

        
        return { express, app, server, port: currentPort, catchallroute }
}
        ;
module.exports = expresslayer
