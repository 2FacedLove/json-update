// Generated by ToffeeScript 1.6.3-1
(function() {
  var assert, fs, json;

  assert = require('assert');

  fs = require('fs');

  json = require('../lib/json-update.js');

  describe('json-update', function() {
    describe('#load()', function() {
      return it('should read a JSON file into an object', function(done) {
        return json.load('test.json', function(err, obj) {
          console.log(err);
          assert.equal(obj.test1, 'hello');
          assert.equal(obj.test2, 2);
          return done();
        });
      });
    });
    describe('update non-existing', function() {
      return it('should create a subdirectory and JSON file with data', function(done) {
        if (fs.existsSync('sub')) {
          fs.unlinkSync('sub/test2.json');
          fs.rmdirSync('sub');
        }
        return json.update('sub/test2.json', {
          test: 'val'
        }, function(err) {
          assert.equal(err, null);
          return fs.exists('sub/test2.json', function(exists) {
            assert.equal(exists, true);
            return fs.readFile('sub/test2.json', 'utf8', function(err, str) {
              var dat;
              assert.equal(null, err);
              dat = JSON.parse(str);
              assert.equal(dat.test, 'val');
              return done();
            });
          });
        });
      });
    });
    return describe('update existing', function() {
      return it('should update existing JSON file with data ..', function(done) {
        return json.update('sub/test2.json', {
          test: 'new'
        }, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.test, 'new');
          return fs.readFile('sub/test2.json', 'utf8', function(err, str) {
            var read;
            read = JSON.parse(str);
            assert.equal(read.test, 'new');
            return done();
          });
        });
      });
    });
  });

}).call(this);
