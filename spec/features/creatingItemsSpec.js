// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/shoppingMall');
// var items = db.get('items');
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
      expect(browser.query('input[id="category"]')).not.toBeNull();
      expect(browser.query('input[id="itemName"]')).not.toBeNull();
      expect(browser.query('input[id="description"]')).not.toBeNull();
      expect(browser.query('input[id="price"]')).not.toBeNull();
      expect(browser.query('input[id="property1"]')).not.toBeNull();
      expect(browser.query('input[id="value1"]')).not.toBeNull();
      expect(browser.query('input[id="property2"]')).not.toBeNull();
      expect(browser.query('input[id="value2"]')).not.toBeNull();
      expect(browser.query('input[id="property2"]')).not.toBeNull();
      expect(browser.query('input[id="value2"]')).not.toBeNull();
      expect(browser.query('input[type="submit"]')).not.toBeNull();
      next();
    });
  });

  it ('displays information about items', function(next) {
    browser.visit(url, function(err) {
      browser.fill('input[name="category"]', 'Electronics')
      .fill('input[name="itemName"]', 'Macbook Air')
      .fill('input[name="description"]', 'Good laptop')
      .fill('input[name="price"]', '1000')
      .pressButton('#button', function() {
        expect(browser.success).toBe(true);
        expect(browser.location.toString()).toBe(url);
        expect(browser.query('table[id="items"]')).not.toBeNull();
        expect(browser.html('table')).toContain('Electronics', 'Macbook Air', 'Good laptop', '1000');
        next();
      })
    });
  })
  // testing database.........
  // it ('stores information about items', function(next) {
  //   browser.visit(url, function(err) {
  //     browser.fill('input[name="category"]', 'Electronics')
  //     .fill('input[name="itemName"]', 'Apple Watch')
  //     .fill('input[name="description"]', 'Most personal device')
  //     .fill('input[name="price"]', '500')
  //     .fill('input[name="property1"]', 'type')
  //     .fill('input[name="value1"]', 'Rose Gold')
  //     .fill('input[name="property2"]', 'size')
  //     .fill('input[name="value2"]', 'medium')
  //     .pressButton('#button', function() {
  //       items.find()
  //       next();
  //     })
  //   });
  // })
});
