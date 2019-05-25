const Constants = require('./constants');

const isUptreamed = (configContent) => {
  const upstreamRegex = new RegExp(Constants['UPSTREAM_KEY'], 'i');
  if (upstreamRegex.test(configContent)) {

    return true;
  }

  return false;
};


module.exports = {
  isUptreamed
};
