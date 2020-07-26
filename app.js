const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const generatedTeam = [];

function init() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "What is your Manager's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your Manager's Id number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your Manager's email?",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your Manager's office number?",
            }
        ])
        .then(function (data) {
            // create manager card
            var manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            generatedTeam.push(manager);

            generatingTeam()
        })
};

function generatingTeam() {
    inquirer
        .prompt([{
            type: "list",
            name: "teamMember",
            message: "Would you like to add more team members?",
            choices: ["Add an Engineer", "Add an Intern", "Make team"]
        }])
        .then(function (answers) {
            // create a switch statement to choose between engineer, intern, or build team
            statement = answers.teamMember;

            switch (statement) {
                case "Add an Engineer":
                    addEngineer();
                    break;

                case "Add an Intern":
                    addIntern();
                    break;

                case "Make team":
                    makeTeam();
                    break;
            }
        })
};

function addEngineer() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "What is your Engineer's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your Engineer's Id number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your Engineer's email?",
            },
            {
                type: "input",
                name: "github",
                message: "What is your Engineer's GitHub?",
            }
        ])
        .then(function (data) {
            // create Engineer card
            var engineer = new Engineer(data.name, data.id, data.email, data.github);
            generatedTeam.push(engineer);

            generatingTeam()
        })
};

function addIntern() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "What is your Intern's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your Intern's Id number?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your Intern's email?",
            },
            {
                type: "input",
                name: "school",
                message: "What is your Intern's school?",
            }
        ])
        .then(function (data) {
            // create manager card
            var intern = new Intern(data.name, data.id, data.email, data.school);
            generatedTeam.push(intern);
            generatingTeam()
        })
};

function makeTeam() {
    fs.writeFileSync(outputPath, render(generatedTeam), "utf-8");
};

init();







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! 