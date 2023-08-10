/**
 * @module Shapes
 */
import {
    mxUtils,
    mxShape,
    mxConstants
} from '../misc/mxExport.js';


/**
 * @classdesc The shape for the AudioPlayer element
 * @constructor
 * @param {mxRectangle} bounds the bounds of the shape
 * @param {String} fill the fill color
 * @param {String} stroke the stroke type for the shape
 * @param {Integer} strokewidth the width of the stroke
 * @extends mxShape
 * @see AudioPlayer
 */
class AudioShape extends mxShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super();
        this.bounds = bounds;
        this.fill = "white";
        this.stroke = stroke;
        this.strokewidth = (strokewidth != null) ? strokewidth : 1;
        this.barPos = 20;
        this.barHeight = 30;
    }

    static cst = {
        FILL_COLOR2: 'fillColor2',
        TEXT_COLOR: 'textColor',
        STROKE_COLOR2: 'strokeColor2',
        STROKE_COLOR3: 'strokeColor3',
        SHAPE: 'AudioPlayer',
        BAR_POS: 'barPos',
        BAR_HEIGHT: 'barHeight'
    };
    /**
 * Function: paintVertexShape
 * 
 * Paints the vertex shape.
 * 
 * @return {undefined}
 */
    paintVertexShape(c, x, y, w, h) {
        var bgColor = mxUtils.getValue(this.style, mxConstants.STYLE_FILLCOLOR, 'white');
        var buttonColor = mxUtils.getValue(this.style, AudioShape.cst.FILL_COLOR2, 'grey');
        var frameColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, 'grey');
        var filledColor = mxUtils.getValue(this.style, AudioShape.cst.STROKE_COLOR2, 'grey');
        var emptyColor = mxUtils.getValue(this.style, AudioShape.cst.STROKE_COLOR3, 'grey');
        var barHeight = mxUtils.getValue(this.style, AudioShape.cst.BAR_HEIGHT, 25);

        w = Math.max(w, barHeight);
        h = Math.max(h, barHeight);

        c.translate(x, y);
        this.background(c, x, y, w, h, bgColor, frameColor);
        c.setShadow(false);
        this.otherShapes(c, x, y, w, h, buttonColor, frameColor, filledColor, emptyColor, h);
    };

    background(c, x, y, w, h, bgColor, frameColor) {
        c.setFillColor(bgColor);
        c.setStrokeColor(frameColor);
        c.begin();
        c.moveTo(0, 0);
        c.lineTo(w, 0);
        c.lineTo(w, h);
        c.lineTo(0, h);
        c.close();
        c.fillAndStroke();
    };

    /**
     * @param  {} c
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} w
     * @param  {Number} h
     * @param  {} buttonColor
     * @param  {} frameColor
     * @param  {} filledColor
     * @param  {} emptyColor
     * @param  {} barHeight
     * @return {undefined}
     */
    otherShapes(c, x, y, w, h, buttonColor, frameColor, filledColor, emptyColor, barHeight) {
        var barPos = mxUtils.getValue(this.style, AudioShape.cst.BAR_POS, '20');
        barPos = Math.max(0, barPos);
        barPos = Math.min(100, barPos);
        var strokeWidth = mxUtils.getValue(this.style, mxConstants.STYLE_STROKEWIDTH, '1');
        var buttonR = 8;
        var barY = 0;

        var barMin = buttonR;
        var barMax = w - buttonR;
        var barRange = barMax - barMin;
        var realBarPos = barRange * barPos / 100;
        var barEnd = barMin + realBarPos;

        //progress bar
        c.setStrokeColor(filledColor);
        c.begin();
        c.moveTo(0, barY);
        c.lineTo(barEnd, barY);
        c.stroke();
        c.setStrokeColor(emptyColor);
        c.begin();
        c.moveTo(barEnd, barY);
        c.lineTo(w, barY);
        c.stroke();

        //progress bar button
        c.setStrokeColor(frameColor);
        c.begin();
        c.ellipse(barEnd - buttonR, barY - buttonR, 2 * buttonR, 2 * buttonR);
        c.fillAndStroke();

        c.begin();
        c.setStrokeWidth(strokeWidth / 2);
        c.ellipse(barEnd - buttonR * 0.5, barY - buttonR * 0.5, buttonR, buttonR);
        c.fillAndStroke();
        c.setStrokeWidth(strokeWidth);

        var iconSize = barHeight * 0.3;
        var iconY = h - (barHeight + iconSize) * 0.5;
        var iconX = barHeight * 0.3;
        c.setFillColor(buttonColor);
        c.setStrokeColor(buttonColor);

        //play icon
        c.begin();
        c.moveTo(iconX, iconY);
        c.lineTo(iconX + iconSize, iconY + iconSize * 0.5);
        c.lineTo(iconX, iconY + iconSize);
        c.close();
        c.fillAndStroke();

        //volume icon
        var speakerX = barHeight;
        var speakerY = h - barHeight;
        c.moveTo(speakerX + barHeight * 0.05, speakerY + barHeight * 0.4);
        c.lineTo(speakerX + barHeight * 0.15, speakerY + barHeight * 0.4);
        c.lineTo(speakerX + barHeight * 0.3, speakerY + barHeight * 0.25);
        c.lineTo(speakerX + barHeight * 0.3, speakerY + barHeight * 0.75);
        c.lineTo(speakerX + barHeight * 0.15, speakerY + barHeight * 0.6);
        c.lineTo(speakerX + barHeight * 0.05, speakerY + barHeight * 0.6);
        c.close();
        c.fillAndStroke();

        c.begin();
        c.moveTo(speakerX + barHeight * 0.4, speakerY + barHeight * 0.35);
        c.arcTo(barHeight * 0.2, barHeight * 0.3, 0, 0, 1, speakerX + barHeight * 0.4, speakerY + barHeight * 0.65);
        c.moveTo(speakerX + barHeight * 0.425, speakerY + barHeight * 0.25);
        c.arcTo(barHeight * 0.225, barHeight * 0.35, 0, 0, 1, speakerX + barHeight * 0.425, speakerY + barHeight * 0.75);
        c.stroke();

        //fullscreen button
        var screenX = w - barHeight * 1.3;
        c.begin();
        c.moveTo(screenX + barHeight * 0.1, speakerY + barHeight * 0.4);
        c.lineTo(screenX + barHeight * 0.1, speakerY + barHeight * 0.3);
        c.lineTo(screenX + barHeight * 0.25, speakerY + barHeight * 0.3);

        c.moveTo(screenX + barHeight * 0.1, speakerY + barHeight * 0.6);
        c.lineTo(screenX + barHeight * 0.1, speakerY + barHeight * 0.7);
        c.lineTo(screenX + barHeight * 0.25, speakerY + barHeight * 0.7);

        c.moveTo(screenX + barHeight * 0.9, speakerY + barHeight * 0.4);
        c.lineTo(screenX + barHeight * 0.9, speakerY + barHeight * 0.3);
        c.lineTo(screenX + barHeight * 0.75, speakerY + barHeight * 0.3);

        c.moveTo(screenX + barHeight * 0.9, speakerY + barHeight * 0.6);
        c.lineTo(screenX + barHeight * 0.9, speakerY + barHeight * 0.7);
        c.lineTo(screenX + barHeight * 0.75, speakerY + barHeight * 0.7);
        c.stroke();

        var textColor = mxUtils.getValue(this.style, AudioShape.cst.TEXT_COLOR, 'grey');
        c.begin();
        c.setFontSize(barHeight * 0.5);
        c.setFontColor(textColor);
        c.text(barHeight * 1.9, h - barHeight * 0.45, 0, 0, '0:42/4:23', mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
    };
};
export default AudioShape;