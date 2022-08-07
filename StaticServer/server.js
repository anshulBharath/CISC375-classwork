// Built in Node.js modules
let http = require('http');
let fs = require('fs');
let path = require('path');

//Third party Node.js modules (installed via npm)
let mime = require('mime-types');

//Main application
let port = 8000; //Can be anything abover 1024
let public_dir = path.join(__dirname, 'public');

let mime_types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png'
}

let server = http.createServer((req, res) => {
    if (req.method === 'GET')
    {
        let url = req.url;
        if (url === '/'){
            url = '/index.html';
        }

        let filename = path.join(public_dir, url);
        let ext = path.extname(filename); //gets the extension of the file

        fs.readFile(filename, (err, data) => {
            //Handles html, css, js, jpg, jpeg, png
            if (err){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write('File not found');
                res.end();
            }
            else {
                res.writeHead(200, {'Content-Type': mime.lookup(ext)});
                res.write(data);
                res.end();
            }

        });

        console.log(filename, ext);
        console.log(req.method, req.url);
       
    }
});

server.listen(port, '0.0.0.0');