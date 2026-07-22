module.exports = function (tags, config) {
  // 使用副本，避免污染原始配置对象
  var cfg = Object.assign({}, config);
  if (!cfg.fancy) {
    cfg.min_font = 1;
    cfg.max_font = 1;
    cfg.unit = 'em';
  }
  const html = tags ? this.tagcloud(tags, cfg) : this.list_tags();
  return cfg.fancy ? `<canvas width="500" height="500" id="tagCanvas">${html}</canvas>` : html;
};
