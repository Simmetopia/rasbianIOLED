import typescriptPlugin from "rollup-plugin-typescript2";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import builins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

const plugins = [
  // nodeResolve makes rollup look for dependencies in the node_modules directory
  globals(),
  builins(),
  nodeResolve(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: "node_modules/**",
    namedExports: {
      // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
      // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
      // Just add the mentioned file / export here
    }
  }),
  typescriptPlugin({
    importHelpers: true,
    tsconfig: "tsconfig.json"
  })
];

plugins.push(uglify());

export default {
  input: "./src/main.ts",
  output: {
    file: "./build/bundle.js",
    format: "iife",
    name: "bundle"
  },

  plugins
};
