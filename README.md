# suite [![Build Status](https://secure.travis-ci.org/pkumar/node-suite.png)](http://travis-ci.org/pkumar/node-suite)


A simple diff based test suite for executable programs with outputs

## Installation
```
npm install suite
```

## Usage

Let's say I want to test `genome` program and I have test directory at '/home/me/test' with structure

```
├── 001
├── 002
├── 003
└─┬ 004
  ├── answer
  ├── input
  └── program
```

```js
var suite = require('suite');

var genome = suite('/usr/bin/genome', { prefix: '/home/me/test/' });

genome.run(4, function () {
  genome.statsput();
});
```

### Options

* __prefix__: Prefix for the test directory
* __program__: The filename of program in test directory (_default:_ program)
* __input__: The filename of input in test directory (_default:_ input)
* __answer__: The filename of answer in test directory (_default:_ answer)
* __rjust__: The right padding if test case is number (_default:_ 3)

If you like this project, please watch this and follow me.

### Testing
```
npm test
```

## Contributors
Here is a list of [Contributors](http://github.com/pkumar/node-suite/contributors)

### TODO

__I accept pull requests and guarantee a reply back within a day__

## License
MIT/X11

## Bug Reports
Report [here](http://github.com/pkumar/node-suite/issues). __Guaranteed reply within a day__.

## Contact
Pavan Kumar Sunkara (pavan.sss1991@gmail.com)

Follow me on [github](https://github.com/users/follow?target=pkumar), [twitter](http://twitter.com/pksunkara)
