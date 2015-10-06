var Browser = require('zombie');
var url = 'http://localhost:3000/'
var browser = new Browser();


describe('Creating items', function(next) {
  it ('visits the site', function(next) {
    browser.visit(url, function(err) {
      expect(browser.location.toString()).toBe(url);
      expect(browser.success).toBe(true);
      expect(browser.html('body')).toContain('Create a new item');
      next();
    });
  });

  it ('has a form to put information about items', function(next) {
    browser.visit(url, function(err) {
      expect(browser.query('input[id="itemName"]')).not.toBeNull();
      expect(browser.query('input[id="itemPrice"]')).not.toBeNull();
      expect(browser.query('input[type="submit"]')).not.toBeNull();
      next();
    });
  });

  it ('stores information about items', function(next) {
    browser.visit(url, function(err) {
      browser.fill('input[name="itemName"]', 'Macbook Air')
      .fill('input[name="itemPrice"]', '1000')
      .pressButton('#button', function() {
        expect(browser.success).toBe(true);
        expect(browser.location.toString()).toBe(url);
        expect(browser.query('table[id="items"]')).not.toBeNull();
        expect(browser.html('table')).toContain('Macbook Air', '1000');
        next();
      })
    });
  })
});
