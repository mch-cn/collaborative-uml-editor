/**
 * @module UIElements/Basic
 */
import {
    mxUtils,
    mxConstants,
    mxGeometry
} from '../../misc/mxExport.js';
import UIControl from '../UIControl.js';

/**
 * A Container for UI control elements. Corresponds to the HTML div-element
 * @classdesc A HTMl div element
 * @constructor
 * @param {mxGeometry} [geometry= new mxGeometry(0, 0, 180, 150)] the width, height, x and y of the ui element
 * @extends UIControl
 */
class DivContainer extends UIControl {
    constructor(geometry) {
        if (!geometry)
            geometry = new mxGeometry(0, 0, 180, 150);
        var style = mxConstants.STYLE_SHAPE + "=" + mxConstants.SHAPE_SWIMLANE + ';' +
            mxConstants.STYLE_FILLCOLOR + "=none;" +
            mxConstants.STYLE_POINTER_EVENTS + "=true;" +
            mxConstants.STYLE_STROKECOLOR + '=rgba(91, 93, 90, 0.50);' +
            mxConstants.STYLE_VERTICAL_ALIGN + '=middle;' +
            mxConstants.STYLE_LABEL_BACKGROUNDCOLOR + '=none;' +
            mxConstants.STYLE_FONTSIZE + '=11;' +
            mxConstants.STYLE_STARTSIZE + '=0;' +
            //mxConstants.STYLE_HORIZONTAL + '=false;' +
            mxConstants.STYLE_FONTCOLOR + '=rgba(91, 93, 90, 0.25);' +
            mxConstants.STYLE_EDITABLE + "=0;";

        super(geometry, style);
        //this.setAttribute('label', 'Container');
        this.setConnectable(false);

    }
    /**
    * The HTML node name
    * @static 
    * @default div
    * @readonly
    */
    static HTML_NODE_NAME = 'div';

    /**
     * The Name of element in the Wireframing editor
     * @static 
     * @default UI Component Container
     * @readonly
     */
    static NAME = "UI Component Container";

}
export default DivContainer;