import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import { rollup } from "@ttungbmt/module-config"
import pkg from './package.json'
import htmlPkg from './node_modules/html-minifier/package.json'

const input = './src/index.js'

const replaceLibs = {
    'uglify-js': 'terser', // Thay đổi thư viện
    'UglifyJS': 'Terser',
    'UglifyJS.minify': 'Terser.minify',
}

rollup.setConfig({
    pkg,
    moduleName: 'minify',
})

const customOptions = (config, minify) => {
    config.external = []
    config.plugins = [
        replace(replaceLibs),
        nodeResolve({
            preferBuiltins: true,
            browser: true,
        }),
        commonjs(),
        globals(),
        builtins(),
        filesize(),
    ]
    if (minify) config.plugins = config.plugins.concat(terser())

    return config
}

export default [
    rollup(input, [
        [pkg.main, 'cjs'],
        [pkg.module, 'es'],
    ], {
        external: [
            ...Object.keys(htmlPkg.dependencies)
        ],
        plugins: p => [
            replace(replaceLibs),
            nodeResolve({
                browser: true,
            }),
            commonjs(),
            filesize(),
        ]
    }),
    rollup(input, [pkg.unpkg, 'umd'], v => customOptions(v)),
    rollup(input, [pkg.unpkg.replace('.js', '.min.js'), 'umd'], v => customOptions(v, true)),
];
