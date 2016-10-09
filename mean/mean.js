const http = require('http');
const employeeService = require('./lib/employees');
const responder = require('./lib/responseGenerator');
const staticFile = responder.staticFile('/public');

http.createServer((req, res) => {

    // method name을 소문자로 사용하는 client를 대비해서 대문자로 통일
    req.method = req.method.toUpperCase();
    console.log(req.method + ' ' + req.url);

    if (req.method !== 'GET') {
        res.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        return res.end(req.method + ' is not implemented by this server.');
    }

    // 인자 파싱한 URL
    var _url;
    if (_url = /^\/employees$/i.exec(req.url)) {
        // 직원 목록 반환
        employeeService.getEmployees((error, data) => {
            if (error) {
                return responder.send500(error, res);
            }
            return responder.sendJson(data, res);
        });
    } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
        employeeService.getEmployee(_url[1], (error, data) => {
            if (error) {
                // 500 에러
                return responder.send500(error, res);
            }
            if (!data) {
                // 404 오류 전송
                return responder.send404(res);
            }
            // 라우트에 포함된 id로 직원 검색
            return responder.sendJson(data, res);
        })
    } else {
        // 정적 파일 전송
        // res.writeHead(200);
        // res.end('static file maybe');
        staticFile(req.url, res);
    }
}).listen(3000);

console.log('Server running at http://localhost:3000/');