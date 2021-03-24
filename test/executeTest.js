const test = require('th_unit09_unit_tests');
var path = require('path');

// we define a global app root variable so we can determine the root of the application
global.appRoot = path.dirname(__dirname) + path.sep;


// we manually execute the tests in the included package
test.executeMeetsTest();