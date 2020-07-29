const { join } = require('path')
const fs = require('fs-extra');
const packageInfo = require('./package.json');

const dev = join(__dirname, './src/banner.user.js')
const build = join(__dirname, `./user-script/${packageInfo.name}.user.js`)

const userScript = () => `
// ==UserScript==
// @name         ${packageInfo.name}
// @namespace    ${packageInfo.name}
// @description  ${packageInfo.description}
// @version      ${packageInfo.version}
// @author       ${packageInfo.author}
// @homepage     ${packageInfo.homepage}
// @license      ${packageInfo.license}

// @include      https://github.com/*
// @run-at       document-start

// @require      https://cdn.jsdelivr.net/npm/file-icons-js@1.0.3/index.min.js
// @require      file://${build}
// @noframes
// @connect      *
// ==/UserScript==
`;

fs.outputFile(dev, userScript());

console.log(`dev entry file:   file://${dev}`)
console.log(`build user script: file://${build}`)
