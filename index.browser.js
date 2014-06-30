/**
 * Created by liuliu on 14-6-9.
 */
var ipc = require('ipc');
ipc.on('UserClick_signin', function(event, arg) {

    var ss=require("shadowsocks");
    window.LocalSSTunnelServer = ss.createServer("s2.liuliu.net", "3389", "6660", "37213721", "aes-256-cfb", 1000 *  600, '127.0.0.1');

    console.log(arg);  // prints "ping"
    event.sender.send('UserClick_signin-reply', 'done!');
});