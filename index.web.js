/**
 * Created by liuliu on 14-6-9.
 */
// Web side code here. open index.server.js to see the Browser code.

var ipc = require('ipc');

// whenclick signin button
$("signin").click(function(){
    ipc.send('UserClick_signin', $('username').value);
    console.log("OK,SENT");
});
//
ipc.on('UserClick_signin-reply', function(arg) {
    windows.alert(arg);
    console.log(arg); // prints "pong"
});

