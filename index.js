const fs = require("fs")
const inquirer = require("inquirer")
const { AsapScheduler } = require("rxjs/internal/scheduler/AsapScheduler")
const readmeTemplate = (title, motivation, solution, insight, installation, usage, contributions, license, tests, github, email) => {
        string = `
# ${title}

## Description
**What was your motivation?** <br>
${motivation} <br><br>
**What problem does your project solve?** <br>
${solution} <br><br>
**What did you learn from this project?** <br>
${insight}
        
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)
        
## Installation
${installation}
        
## Usage
${usage}
        
## Contributions
${contributions}
        
## License
https://img.shields.io/badge${license}
        
## Tests
${tests}
        
## Questions
Contact me: 
1. [${github}](https://github.com/${github})
2. [${email}]()`
        return string
}

inquirer.prompt([
        {
                type: 'input',
                name: 'github',
                message: 'What is your github username?'
        },
        {
                type: 'input',
                name: 'email',
                message: 'What is your email?'
        },
        {
                type: 'input',
                name: 'title',
                message: 'What is the name of your project?'
        },
        {
                type: 'input',
                name: 'motivation',
                message: 'What motivated this project?'
        },
        {
                type: 'input',
                name: 'solution',
                message: 'What solution does your project provide?'
        },
        {
                type: 'input',
                name: 'insight',
                message: 'What did you learn while building this project?'
        },
        {
                type: 'input',
                name: 'installation',
                message: 'List installation methods as comma seperated values. If none, input "none"'
        },
        {
                type: 'input',
                name: 'usage',
                message: 'What does the user need to know about using your repo?'
        },
        {
                type: 'input',
                name: 'contributions',
                message: 'List contributors as comma seperated values.'
        },
        {
                type: 'list',
                name: 'license',
                message: 'Which license should your repo use?',
                choices: ['MIT', 'Apache', 'GPL']
        },
]) .then((data) => {

        // Apply the correct license link
        let license;
        switch (data.license) {
                case "MIT":
                        license = "/github/license/:user/:repo"
                        break;
                
                case "Apache":
                        license = "/aur/license/:packageName"
                        break;

                case "GPL":
                        license = "/eclipse-marketplace/l/:name"
                        break;
        }

        // Makes a string that holds a list of installation methods
        let installation = '';
        if (data.installation != "none") {
                let arr = data.installation.split(",");
                for (let i = 0; i < arr.length; i ++) {
                        installation += `${i+1}. ${arr[i].trim()}<br>`
                }
        } else {
                installation = "n/a"
        }

        // Makes a string that holds a list of contributers
        let contributions = '';
        if (data.contributions.indexOf(",") >= 0) {
                let arr = data.contributions.split(",");
                for (let i = 0; i < arr.length; i ++) {
                        contributions += `<br>${i+1}. [${arr[i].trim()}](https://github.com/${arr[i].trim()})`
                }
        }

        const userReadme = readmeTemplate(data.title, data.motivation, data.solution, data.insight, installation, data.usage, contributions, license, data.tests, data.github, data.email)
        fs.writeFile("README.md", userReadme, (err) => 
                err ? console.log(err) : console.log('Success!')
        );
})
