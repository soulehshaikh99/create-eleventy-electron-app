// Imports useful for minifying functionality
const cleancss = require("clean-css");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
    // The directory to copy while building the eleventy app
    eleventyConfig.addPassthroughCopy("src/assets");

    // Configuration responsible for minifying html
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    // Configuration responsible for minifying css
    eleventyConfig.addFilter("cssmin", function (code) {
        return new cleancss({}).minify(code).styles;
    });

    // Configuration responsible for specifying the input and output directories to eleventy build command
    return {
        dir: {
            input: "src",
            output: "build"
        }
    };
};