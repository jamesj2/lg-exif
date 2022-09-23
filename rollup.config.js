/* imports */
import esbuild from "rollup-plugin-esbuild";
import { dependencies } from "./package.json";
import { builtinModules } from "module";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

/* build config */
export default {
    input: "src/index.js",
    output: [
        { file: "dist/lg-exif.es5.js", format: "es" },
        {
            file: "dist/lg-exif.js",
            format: "iife",
            exports: "auto",
        },
    ],
    plugins: [
        copy({
            targets: [{ src: "src/css/lg-exif.css", dest: "dist/css" }],
        }),
        resolve(),
        commonjs(),
        esbuild({ target: "es2015", minify: false }),
    ],
    external: builtinModules.concat(Object.keys(dependencies)),
};
