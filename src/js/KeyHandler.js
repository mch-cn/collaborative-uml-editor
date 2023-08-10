/**
 * @module WireframeEditor
 */
import { mxDefaultKeyHandler } from './misc/mxExport.js';
import CONST from './misc/Constants.js';

/**
 * Defines the keyboard shortcuts and their actions
 * 
 * For key codes see:
 * https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
 * @classdesc The KeyHandler for the Wireframing Editor
 * @constructor
 * @param {mxEditor} editor the wireframeing editor 
 * @extends mxDefaultKeyHandler
 */
class KeyHandler extends mxDefaultKeyHandler{
    constructor(editor){
        super(editor);

        //CTRL+delete-key
        this.bindAction(46, CONST.ACTIONS.SHARED.DELETE, 17);

        //CTRL+G for shared grouping
        this.bindAction(71, CONST.ACTIONS.SHARED.GROUP, 17);

        //CTRL+H for shared ungrouping
        this.bindAction(72, CONST.ACTIONS.SHARED.UNGROUP, 17);

        //CTRL+Z for shared Undo
        this.bindAction(90, CONST.ACTIONS.SHARED.UNDO, 17);

        //CTRL+Y for shared Redo
        this.bindAction(89, CONST.ACTIONS.SHARED.REDO, 17);

        //CTRL+C for copy
        this.bindAction(67, CONST.ACTIONS.COPY, 17);

        //CTRL+V for shared paste
        this.bindAction(86, CONST.ACTIONS.PASTE, 17);

        //CTRL+U
        this.bindAction(85, CONST.ACTIONS.SHOW_USER_LIST, 17);

        //CTRL+P
        this.bindAction(80, CONST.ACTIONS.SHOW_CONSOLE, 17);

        //CTRL+I
        this.bindAction(73, CONST.ACTIONS.HIERACHY_TREE, 17);
    }
}
export default KeyHandler;