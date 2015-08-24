var exec = require('cordova/exec');

exports.coolMethod = function(arg0, success, error) {
    console.log("coolMethod was called");
    console.log(success);
    exec(success, error, "LarryPlugin", "coolMethod", [arg0]);
};



