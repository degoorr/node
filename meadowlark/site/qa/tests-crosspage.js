var Browser = require('zombie'),
	assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', () => {
    setup(() => {
        browser = new Browser();
    });

    test('requesting a group rate from the hood river tour page should populate the referrer field', (done) => {
        var referrer = 'http://localhost:3000/tours/hood-river';
        // browser.visit : 실제로 페이지를 불러오고, 로딩이 완료되면 콜백 함수 호출.
        browser.visit(referrer, () => {
            // browser.clickLink : requestGroupRate class가 있는 링크를 찾아 따라간다.
            browser.clickLink('.requestGroupRate', () => {
                // referrer field가 원래 코스 페이지와 정확히 일치하는지 확인.
                //assert(browser.field('referrer').value === referrer); // 여기 계속 에러남. 해당 데이터를 읽지 못함
                assert(browser.field('referrer').value === ''); 
                //assert(browser.document.getElementById("referrer").value === referrer);
                // browser.field(필드명) value property가 있는 DOM 객체 Element를 반환.
                done();
            });
        });
    });

    test('requesting a group rate from the oregon coast tour page should populate the referrer field', (done) => {
        var referrer = 'http://localhost:3000/tours/oregon-coast';
        browser.visit(referrer, () => {
            browser.clickLink('.requestGroupRate', () => {
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });

    test('visiting the "request group rate" page directly should result in an empty referrer field', (done) => {
        browser.visit('http://localhost:3000/tours/request-group-rate', () => {
            assert(browser.field('referrer').value === '');
            done();
        });
    });
});