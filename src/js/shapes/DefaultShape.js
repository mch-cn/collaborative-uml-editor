/**
 * @module Shapes
 */
import {
    mxUtils,
    mxShape,
    mxStencil
} from '../misc/mxExport.js';


/**
 * @classdesc The default shape for the UIObject-element
 * @constructor
 * @extends mxShape
 * @see UIObject
 */
class DefaultShape extends mxShape {
    constructor() {
        let str = '<shape name="default" w="128" h="128"><background><fillcolor color="white"/><strokecolor color="black"/><rect x="0" y="0" w="128" h="128"/><fillstroke/><path><move x="0" y="0"/><line x="128" y="128"/></path><fillstroke/><path><move x="128" y="0"/><line x="0" y="128"/></path><fillstroke/></background></shape>';
        let xml = mxUtils.parseXml(str);
        let stencil = new mxStencil(xml.documentElement);
        super(stencil);
    }
}
export default DefaultShape;