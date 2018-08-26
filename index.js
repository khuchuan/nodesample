var express = require('express');
var app = express();
var path = require('path');

// var ejs = require('ejs');
// // app.set('views', path.join(  __dirname, 'giaodien'));
// app.set('view engine', 'ejs');
// app.get('/render', (req, res) => {
//     res.render("index");
// })

var jade = require('jade');
app.set('view engine', 'jade');
// app.set('views', path.join(__dirname, 'giaodien'));

app.get('/render-title', (req, res) => {
    res.render('index', { title: "Ebook Pro Express.js" });
})

app.get('/locals', function (req, res) {
    res.locals = { title: 'Pro Express.js' };
    res.render('index');
});

app.get('/set-html', (req, res) => {
    // res.set('Content-Type', 'text/html');
    res.end('<html><body>' +
        '<h1>Express.js Guide</h1>' +
        '</body></html>');
})

app.get('/set-csv', function (req, res) {
    // var body = 'title, tags\n' +
    //     'Practical Node.js, node.js express.js\n' +
    //     'Rapid Prototyping with JS, backbone.js node.js mongodb\n' +
    //     'JavaScript: The Good Parts, javascript\n'
    var body = "Dong 1\n" +
        "dong 2\n" +
        "dong ba\n" +
        "Dong cuoi cung"

    res.set({
        'Content-Type': 'text/csv',
        'Content-Length': body.length,
        'Set-Cookie': ['type=reader', 'language=javascript']
    });

    res.end(body);
});


app.get('/status', function (req, res) {
    res.status(404).end();
})

app.get('/send', function (req, res) {
    res.status(400).send({ message: 'Data was submitted successfully.' });
})

app.get('/send-buf', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(new Buffer('text data that will be converted into Buffer'));
});

app.get('/json', function (req, res) {
    res.status(200).json([{ title: 'Practical Node.js', tags: 'node.js express.js' },
    { title: 'Rapid Prototyping with JS', tags: 'backbone.js node.js mongodb' },
    { title: 'JavaScript: The Good Parts', tags: 'javascript' }
    ]);
});

app.get('/api/v1/stories/:id', function (req, res) {
    res.json(req.story);
});

app.get('/', function (req, res) {
    res.status(200).jsonp([{ title: 'Express.js Guide', tags: 'node.js express.js' },
    { title: 'Rapid Prototyping with JS', tags: 'backbone.js, node.js, mongodb' },
    { title: 'JavaScript: The Good Parts', tags: 'javascript' }
    ]);
});

app.get('/redirect', function(req, res){
    res.redirect(301, 'http://dantri.com.vn');
})








app.listen(3000, () => {
    console.log('Listen on port 3000');
})
