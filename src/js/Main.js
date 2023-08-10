/*global y, vls*/
import $ from 'jquery';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/draggable';
import {
  mxClient,
  mxUtils,
  mxCodec,
  mxEvent,
  mxRectangle
} from './misc/mxExport.js';
import CONST from './misc/Constants.js';
import Util from './misc/Util.js';

import WireframeModel from './WireframeModel.js';
import Wireframe from './Wireframe.js';
import Palette from './Palette.js';
import Editor from './Editor.js';
import Toolbox from './Toolbox.js';
import HierachyTree from './HierachyTree.js';
import TagRegistry from './tags/TagRegistry.js';

/**
 * The Main function of the Wireframing editor
 * @param {Object} config the configuration file
 * @param {boolean} disableDragging true if drag&drop of the wireframe canvas should be disabled else false
 * @param {boolean} showHierachy show the hierachy editor at startup
 * @return {Editor} the editor
 * @memberof module:WireframeEditor
 */
export default function (config, disableDragging, showHierachy) {
  if (!mxClient.isBrowserSupported()) {
    // Displays an error message if the browser is not supported.
    mxUtils.error('Browser is not supported!', 200, false);
    return new Error("Browser not supported");
  } else {
    let model = new WireframeModel();
    let container = document.getElementById('wireframe');
    //disable default context menu
    mxEvent.disableContextMenu(container);
    let wireframe = new Wireframe(container, model);

    let htmlPalette = document.getElementById('palette');
    let palette = new Palette(htmlPalette);

    let editor = new Editor(wireframe, palette, config);
    TagRegistry.initFromVLS(vls, config);

    //After the editor the add elements to window
    let xml = y.share.data.get('wireframe');
    let bounds;
    if (xml) {
      let doc = mxUtils.parseXml(xml);
      let codec = new mxCodec(doc);
      codec.decode(doc.documentElement.firstChild, model);
      Util.initSharedData(wireframe.getDefaultParent(), wireframe);
      model.initMetaFromXml(doc.documentElement);
      $('#wireframeWrap').css('width', model.getAttribute('width')).css('height', model.getAttribute('height'));
      wireframe.maximumGraphBounds = new mxRectangle(0, 0, parseInt(model.getAttribute('width')), parseInt(model.getAttribute('height')));
      bounds = wireframe.getBoundingBox(wireframe.getDefaultParent().children);
      let name = model.getMeta().getAttribute('_name');
      if (name && name.length > 0) {
        $('#draggingBar').append(name);
      }
      model.initSharedData();
      Util.Save(wireframe);
    }

    let htmlToolbox = document.getElementById('toolbox');
    new Toolbox(htmlToolbox, editor);
    HierachyTree.init(editor, showHierachy);
    $('#wireframeWrap').resizable({
      //handles: "n, e, s, w, se, sw, nw, ne",
      handles: "se",
      containment: '#wireframeContainer',
      //aspectRatio: 4/3,
      minWidth: bounds ? bounds.x + bounds.width : 320,
      minHeight: bounds ? bounds.y + bounds.height : 200,
      alsoResize: "#wireframe, #draggingBar",
      classes: {
        "ui-resizable-se": "ui-icon ui-icon-grip-diagonal-se"
      },
      stop: function (event, ui) {
        //propagate graph resize to other users; handled in Toolbox.js
        y.share.action.set(CONST.ACTIONS.SHARED.GRAPH_RESIZE, {
          userId: y.db.userId,
          height: ui.size.height,
          width: ui.size.width
        });
        model.setAttribute('height', ui.size.height);
        model.setAttribute('width', ui.size.width);
        Util.Save(wireframe);
      }
    });
    if (!disableDragging) {
      $("#wireframeWrap").draggable({
        handle: "#draggingBar",
        containment: '#wireframeContainer'
      });
    }

    $('.hsplit').click(function () {
      let $palette = $('#palette');
      let paletteWidth = $palette.css('width');
      if ($palette.is(':visible')) {
        $palette.hide();
        $('#wireframeContainer').css('left', '-=' + paletteWidth);
        $('#toolbox').css('left', '-=' + paletteWidth);
        $(this).css('left', '-=' + paletteWidth);
      } else {
        $palette.show();
        $(this).css('left', '+=' + paletteWidth);
        $('#wireframeContainer').css('left', '+=' + paletteWidth);
        $('#toolbox').css('left', '+=' + paletteWidth);
      }
    });
    return editor;
  }
}