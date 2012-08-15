/*
 * suite.js - A top level module for `suite`
 */

/*
 * Requiring modules
 */
var path = require('path')
  , fs = require('fs')
  , cp = require('child_process')
  , colors = require('colors');

module.exports = function (command, options) {
  return new Suite(command, options);
};

var Suite = function (command, options) {
  var self = this;

  this.command = command;

  this.stats = {
    pass: 0,
    fail: 0,
    time: 0
  };

  this.options = {
    prefix: '',
    rjust: 3,
    program: 'program',
    input: 'input',
    answer: 'answer'
  };

  Object.keys(options || {}).forEach(function (key) {
    self.options[key] = options[key];
  });

  return this;
};

Suite.prototype.rjust = function (i, r) {
  var ret = '';
  for (var j = i.toString().length; j<r; j+=1) {
    ret += '0';
  }
  ret += i;
  return ret;
};

Suite.prototype.run = function (testCase, callback) {
  this.stats.time -= Date.now();

  var self = this, input = ''
    , testCasePad = typeof testCase === 'number' ? this.rjust(testCase, this.options.rjust) : ''
    , testDir = typeof testCase === 'string' ? testCase : testCasePad
    , testCase = this.options.prefix + testDir;

  if (fs.existsSync(testCase) && fs.existsSync(testCase + '/' + this.options.program)) {
    if (fs.existsSync(testCase + '/' + this.options.input)) {
      input = " < " + testCase + '/' + this.options.input;
    }
    console.log(testDir.cyan.bold);
    cp.exec(this.command + ' ' + testCase + '/' + this.options.program + input + ' > ' + testCase + '/output', function (err, data) {
      if (err) {
        self.result('> NO TESTCASE', callback);
      } else {
        cp.exec('diff -N ' + testCase + '/' + self.options.answer + ' ' + testCase + '/output', function (err, data) {
          self.result(data, callback);
        });
      }
    });
  } else {
    this.stats.time += Date.now();
    callback();
  }
};

Suite.prototype.result = function (data, callback) {
  if (data == '') {
    console.log('\tPASS'.green.bold);
    this.stats.pass += 1;
  } else {
    console.log('\tFAIL'.red.bold);
    this.stats.fail += 1;
    this.diffput(data);
  }
  this.stats.time += Date.now();
  callback();
};

Suite.prototype.diffput = function (diff) {
  diff.split("\n").forEach(function (line) {
    if (line[0] == '>') {
      console.log("\t\t" + ("+ " + line.slice(2)).green.bold);
    } else if (line[0] == '<') {
      console.log("\t\t" + ("- " + line.slice(2)).red.bold);
    } else if (line[0] != '-') {
      console.log("\t\t  " + line.yellow.bold);
    }
  });
};

Suite.prototype.statsput = function () {
  console.log([
    '',
    'Finished ' + (this.stats.pass + this.stats.fail).toString().cyan.bold + ' tests in ' + (this.stats.time/1000).toString().yellow.bold + ' seconds',
    this.stats.pass.toString().green.bold + ' passes, ' + this.stats.fail.toString().red.bold + ' failures.'
  ].join("\n"));
};
