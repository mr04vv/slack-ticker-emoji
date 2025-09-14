let gif = null;

self.addEventListener('message', function(e) {
  const { type, data } = e.data;

  if (type === 'init') {
    importScripts('https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js');
  } else if (type === 'render') {
    const { frames, width, height, quality, delay } = data;

    gif = new GIF({
      workers: 2,
      quality: quality || 10,
      width: width,
      height: height,
      workerScript: 'https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js'
    });

    frames.forEach(frame => {
      gif.addFrame(frame, { delay: delay });
    });

    gif.on('finished', function(blob) {
      self.postMessage({ type: 'finished', blob: blob });
    });

    gif.on('progress', function(progress) {
      self.postMessage({ type: 'progress', progress: progress });
    });

    gif.render();
  }
});