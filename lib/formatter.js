const Strmat = require('strmat');

const Constants = require('./constants');


const formatData = (url) => {

  return Strmat.format(Constants['UPSTREAM_CONFIG'], {
    'url': url
  });
};


module.exports = formatData;
