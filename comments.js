// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var comments = [];

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, 'Not Found');
                res.end('<h1>404 Not Found</h1>');
            }
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(data);
        });
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.exists('.' + pathname, function(exists) {
            if (exists) {
                fs.readFile('.' + pathname, function(err, data) {
                    if (err) {
                        console.log(err);
                        res.writeHead(500, 'Internal Server Error');
                        res.end('<h1>500 Internal Server Error</h1>');
                    }
                    res.end(data);
                });
            } else {
                res.writeHead(404, 'Not Found');
                res.end('<h1>404 Not Found</h1>');
            }
        });
    }
});

server.listen(3000, function() {
    console.log('Server is running on port 3000');
});