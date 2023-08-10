/**
 * @module Misc
 */

import mxLib from 'mxgraph-js';
import CONST from './Constants.js';

/**
 * Exports the mxGraph modules
 */
/*var mxLib = mxGraphLib({
    mxImageBasePath: CONST.MXGRAPH.IMAGE_BASE_PATH,
    mxBasePath: ".",
    mxLoadStylesheets: false,
    mxLoadResources: false
});*/
/*var mxgraph = require("../node_modules/mxgraph/javascript/dist/build")({
      mxImageBasePath: "../node_modules/mxgraph/javascript/src/images",
      mxBasePath: "../node_modules/mxgraph/javascript/src"
    });*/


var mxClient = mxLib.mxClient;
var mxEditor = mxLib.mxEditor;
var mxGraphModel = mxLib.mxGraphModel;
var mxGraph = mxLib.mxGraph;
var mxCell = mxLib.mxCell;
window.mxCell = mxCell; //for the encoding and decoding

var mxCodec = mxLib.mxCodec;
var mxCodecRegistry = mxLib.mxCodecRegistry;
window.mxCodecRegistry = mxCodecRegistry;

var mxEvent = mxLib.mxEvent;
var mxGraphHandler = mxLib.mxGraphHandler;
var mxConstants = mxLib.mxConstants;
var mxKeyHandler = mxLib.mxKeyHandler;
var mxRubberband = mxLib.mxRubberband;
var mxUtils = mxLib.mxUtils;
var mxRectangle = mxLib.mxRectangle;
var mxToolbar = mxLib.mxToolbar;
var mxStencil = mxLib.mxStencil;
var mxStencilRegistry = mxLib.mxStencilRegistry;

var mxGeometry = mxLib.mxGeometry;
window.mxGeometry = mxGeometry;

var mxDefaultKeyHandler = mxLib.mxDefaultKeyHandler;
var mxForm = mxLib.mxForm;
var mxDefaultToolbar = mxLib.mxDefaultToolbar;

var mxLog = mxLib.mxLog;
window.mxLog = mxLog;

var mxClipboard = mxLib.mxClipboard;
var mxWindow = mxLib.mxWindow;
var mxShape = mxLib.mxShape;
var mxCellRenderer = mxLib.mxCellRenderer;
var mxObjectCodec = mxLib.mxObjectCodec;
var mxCellOverlay = mxLib.mxCellOverlay;
var mxCellHighlight = mxLib.mxCellHighlight;
var mxImage = mxLib.mxImage;
var mxPoint = mxLib.mxPoint;

var codec = new mxObjectCodec(new mxImage());
mxCodecRegistry.register(codec);

var codec = new mxObjectCodec(new mxPoint());
mxCodecRegistry.register(codec);

var mxPartitionLayout = mxLib.mxPartitionLayout;
var mxGraphLayout = mxLib.mxGraphLayout;
export {
    mxClient, mxEditor, mxGraph, mxGraphModel, mxCell, mxCodec, mxCodecRegistry, mxEvent, mxGraphHandler, mxConstants,mxImage, 
    mxKeyHandler, mxRubberband, mxUtils, mxRectangle, mxToolbar, mxStencil, mxStencilRegistry, mxWindow, mxShape, mxGeometry, mxDefaultKeyHandler,
    mxForm, mxDefaultToolbar, mxLog, mxClipboard, mxCellRenderer, mxObjectCodec, mxCellOverlay,
    mxPoint, mxCellHighlight, mxPartitionLayout, mxGraphLayout
};
