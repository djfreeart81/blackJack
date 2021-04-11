const http = require("http")
const fs = require('fs').promises;
const path = require("path");

const host = 'localhost';
const port = 8000;

let indexFile;
let CSSFile;
let jsFile;

const requestListener = function (req, res) {
    console.log(req.url);
    switch (req.url) {
        case "/styles.css":
            console.log("loading CSS");
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(CSSFile);
            break;
        case "/scripts.js":
            console.log("loading scripts.js");
            res.writeHead(200, {"Content-Type": "text/js"});
            res.write(jsFile);
            break;
        default:
            console.log("loading html");
            res.writeHead(200, {"Content-Type":"text/html"});
            res.write(indexFile);
    }
    res.end();
};

const server = http.createServer(requestListener);

fs.readFile(path.join(__dirname,'..','index.html'))
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

fs.readFile(path.join(__dirname,'..', 'styles.css'))
    .then(contents => {
        CSSFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read styles.css file: ${err}`);
        process.exit(1);
    });

fs.readFile(path.join(__dirname,'..', 'JS', 'scripts.js'))
    .then(contents => {
        jsFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read scripts.js file: ${err}`);
        process.exit(1);
    });