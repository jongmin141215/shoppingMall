var Browser = require('zombie');
var url = 'http://localhost:3000/'
var browser = new Browser();


describe('Creating items', function(next) {
  it ('visits the site', function(next) {
    browser.visit(url, function(err) {
      expect(browser.location.toString()).toBe(url);
      expect(browser.success).toBe(true);
      expect(browser.html('body')).toContain('Create your own shopping mall');
      next();
    });
  });

  it ('has a form to put information about items', function(next) {
    browser.visit(url, function(err) {
      expect(browser.success).toBe(true);
      expect(browser.query('input[class="property"]')).not.toBeNull();
      expect(browser.query('input[type="submit"]')).not.toBeNull();
      next();
    });
  });

  it ('stores information about items', function(next) {
  
  })
});
