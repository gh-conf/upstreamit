const ora = require('ora');
const upstreamCore = require('@gh-conf/upstream-core');

const spinner = ora();


const upstreamit = async (currentPath) => {
  
  try {
    spinner.start('Upstreaming...');
    await upstreamCore(currentPath);
    spinner.succeed('Upstream Configured!!!');
  } catch (err) {
    spinner.info(err.message);
    console.log(err);
  }
};


module.exports = upstreamit;
