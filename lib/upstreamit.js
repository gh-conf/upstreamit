const ora = require('ora');
const { readConf } = require('@gh-conf/gh-conf-read');
const { writeConf } = require('@gh-conf/gh-conf-write');
const { ParentRepo } = require('@gh-conf/gh-api');
const { UserRepo } = require('@gh-conf/gh-conf-parse');

const Formatter = require('./formatter');
const Validator = require('./validator');

const spinner = ora();


const upstreamit = async (currentPath) => {
  
  try {

    // Start spinner
    spinner.start('Upstreaming...');

    // Read config file content
    const configContent = await readConf(`${currentPath}`);

    // Check if upstream already added
    if (Validator.isUptreamed(configContent)) {
      spinner.info('Upstream already configured');
      return;
    }

    // Fetch current repository usernanme and repository name
    const { username, repository } = UserRepo();

    // Getting parent repo url
    const url = await ParentRepo(username, repository);
    if (!url) {
      spinner.fail('Not a forked repository!!!');
      return;
    }

    // Formatting Parent Repo URL
    const upstreamData = Formatter(url);

    // Writting updated config
    await writeConf(`${currentPath}`, configContent + upstreamData);

    spinner.succeed('Upstream Configured!!!');
    return;

  } catch (err) {
    console.log(err);
  }
};


module.exports = upstreamit;
