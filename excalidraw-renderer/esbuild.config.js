const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/excalidraw-renderer.js'],
  bundle: true,
  outfile: 'dist/excalidraw-renderer.bundle.js',
  format: 'iife',
  globalName: 'ExcalidrawRenderer',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.css': 'text'
  }
}).catch(() => process.exit(1));