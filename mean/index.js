var http = require('http');

http.createServer((req, res) => {
    // 인자를 파싱한 url
    var _url;

    // method name을 소문자로 사용하는 client에 대해서 대문자로 통일
    req.method = req.method.toUpperCase();
    console.log(req.method + ' ' + req.url);
    res.end('The Current time is ' + Date.now());
}).listen(3000);

console.log('Server running at http://localhost:3000/');
