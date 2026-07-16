module.exports = function (tags, config) {
  if (!config.fancy) {
    config.min_font = 1;
    config.max_font = 1;
    config.unit = 'em';
  }
  const html = tags ? this.tagcloud(tags, config) : this.list_tags();
  return config.fancy ? `<canvas width="500" height="500" id="tagCanvas">${html}</canvas>` : html;
};
