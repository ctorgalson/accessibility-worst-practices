export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@picocss/pico/css/pico.slate.min.css": "css/pico.slate.min.css",
    "node_modules/@picocss/pico/css/pico.colors.min.css": "css/pico.colors.min.css",
  });
  eleventyConfig.addPassthroughCopy({ "src/_includes/**/*.css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/_includes/**/*.js": "js" });

  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("js");

  eleventyConfig.addCollection("entries", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/entries/*.md")
      .sort((a, b) => a.inputPath.localeCompare(b.inputPath))
  );

  eleventyConfig.addFilter("random", (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
