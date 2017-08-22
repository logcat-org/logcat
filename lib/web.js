const
    http = require('http'),
    fs = require('fs'),
    WebSocket = require('ws');

module.exports = () => {
    const
        server = http.createServer((req, res) => {
            fs.readFile(__dirname + '/../client.html', 'utf8', (err, data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            });
        }),
        wss = new WebSocket.Server({server}),
        send = (type) => {
            return (line) => {
                const
                    message = JSON.stringify({line: line, type: type});

                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });
            };
        };

    server.listen(() => {console.log('Logcat avalible at: http://localhost:' + server.address().port);});

    return {
        error: send('error'),
        warning: send('warning'),
        success: send('success'),
        info: send('info')
    };
};
