var Browser = require('zombie');
var url = 'http://localhost:3000/users/new'
var browser = new Browser();

describe('Sign up', function(next) {
  it ('shows the signup form', function(next) {
    browser.visit(url, function() {
      expect(browser.success).toBe(true);
      expect(browser.html('body')).toContain('Create an account');
      expect(browser.query('input[name="email"]')).not.toBeNull();
      expect(browser.query('input[name="password"]')).not.toBeNull();
      expect(browser.query('input[name="passwordConfirmation"]')).not.toBeNull();
      expect(browser.query('input[type="submit"]')).not.toBeNull();
      next();
    });
  });

  it ('creates a new account', function(next) {
    browser.visit(url, function() {
      browser.fill('input[name="email"]', 'test@test.com')
      .fill('input[name="password"]', 'password')
      .fill('input[name="passwordConfirmation"]', 'password')
      .pressButton('#signup', function() {
        expect(browser.success).toBe(true);
        expect(browser.location.toString()).toBe('http://localhost:3000/');
        // implemente the expectation below after signing up a user
        // expect(browser.html('body')).toContain('Welcome!');
        next();
      });
    });
  });
});
