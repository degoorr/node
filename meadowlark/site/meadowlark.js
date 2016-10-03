var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

// 핸들바 뷰 엔진 설정
var handlebars = require('express-handlebars').create({ defaultLayout : 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 서버 시작 전 환경 값을 설정해 포트로 오버라이드 가능
app.set('port', process.env.PORT || 3000);

// static middleware 추가 (__dirname은 실행 중인 script가 들어 있는 directory로 전연 변수이다.)
app.use(express.static(__dirname + '/public'));

// qa test
app.use((req, res, next) => {
    // query string에 test=1이 있으면 (그리고 실무 production 서버가 아니면) res.locals.showTests == true가 됩니다.
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});


// router 정의 코드
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', { 
        fortune : fortune.getFortune(),
        pageTestScript : '/qa/tests-about.js' 
    });
});

app.get('/tours/hood-river', (req, res) => {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
    res.render('tours/request-group-rate');
});

// What is follback?
// 어떤 조건에도 일치하지 않아 적합한 처리 요소 또는 처리기가 선택되지 못하는 경우, 기본 처리기를 선택하는 작업.
// 404 fallback handler (middleware)
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express start on http://localhost:' + app.get('port') 
        + '; press Ctrl-C to terminate.');
});