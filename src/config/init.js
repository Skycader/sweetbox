const readline = require('readline-sync');
const init = require('./replace.js');

console.log('🏗️ initializing project');
const projectName = readline.question('📝 Project name: ');
const appName = readline.question('📝 App name: ');
const projectManufacturer = readline.question('📝 Manufacturer name: ');

let result = 1;
result = result * init(/project-name/g, projectName, 'package.json');
result = result * init(/app-name/g, appName, 'src/index.html');
result = result * init(/app-name/g, appName, 'src/config/app.config.ts');
result =
  result *
  init(
    /project-manufacturer/g,
    projectManufacturer,
    'src/config/app.config.ts',
  );

if (result) console.log('✅ project has been successfuly initialized!');
if (!result) console.log('❗Something went wrong');
