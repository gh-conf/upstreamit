const expect = require('chai').expect;
const { readConf } = require('@gh-conf/gh-conf-read');
const { writeConf } = require('@gh-conf/gh-conf-write');

const { Upstreamit } = require('../lib');


const UPSTREAM_CONFIG = '[remote "upstream"]\n\turl = https://github.com/taskcluster/taskcluster\n\tfetch = +refs/heads/*:refs/remotes/upstream/*\n';


describe('validate upstreaminit', () => {
  it('upstream details should be present', async () => {
    let config = await readConf(process.cwd());
    let modifiedConfig = config.replace('https://github.com/gh-conf/upstreamit', 'https://github.com/arshadkazmi42/taskcluster');
    await writeConf(process.cwd(), modifiedConfig);
    await Upstreamit(process.cwd());
    expect((await readConf(process.cwd())).includes(UPSTREAM_CONFIG)).to.equal(true);

    // Reset Original Config
    await writeConf(process.cwd(), config);
  });
  it('upstream throws error not a forked repository', async () => {
    await Upstreamit(process.cwd());
    expect((await readConf(process.cwd())).includes(UPSTREAM_CONFIG)).to.equal(false);
  });
});
