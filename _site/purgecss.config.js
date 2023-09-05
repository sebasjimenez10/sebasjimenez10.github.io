module.exports = {
  content: ["./docs/**/*.html"],
  css: ["./docs/assets/main.css"],
  // Tailwind CSS config
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
};
