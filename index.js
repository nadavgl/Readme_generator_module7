const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;

function init() {
    console.log('Welcome to ReadMe generator');

    inquirer.prompt([
        {
            type: 'input',
            message: 'Add Title',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Add Description',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Add Installation',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'Add Usage',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'Add Tests Instructions',
            name: 'tests',
        },
        {
            type: 'input',
            message: 'Add Contributing guideline',
            name: 'contribute',
        },
        {
            type: 'input',
            message: 'Add Github Username',
            name: 'github',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Pick a license type',
            choices: ['Apache 2.0', 'GNU General Public License v3.0', 'MIT License']
        }
    ])
    .then((answers) => {
        writeFile('README.md', generateREADME(answers))
            .then(() => console.log('Successfully wrote to README.md'))
            .catch((error) => console.error('Error generating README:', error));
    })
    .catch((error) => console.error('Error during prompting:', error));
}

const licenseBadges = {
    'Apache 2.0': '![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)',
    'GNU General Public License v3.0': '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)',
    'MIT License': '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)'
};

const licenseNotices = {
    'Apache 2.0': 'This project is licensed under the Apache License 2.0.',
    'GNU General Public License v3.0': 'This project is licensed under the GNU General Public License v3.0.',
    'MIT License': 'This project is licensed under the MIT License.'
};

const generateREADME = ({ title, description, installation, usage, tests, contribute, github, license }) => {
    const licenseBadge = licenseBadges[license];
    const licenseNotice = licenseNotices[license];

    return `# ${title}

${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contribution](#contribution)
- [Questions](#questions)
- [License](#license)

## Description

${description}

## Installation

${installation}

## Usage

${usage}

## Tests

${tests}

## Contribution

${contribute}

## Questions

For any questions, you can find me on [GitHub](https://github.com/${github}).

## License

${licenseNotice}
`;
}

init();
