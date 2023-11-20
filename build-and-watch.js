#!/usr/bin/env node

import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  bundle: true,
   // jsxFactory: 'h',

  entryPoints: ['src/data/signalcraft-data.js', 'src/view/signalcraft-view.js'],
  entryNames: '[name]',
  outdir: 'dist',
  loader: {
     '.html': 'text',
     '.js': 'jsx',
   },
})

await ctx.watch()

let { host, port } = await ctx.serve({
    host:'127.0.0.1',
    servedir: '.',
})

console.log(`Serving on http://${host}:${port}/ and watching for changes!`);
