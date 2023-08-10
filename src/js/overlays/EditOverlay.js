/**
 * @module Overlays
 */
import { mxCellOverlay, mxUtils, mxConstants, mxImage, mxEvent, mxPoint } from '../misc/mxExport.js';
import CONST from '../misc/Constants.js';
import PropertyEditor from '../PropertyEditor.js';

/**
 * The overlay to open the property editor
 * @constructor
 * @param {string} imageURL the url to the image of overlay
 * @param {*} cursor the cursor
 * @extends mxCellOverlay
 */
class EditOverlay extends mxCellOverlay {
    constructor(imageURL, cursor) {
        super(new mxImage(CONST.IMAGES.FLASH || imageURL, CONST.TAG.SIZE, CONST.TAG.SIZE), 'Edit Attributes', mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, new mxPoint(0, -15), cursor);
    }
    /**
     * Bind the click event to the overlay to open the property editor
     * @param  {Wireframe} graph the wireframe
     * @return {undefined}
     */
    bindClickEvent(graph) {
        this.addListener(mxEvent.CLICK, (sender, event) => {
            var mouseEvent = event.getProperty('event');
            new PropertyEditor(event.getProperty('cell'), graph, mouseEvent.x, mouseEvent.y);
        })
    };
}

export default EditOverlay;