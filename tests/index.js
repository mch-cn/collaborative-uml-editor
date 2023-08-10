import {
    mxWindow,
    mxUtils
} from '../src/js/misc/mxExport.js';
import $ from 'jquery';
import GoogleLogin from '../src/js/auth/GoogleLogin.js';
import YjsSync from '../src/js/misc/YjsSync.js';
import Main from '../src/js/Main.js';

import WireframeTest from './src/Wireframe.test.js';
import OperationsTest from './src/Operations.test.js';

import config from '../src/data/config.json';

$(function () {
    YjsSync().done(function (y) {
        var vls = y.share.data.get('metamodel');
        if (vls) {
            window.vls = vls;
        } else {
            var vls = require('../src/data/vls.json');
            window.vls = vls;
        }
        //Important load a vls before calling Main
            var editor = Main(config, false, true);
            GoogleLogin();

            mocha.setup('bdd');
            //mocha.checkLeaks();
            //mocha.timeout(1000);

            var tb = document.getElementById('mocha');
            var wnd = new mxWindow('Tests', tb, 850, 50, 550, 550, true, true);
            wnd.setVisible(true);
            wnd.setResizable(true);
            wnd.setScrollable(true);
            wnd.setMaximizable(true);
            var doc = mxUtils.parseXml(y.share.data.get('wireframe'));
            WireframeTest(doc.documentElement, editor.graph);
            OperationsTest(editor);                        
            mocha.run();

    });
});