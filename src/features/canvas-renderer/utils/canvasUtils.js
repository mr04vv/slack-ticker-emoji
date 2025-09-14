import { CANVAS_SIZE } from '../../shared/constants';

export const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  return canvas;
};

export const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

export const drawBackground = (ctx, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

export const measureTextWidth = (ctx, text, font, fontSize, letterSpacing = 0, isBold = false) => {
  const fontWeight = isBold ? 'bold' : 'normal';
  ctx.font = `${fontWeight} ${fontSize}px ${font}`;
  const baseWidth = ctx.measureText(text).width;
  const totalSpacing = letterSpacing * (text.length - 1);
  return baseWidth + totalSpacing;
};

export const drawText = (ctx, text, x, y, config) => {
  const {
    font,
    fontSize,
    isBold = false,
    textColor,
    letterSpacing = 0,
    addBorder,
    borderColor,
    borderWidth,
    addShadow,
    shadowColor,
    shadowBlur,
  } = config;

  ctx.save();

  const fontWeight = isBold ? 'bold' : 'normal';
  ctx.font = `${fontWeight} ${fontSize}px ${font}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (addShadow) {
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  if (letterSpacing === 0) {
    if (addBorder) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.strokeText(text, x, y);
    }
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y);
  } else {
    let currentX = x;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (addBorder) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        ctx.strokeText(char, currentX, y);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(char, currentX, y);
      currentX += ctx.measureText(char).width + letterSpacing;
    }
  }

  ctx.restore();
};