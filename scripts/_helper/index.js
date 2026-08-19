const htmlGenerator = require("./htmlGenerator.js");
const trqlt_tagcloud = require('./tagcloud.js');
const securityMeta = require('./securityMeta.js');

module.exports = function (hexo) {
  hexo.extend.helper.register('htmlGenerator', htmlGenerator);
  hexo.extend.helper.register('trqlt_tagcloud', trqlt_tagcloud);
  hexo.extend.helper.register('securityMeta', securityMeta(hexo));
};