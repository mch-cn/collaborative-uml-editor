/*global y*/
/**
 * @module Tags
 */
import {
    mxUtils,
    mxImage
} from '../misc/mxExport.js';
import AbstractTag from './AbstractTag.js';
import CONST from '../misc/Constants.js';
import Y from './../../../node_modules/yjs/dist/y.js';
import TagRegistry from './TagRegistry.js';

/**
 * @classdesc A generic tag class that represents a tag defined in the VLS
 * @constructor
 * @extends AbstractTag
 * @param {UIControl | AbstractTag} cell a tag or a ui element
 * @param {*} offset the offset
 * @param {String} className the node class as defined in the VLS
 */
class GenericTag extends AbstractTag {
    constructor(cell, offset, className) {

        let reg;
        try {
            reg = TagRegistry.get(className);
        }
        catch (e) {
            reg = null;
        }

        if (reg)
            super(cell, new mxImage(reg.image, CONST.TAG.SIZE, CONST.TAG.SIZE), className, offset);
        else
            super(cell, new mxImage(CONST.IMAGES.DEFAULT_TAG, CONST.TAG.SIZE, CONST.TAG.SIZE), className, offset);


        this.tagObj.setAttribute('tagType', className);

        this.initAttributes = () => {
            var reg = TagRegistry.get(this.tagObj.getAttribute('tagType'));
            for (var attrKey in reg.attrs) {
                var type = reg.attrs[attrKey];
                if (type === 'string')
                    this.tagObj.setAttribute('_' + attrKey, '');
                else if (type === 'boolean')
                    this.tagObj.setAttribute('_' + attrKey, true);
                else {
                    this.tagObj.setAttribute('_' + attrKey, type[0]);
                    this.getComboAttrMap().addComboAttr('_' + attrKey, type);
                }
            }
        }

        this.createShared = (createdByLocalUser) => {
            if (createdByLocalUser) {
                var attrs = TagRegistry.get(this.tagObj.getAttribute('tagType')).attrs;
                for (var attrKey in attrs) {
                    if (attrs.hasOwnProperty(attrKey) && attrs[attrKey] === 'string')
                        y.share.attrs.set(this.getId() + '_' + attrKey, Y.Text);
                }
            }
        }

        this.initShared = () => {
            var attrs = TagRegistry.get(this.tagObj.getAttribute('tagType')).attrs;
            for (var attrKey in attrs) {
                if (attrs.hasOwnProperty(attrKey) && attrs[attrKey] === 'string')
                    this.initYText('_' + attrKey);
            }
        }
        if (reg)
            this.initAttributes();

    }
}
AbstractTag.registerCodec(GenericTag);
export default GenericTag;