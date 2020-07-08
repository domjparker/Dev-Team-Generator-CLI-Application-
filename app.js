const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const teamArray = [];

function addTeamMember() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "addEmployeeYesNo",
        choices: ["Add a manager to team","Add an engineer to team","Add an intern to team","Get the team HTML file","Quit"]
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
            default:
                console.log("This has ended the application."); 
                break;
        }
    })
};

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
    ]).then(function (addManager) {
        const thisManager = new Manager(addManager);
        teamArray.push(thisManager);
        console.log(`${addManager.name} has been added as a manager. Your team now has ${teamArray.length} member(s).`);
        addTeamMember()
    })
};

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
    ]).then(function (addEngineer) {
        const thisEngineer = new Engineer(addEngineer);
        teamArray.push(thisEngineer);
        console.log(`${addEngineer.name} has been added as a manager. Your team now has ${teamArray.length} member(s).`);
        addTeamMember()
    })
};

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
    ]).then(function (addIntern) {
        const thisIntern = new Intern(addIntern);
        teamArray.push(thisIntern);
        console.log(`${addIntern.name} has been added as a manager. Your team now has ${teamArray.length} member(s).`);
        addTeamMember()
    })
};

function getTeamFile(outputPath,renderTeam) {
    if(!teamArray.length) {
        console.log("First, you need to add members to the team.");
        addTeamMember();
    }
    else {
        
    }
};

addTeamMember()







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
// for the provided `render` function to work! ```
