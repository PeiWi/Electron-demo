import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import * as ctbc from "../utils/js/ctbc_win";

const server = express();
const PORT = 1234;

function getSSLFilePath(fileName: string) {
    if (process.env.NODE_ENV === 'development') {
        return path.join(__dirname, '..', '..', '..', 'ssl', fileName);
    } else {
        return path.join(process.resourcesPath, 'ssl', fileName);
    }
}

const keyPath = getSSLFilePath('key.pem');
const certPath = getSSLFilePath('cert.pem');

const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

server.get("/", (req, res) => {
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.send('hi');
});

server.get("/main", (req, res) => {
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.send(ctbc.sampleTest());
});

server.get("/key", (req, res) => {
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.send(ctbc.GetSessionKeyHash());
});


export function startServer() {
    const httpsServer = https.createServer(httpsOptions, server);
    httpsServer.listen(PORT, () => {
        console.log(`Server is running on https://localhost:${PORT}`);
    });
    return httpsServer;
}