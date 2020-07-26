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
    console.log("Generating team...")
    fs.writeFileSync(outputPath, render(generatedTeam), "utf-8");
};

init();
