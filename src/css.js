import CleanCSS from 'clean-css'

function css(value, options = {}) {
    return new CleanCSS(options).minify(value)
}

export default css