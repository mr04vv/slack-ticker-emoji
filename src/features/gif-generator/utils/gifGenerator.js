import { CANVAS_SIZE, DEFAULT_FPS } from '../../shared/constants';
import { createCanvas, clearCanvas, drawBackground, drawText, measureTextWidth } from '../../canvas-renderer/utils/canvasUtils';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

export const generateGifFrames = (config, onProgress) => {
  return new Promise((resolve) => {
    console.log('Generating frames with config:', config);
    const frames = [];

    // 一時的なcanvasを作成してテキスト幅を計測
    const tempCanvas = createCanvas();
    const tempCtx = tempCanvas.getContext('2d');
    const textWidth = measureTextWidth(tempCtx, config.text, config.font, config.fontSize, config.letterSpacing, config.isBold);

    console.log('Text width:', textWidth);

    const totalWidth = textWidth + CANVAS_SIZE;
    // アニメーション1ループに必要なピクセル数を速度で割ってフレーム数を計算
    const pixelsPerFrame = config.animationSpeed || 1;
    const frameCount = Math.max(30, Math.ceil(totalWidth / pixelsPerFrame));

    console.log('Frame count:', frameCount, 'Pixels per frame:', pixelsPerFrame);

    for (let i = 0; i < frameCount; i++) {
      const canvas = createCanvas();
      const ctx = canvas.getContext('2d');

      clearCanvas(ctx);
      drawBackground(ctx, config.backgroundColor);

      const offset = i * pixelsPerFrame;
      const x = CANVAS_SIZE - offset;
      const y = CANVAS_SIZE / 2;

      console.log(`Frame ${i}: x=${x}, y=${y}, text="${config.text}"`);

      drawText(ctx, config.text, x, y, config);

      // 画面外に出た場合の処理
      if (x + textWidth < 0) {
        drawText(ctx, config.text, x + totalWidth, y, config);
      }

      frames.push(canvas);

      if (onProgress) {
        onProgress((i + 1) / frameCount);
      }
    }

    console.log('Generated frames:', frames.length);
    resolve(frames);
  });
};

export const createGifFromFrames = async (frames, config) => {
  try {
    console.log('Creating GIF from frames using gifenc:', frames.length);

    if (frames.length === 0) {
      throw new Error('フレームがありません');
    }

    // GIFエンコーダーを初期化
    const gif = GIFEncoder();

    // フレーム間隔を計算（ミリ秒）
    const delay = Math.floor(1000 / DEFAULT_FPS);

    for (let i = 0; i < frames.length; i++) {
      const canvas = frames[i];
      const ctx = canvas.getContext('2d');

      // ImageDataを取得
      const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const data = new Uint8Array(imageData.data);

      // 256色に量子化
      const palette = quantize(data, 256);

      // パレットを適用
      const index = applyPalette(data, palette);

      // フレームをGIFに追加
      gif.writeFrame(index, CANVAS_SIZE, CANVAS_SIZE, {
        palette,
        delay
      });

      console.log(`Processed frame ${i + 1}/${frames.length}`);
    }

    // GIF生成完了
    gif.finish();

    // Uint8ArrayからBlobに変換
    const buffer = gif.bytes();
    const blob = new Blob([buffer], { type: 'image/gif' });

    console.log('Generated GIF blob size:', blob.size);
    return blob;

  } catch (error) {
    console.error('GIF creation error:', error);
    throw new Error(`GIF生成エラー: ${error.message}`);
  }
};