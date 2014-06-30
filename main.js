var app = require('app');  // Module to control application life.
var ipc = require('ipc');

var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var wndWriteEmail=null;
var wndSetting=null;


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    //if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1300, height: 768});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/resources/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // 打开或关闭开发者工具
    ipc.on('toggleDevTools', function (event, arg) {
        mainWindow.toggleDevTools();
    });

    ipc.on('openwndwriteemail', function (event, arg) {
        wndWriteEmail = new BrowserWindow({width: 860, height: 650});
        wndWriteEmail.loadUrl('file://' + __dirname + '/resources/wndwriteemail.html');
        wndWriteEmail.on('closed', function () {
            wndWriteEmail = null;
        });

    });

    ipc.on('sendmail', function (event, arg) {


        host = arg;
        ping = require('nodemailer');
        ping(host, function (stdout) {
            mainWindow.webContents.send('response', stdout);
        }, function (error, output) {
            mainWindow.webContents.send('responseError', {
                error: error,
                output: output
            });
        });
    });


});
