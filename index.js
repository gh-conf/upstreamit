#!/usr/bin/env node

const { Upstreamit } = require('./lib');


const configure = async (currentPath) => {

  await Upstreamit(currentPath);
};


// Triggering flip with current path
configure(process.cwd());
