/*global y*/
/**
 * @module Tags
 */
import {
    mxCellOverlay,
    mxUtils,
    mxConstants,
    mxCodec,
    mxCodecRegistry,
    mxObjectCodec,
    mxEvent
} from '../misc/mxExport.js';
import $ from 'jquery';
import Util from '../misc/Util.js';
import Y from './../../../node_modules/yjs/dist/y.js';
import _ from 'lodash';
import PropertyEditor from '../PropertyEditor.js';
import ComboAttributeMap from '../misc/ComboAttributeMap.js';

/**
 * @classdesc Abstract tag class for interacitivty tags.
 * 
 * Subclass of  {@link https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxCellOverlay-js.html#mxCellOverlay|mxCellOverlay}
 * @constructor
 * @abstract
 * @extends mxCellOverlay
 * @param {UIControl | AbstractTag} entity a tag or a ui element
 * @param {mxImage} image the image for the tag
 * @param {String} tooltip a description for the image
 * @param {mxPoint} offset mxCellOverlay documentation 
 * @param {*} cursor see mxCellOverlay documentation
 * @requires ComboAttributeMap
 * @requires Util
 * @requires PropertyEditor
 */
class AbstractTag extends mxCellOverlay {
    constructor(entity, image, tooltip, offset, cursor) {
        super(image, tooltip, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, offset, cursor);

        /**
         * the child tags for the tag
         * @member {Object}
         */
        var childTags = {};

        /**
         * The map contains the key and the possible values as array for all combo attributes for the tag
         * @member {ComboAttributeMap}
         */
        var comboAttrMap = new ComboAttributeMap();
        var xmlDoc = mxUtils.createXmlDocument();

        /**
         * Contains the data of the attributes for the tag
         * @member {XMLDocument}
         */
        this.tagObj = xmlDoc.createElement('tagObj');
        //take the tooltip as tag type if it is a generic tag else the constructor description
        this.tagObj.setAttribute('parent', '#');

        /**
         * The parent cell or tag
         * @member {AbstractTag|UIControl}
         */
        var _cell = entity;
        if (entity)
            this.tagObj.setAttribute('id', entity.getId() + '_' + Util.GUID());


        /**
         * Get the identifier as String
         * @return {String} the id of the tag as String
         */
        this.getId = function () {
            return this.tagObj.getAttribute('id');
        }
        /**
         * Get the map of the combo attributes
         * @return {undefined}
         */
        this.getComboAttrMap = () => comboAttrMap

        /**
         * Get the cell of the tag
         * @return {UIControl} the ui element of the tag
         */
        this.getCell = () => _cell

        /**
         * @param {UIControl} cell a reference to the cell that contains the tag
         * @return {undefined}
         */
        this.setCell = cell => {
            _cell = cell;
        }

        /**
         * @param {AbstractTag} tag the tag to add as child 
         * @return {undefined}
         */
        this.addChildTag = tag => {
            childTags[tag.getId()] = tag;
        }

        /**
         * Get all child tags 
         * @return {undefined}
         */
        this.getChildTags = () => childTags
    }
    /**
     * Click event for the property editor
     * @param {Wireframe} graph the wireframe or graph
     * @return {undefined}
     */
    bindClickEvent(graph) {
        this.addListener(mxEvent.CLICK, function (sender, event) {
            var mouseEvent = event.getProperty('event');
            var $editor = new PropertyEditor(event.getProperty('cell'), graph, mouseEvent.x, mouseEvent.y);
            $editor.tabs("option", "active", 1);
            $('.jstree').jstree(true).select_node(this.getId());
        });
    };
    /**
 * Serializes the Tag to XML
 * @return {XMLDocument} the XML representation of the Tag
 */
    toXML() {
        var encoder = new mxCodec();
        encoder.encodeDefaults = true;
        var result = encoder.encode(this);
        return mxUtils.getXml(result);
    }

    /**
     * Register a constructor to the mxCodecRegistry
     * @param {Function} ctor the constructor to register
     * @return {undefined}
     */
    static registerCodec = ctor => {
        var codec = new mxObjectCodec();
        codec.template = new ctor();
        mxCodecRegistry.register(codec);
    }
    /**
     * Set the value for a boolean attribute in tagObj and the property editor
     * @param  {String} name the name of the attribute
     * @param  {Boolean} value true or false
     * @return {undefined}
     */
    setBooleanAttributeValue(name, value) {
        this.tagObj.setAttribute(name, value);
        var id = this.getId().substring(0, this.getId().indexOf('_'));
        var $input = $('#' + id + '_tagAttribute').find('td:contains(' + name.substr(1) + ') + td input');
        if ($input.length > 0)
            $input[0].checked = value;
        $('.wfSave').click();
    }

    /**
     * Set the value for the combo attribute in tabObj and the property editor
     * @param {String} name the name of the attribute
     * @param {String} value the value for combo attribute
     * @return {undefined}
     */
    setComboAttributeValue(name, value) {
        this.tagObj.setAttribute(name, value);
        var id = this.getId().substring(0, this.getId().indexOf('_'));
        var $select = $('#' + id + '_tagAttribute').find('td:contains(' + name.substr(1) + ') + td select');
        if ($select.length > 0)
            $select.find('option[value="' + value + '"]').prop('selected', true);
        $('.wfSave').click();
    }

    /**
     * Create the shared data for the attribute
     * Empty function
     * @return {undefined}
     */
    createShared = () => { }

    /**
     * Initialize the shared data
     * Empty function
     * @return {undefined}
     */
    initShared = () => { }

    /**
     * Get the observer function for a string attribute
     * @return {Function} the observer function for the ytext object
     */
    getYTextObserver() {
        var that = this;
        var observer = _.debounce(evt => {
            var value = evt.object.toString();
            var path = evt.object.getPath()[0];
            var attrName = path.substring(path.lastIndexOf('_'));
            var cell = that.getCell();
            var tagRoot = cell.value.getElementsByTagName('tagRoot')[0];
            var tag = tagRoot.getElementsByTagName('tagObj').namedItem(that.getId());
            tag.setAttribute(attrName, value);
            if (evt.type !== 'delete' && y.db.userId === evt.object._content[evt.index].id[0])
                $('.wfSave').click();
            else if (evt.type === 'delete')
                $('.wfSave').click();
        }, 500);
        return observer;
    }

    /**
     * 
     * @param {String} attrName the name of the attribute
     * @return {undefined}
     */
    initYText(attrName) {
        var ytext = y.share.attrs.get(this.getId() + attrName, Y.Text);
        if (!ytext)
            y.share.attrs.set(this.getId() + attrName, Y.Text);
        //observer should be registered in callback
        else {
            ytext.observe(this.getYTextObserver());
            this.tagObj.setAttribute(attrName, ytext.toString());
        }
    }

}


export default AbstractTag;