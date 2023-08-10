/*global y*/
/**
 * @module WireframeEditor
 */
import {
    mxGraphModel,
    mxUtils,
    mxCodecRegistry
} from './misc/mxExport.js';
import $ from 'jquery';
import Y from './../../node_modules/yjs/dist/y.js';
import _ from 'lodash';
import ComboAttributeMap from './misc/ComboAttributeMap.js';
import Util from './misc/Util.js';


/**
 * The data model of the wireframing editor
 * @classdesc The conceptual model behind the wireframe
 * @constructor
 * @extends mxGraphModel
 */
class WireframeModel extends mxGraphModel {
    constructor() {
        super();
        let that = this;
        let xmlDoc = mxUtils.createXmlDocument();
        let meta = xmlDoc.createElement('WireframeMeta');
        let comboAttrMap = new ComboAttributeMap();
        let strAttrs = [];
        /*
        let exclude = ['width', 'height'];
        if (window.hasOwnProperty('vls')) {
            for (let key in vls.nodes) {
                let node = vls.nodes[key];
                if (node.label === 'Widget') {
                    for (let attrKey in node.attributes) {
                        let attr = node.attributes[attrKey];
                        if (exclude.indexOf(attr.key) === -1) {
                            if (attr.value === 'string') {
                                meta.setAttribute('_' + attr.key, '');
                                strAttrs.push('_' + attr.key);
                            } else if (attr.value === 'boolean')
                                meta.setAttribute('_' + attr.key, true);
                            else if (attr.hasOwnProperty('options')) {
                                let values = Object.keys(attr.options);
                                comboAttrMap.addComboAttr('_' + attr.key, values);
                                meta.setAttribute('_' + attr.key, values[0]);
                            }
                        }
                    }
                }
    
            }
        }*/

        meta.setAttribute('id', Util.GUID());
        meta.setAttribute('width', '500');
        meta.setAttribute('height', '500');


        /**
         * initialize a shared y-text  type for the give attribute name
         * @param {String} attrName the attribute name
         * @return {undefined}
         */
        let initYText = attrName => {
            let ytext = y.share.attrs.get('meta' + attrName, Y.Text);
            if (!ytext)
                y.share.attrs.set('meta' + attrName, Y.Text);
            else {
                ytext.observe(that.getYTextObserver());
                meta.setAttribute(attrName, ytext.toString());
            }
        }

        /**
         * Get the observer function for the y-text types
         * @return {Function} the observer function
         */
        this.getYTextObserver = () => {
            let observer = _.debounce(evt => {
                let value = evt.object.toString();
                let path = evt.object.getPath()[0];
                let attrName = path.substring(path.indexOf('_'));
                meta.setAttribute(attrName, value);
                $('.wfSave').click();
            }, 500);
            return observer;
        }

        /**
         * Initilaize the shared y-text data types for the wireframe model
         * @return {undefined}
         */
        this.initSharedData = () => {
            for (let i = 0; i < strAttrs.length; i++) {
                initYText(strAttrs[i]);
            }
        }

        /**
     * Get the meta data object of the wireframe model
     * It consists of information for the widget canvas
     * @return {XMLDocument} the meta as a XMLDocument
     */
        this.getMeta = () => meta

        /**
         * Set a value for attribute with the given name
         * @param {String} name the name of the attribute 
         * @param {string|Integer|Boolean} value the value of the attribute
         * @return {Boolean} true if the meta data object has the attribute, false if the attribute does not exists
         */
        this.setAttribute = (name, value) => {
            if (!meta.hasAttribute(name)) return false;
            meta.setAttribute(name, value);
            return true;
        }

        /**
         * Get the attribute value for a give attribute name
         * @param {String} name the name of the attribute
         * @return {String} the value of the attribute
         */
        this.getAttribute = (name) => meta.getAttribute(name)

        /**
         * initialize the meta data object with a give XMLDocument
         * @param {XMLDocument} m the meta data object
         * @return {undefined}
         */
        this.initMetaFromXml = (m) => {
            meta = m;
        }

        /**
         * Get the map for the combo attribtues
         * @return {ComboAttributeMap} the ComboAttributeMap-instance
         */
        this.getComboAttrMap = () => comboAttrMap
    }
}

window.WireframeModel = WireframeModel;
let codec = mxCodecRegistry.getCodec(mxGraphModel);
codec.template = new WireframeModel();
mxCodecRegistry.addAlias('WireframeModel', 'mxGraphModel');

export default WireframeModel;