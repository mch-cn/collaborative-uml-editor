/**
 * @module Shapes
 */
import {
    mxUtils,
    mxShape,
    mxStencil
} from '../misc/mxExport.js';

/**
 * @classdesc The shape for the Button-element
 * @constructor
 * @extends mxShape
 * @see Button
 */
class ButtonShape extends mxShape {
    constructor() {
        let str = '<shape name="button" h="25" w="171" aspect="1"><foreground><fontsize size="50"/><text str="Button" x="85" y="10" align="center" valign="middle"/></foreground><background><strokecolor color="#a4a4a4"/><fillcolor color="#e3e3e4"/><roundrect x="0" y="0" w="171" h="25" arcsize="10.851851851851851"/><fillstroke/></background></shape>';
        let xml = mxUtils.parseXml(str);
        let stencil = new mxStencil(xml.documentElement);
        super(stencil);
    }
}
export default ButtonShape;