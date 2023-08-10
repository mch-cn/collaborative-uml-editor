import $ from 'jquery';
import GoogleLogin from './js/auth/GoogleLogin.js';
import YjsSync from './js/misc/YjsSync.js';
import Main from './js/Main.js';
import Loader from './js/misc/Loader.js';

import config from './data/config.json';

$(function () {
    Loader.init();
    YjsSync().done(function (y) {
        Loader.checkSuccessful(0, 50);
        var vls = y.share.data.get('metamodel');
        if (vls)
            window.vls = vls;
        else {
            vls = require('./data/vls.json');
            window.vls = vls;
        }
        //Important load a vls before calling Main
        var editor = Main(config, false, false);
        Loader.checkSuccessful(1, 100);
        Loader.destroy(500);

    });
});
