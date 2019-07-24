import HTMLMinifier from '../node_modules/html-minifier/src/htmlminifier'

function html(value, options){
    return HTMLMinifier.minify(value, {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeTagWhitespace: true,
        ...options
    })
} 

export default html