const fs = require('fs');

const [_, __, title, description, acknowledgement, tags] = process.argv;
const time = new Date();
time.setMilliseconds(0);
time.setHours(time.getHours() - time.getTimezoneOffset()/60);
const format = `---
title: "${title}"
date: "${time.toISOString()}"
description: "${description}"
acknowledgement: ${acknowledgement}
tags: ${tags}
---
`;

const padNum = num => num < 10 ? `0${num}` : num;
const folder = `content/blog/${time.getFullYear()}${padNum(time.getMonth() + 1)}${time.getDate()}-${title.toLowerCase().replace(/ /g,'-')}`;

fs.mkdirSync(folder);
fs.writeFileSync(`${folder}/index.md`, format);
