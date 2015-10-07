var Browser = require('zombie');
var url = 'http://localhost:3000/'
var browser = new Browser();

describe('Search items', function(next) {
  it ('shows all the saved items by default', function(next) {
    browser.visit(url, function() {
      console.log('visited website')
      expect(browser.html('a')).toContain('Search');
      console.log('success')
    })
  })
});
