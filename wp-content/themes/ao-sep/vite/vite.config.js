import { defineConfig } from "vite"

import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import { splitVendorChunkPlugin } from 'vite'

import babel from "@rollup/plugin-babel"
import resolvePlugin from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"

export default defineConfig({
    plugins:
    [
        splitVendorChunkPlugin(),
        vituum(),
        nunjucks({
            root: './src',
            data: ['./src/data/**/*.json'],
        })
    ],
    server: {
        open: true
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                quietDeps: true
            },
        },
    },
    build: {
        assetsInlineLimit: 0,
        manifest: false,
        modulePreload: false,
        rollupOptions: {
            output: {
                chunkFileNames: "scripts/[name].js",
                entryFileNames: "scripts/[name].js",
                assetFileNames: (asset) => {
                    if (/\.css$/.test(asset.name ?? "")) {
                        return "styles/[name].css"
                    }
                    const fontsExts = /\.(woff2)$/i;
                    if (fontsExts.test(asset.name ?? "")) {
                        return `fonts/[name]${asset.name.match(fontsExts)[0]}`;
                    }
                    const imgsExts = /\.(jpeg|jpg|gif|png|webp|avif|heif|tiff|ico)$/i;
                    if (imgsExts.test(asset.name ?? "")) {
                        return `img/[name]${asset.name.match(imgsExts)[0]}`;
                    }
                    if (/\.svg$/.test(asset.name ?? "")) {
                        return "img/svg/[name].svg";
                    }
                    if (/sprite\.svg$/.test(asset.name ?? "")) {
                        return "img/svg-sprite/[name].svg"
                    }
                    return "assets/[name][extname]"
                },
            },
            plugins: process.argv.includes('--mode=production') ? [resolvePlugin(), commonjs(), babel({ babelHelpers: 'bundled' }), terser()] : []
        }
    }
})