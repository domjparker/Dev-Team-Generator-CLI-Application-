// *Global variables
// class files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// folder and file to be rendered to
const OUTPUT_DIR = path.resolve(__dirname, "output");  // ./output
const outputPath = path.join(OUTPUT_DIR, "team.html"); // ./output/team.html
// file with render functions for each type of employee
const render = require("./lib/htmlRenderer");
const teamArray = [];

// inquire what type of employee to add to team, and give option to get team file, or quit
function addTeamMember() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "addEmployeeYesNo",
        choices: ["Add a manager to team","Add an engineer to team","Add an intern to team","Get team HTML file","Quit"]
    }).then(function ({ addEmployeeYesNo }) {
        switch (addEmployeeYesNo) {
            case "Add a manager to team":
                addManager();
                break;
            case "Add an engineer to team":
                addEngineer();
                break;
            case "Add an intern to team":
                addIntern();
                break;
            case "Get team HTML file":
                getTeamFile(outputPath,render(teamArray));
                break;
            case "Quit":
                console.log("This has ended the application."); 
                break;
        }
    })
};

// inquire info when adding manager
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is this manager's id#?",
            name: "id"
        },
        {
            type: "input",
            message: "what is this manager's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "what is this manager's office number?",
            name: "officeNumber"
        }
    ]).then(function (ans) {
        const thisManager = new Manager(ans.name,ans.id,ans.email,ans.officeNumber);
        teamArray.push(thisManager);
        addTeamMember()
    })
};

// inquire info when adding engineer
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is this engineer's id#?",
            name: "id"
        },
        {
            type: "input",
            message: "what is this engineer's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is this engineer's Github username?",
            name: "github"
        }
    ]).then(function (ans) {
        const thisEngineer = new Engineer(ans.name,ans.id,ans.email,ans.github);
        teamArray.push(thisEngineer);
        addTeamMember()
    })
};

// inquire info when adding intern
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is this intern's id#?",
            name: "id"
        },
        {
            type: "input",
            message: "what is this intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What school does this intern attend?",
            name: "school"
        }
    ]).then(function (ans) {
        const thisIntern = new Intern(ans.name,ans.id,ans.email,ans.school);
        teamArray.push(thisIntern);
        addTeamMember()
    })
};

// initiate team info being written to HTML file
function getTeamFile(fileName,data) {
    if(!teamArray.length) {
        console.log("First, you need to add members to the team.");
        addTeamMember();
    }
    else {
        fs.writeFile(fileName,data,"utf8",function(err) {
            if (err) {
                throw (err);
            } 
            console.log("team File has been rendered")
        }) 
    }
};

// call function to start inquiry process
addTeamMember()