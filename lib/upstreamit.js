const logSymbols = require('log-symbols');
const { readConf } = require('@gh-conf/gh-conf-read');
const { writeConf } = require('@gh-conf/gh-conf-write');
const { ParentRepo } = require('@gh-conf/gh-api');
const { UserRepo } = require('@gh-conf/gh-conf-parse');

const Formatter = require('./formatter');
const Validator = require('./validator');


const upstreamit = async (currentPath) => {

  try {

    // Read config file content
    const configContent = await readConf(`${currentPath}`);

    // Check if upstream already added
    if (Validator.isUptreamed(configContent)) {
      console.log(logSymbols.info, 'Upstream already configured');
      return;
    }

    // Fetch current repository usernanme and repository name
    const { username, repository } = UserRepo();

    // Getting parent repo url
    const url = await ParentRepo(username, repository);
    if (!url) {
      console.log(logSymbols.error, 'Not a forked repository!!!');
      return;
    }

    // Formatting Parent Repo URL
    const upstreamData = Formatter(url);

    // Writting updated config
    await writeConf(`${currentPath}`, configContent + upstreamData);

    console.log(logSymbols.success, 'Upstream Configured!!!');
    return;

  } catch (err) {
    console.log(logSymbols.error, err);
  }
};


module.exports = upstreamit;
