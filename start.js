#!/usr/bin/env node

import * as esbuild from 'esbuild'

let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onEnd(result => {
      console.log(`build ended with ${result.errors.length} errors`)
      console.log('-'.repeat(80), '\n\n')
    })
  },
}

let ctx = await esbuild.context({
  bundle: true,
   // jsxFactory: 'h',
  entryPoints: ['src/craft.js'],
  outdir: 'out',
  loader: {
     '.html': 'text',
     '.js': 'jsx',
   },
  plugins: [examplePlugin],
})

const xxx = await ctx.watch(function(){console.log('XXX');})
console.log(xxx);
let { host, port } = await ctx.serve({
    host:'0.0.0.0',
    servedir: '.',
})

console.log(`Serving on http://${host}:${port}/ and watching for changes!`);
