const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/excalidraw-renderer.bundle.js',
  format: 'iife',
  globalName: 'ExcalidrawRenderer',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  sourcemap: process.env.NODE_ENV === 'development',
  loader: {
    '.css': 'text'
  }
}).catch(() => process.exit(1));