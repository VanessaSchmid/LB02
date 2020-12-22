/*
Thema: Schoolserver
Einfacher Server, um Daten (Studenten und Lehrbetrieb) im JSON Format an einen
Client zu senden.
Der Server dient zu Übung und Illustrationszwecken für Callbacks und Promises.
 */

let express = require("express");
let app     = express();
const port = process.env.PORT || 3000;

const server = app.listen(port);
console.log(`Running at Port ${port}`);
server.timeout = 1000 * 60 * 2; // 2 minutes

//https://www.w3schools.com/nodejs/nodejs_filesystem.asp
const fs = require('fs');
//https://nodejs.org/api/path.html
const path = require('path');

//Warning: Korrekt setzen!!
const staticPath = './82_Schoolserver/01_Intro/data/';


//Allow CORS-Request and set the default Content-Type
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/test', (req, res) => {
    let fileLoc = path.resolve(staticPath+'test.txt');
    fs.readFile(fileLoc, 'utf8',
        (err, text) => {
            res.send(text);
    });
});

app.get('/company', (req, res) => {
    let fileLoc = path.resolve(staticPath+'test.json');
    fs.readFile(fileLoc, 'utf8', (error, text) => {
        if (error) {
            console.error(`Fehler und hier die Fehlermeldung: ${error}`);
            res.send(`Ein Fehler ist passiert! Benachrichtigen Sie den Admin.`);
        } else {
            try {
                console.log(text);
                res.send(text);
            } catch (e) {
                console.error('Invalid JSON in file');
            }
        }
    });
});

app.get('/companies', (req, res) => {
    let fileLoc = path.resolve(staticPath+'company.json');
    fs.readFile(fileLoc, 'utf8', (error, text) => {
        if (error) {
            console.error(`Error ${error}`);
        } else {
            try {
                //JSON-Formt auslesen mit der Methode .parse
                const obj = JSON.parse(text);
                let out = "";
                //durch die Daten iterieren
                for (let row in obj.company){
                    for (let key in obj.company[row]){
                        out += `${key}: ${obj.company[row][key]}, `;
                    }
                }
                res.send(JSON.stringify(out, null, 4));
            } catch (e) {
                console.error('Invalid JSON in file');
            }
        }
    });
});

app.get('/students/:id', (req, res) => {
    let fileLoc = path.resolve(staticPath+'student.json');
    let student_id = req.params.id;

    fs.readFile(fileLoc, 'utf8', (error, text) => {
        if (error) {
            console.error(`Error ${error}`);
        } else {
            try {
                const obj = JSON.parse(text);
                let studentData = {};
                studentData.student_id = "DOES NOT EXIST!";
                for (let row in obj.school){
                    if (obj.school[row].id === parseInt(student_id)){
                        studentData = {
                            "student_id": obj.school[row].id,
                            "Nachname": obj.school[row].last_name,
                            "Vorname": obj.school[row].first_name,
                            "company_id": obj.school[row].company_id
                        }
                    }
                }
                res.send(JSON.stringify(studentData, null, 4));
            } catch (e) {
                console.error('Invalid JSON in file');
            }
        }
    });
});



//Noten eines Lernenden
//https://stackoverflow.com/questions/16507222/create-json-object-dynamically-via-javascript-without-concate-strings
app.get('/marks_modules/:id', (req, res) => {
    let fileLoc = path.resolve(staticPath+'marks.json');
    let student_id = req.params.id;

    fs.readFile(fileLoc, 'utf8', (error, text) => {
        if (error) {
            console.error(`Error ${error}`);
        } else {
            try {
                const obj = JSON.parse(text);
                let studentData = {};
                studentData.student_id = "DOES NOT EXIST!";
                for (let row in obj.marks_school){
                    if (obj.marks_school[row].student_id === parseInt(student_id)){
                        studentData.student_id = obj.marks_school[row].student_id;
                        studentData.modulelist = [];
                        let counter = 0;
                        let average = 0;
                        for (let mod in obj.marks_school[row].modules){
                            let module = obj.marks_school[row].modules[mod];
                            let marks = { "module": module.name, "mark": module.mark };
                            average += parseFloat(module.mark); counter++;
                            studentData.modulelist.push(marks);
                        }
                        studentData.modulelist.push({ "module":"average", "mark": (average/counter).toFixed(2)});
                        break;
                    }
                }
                res.send(JSON.stringify(studentData, null, 4));
            } catch (e) {
                console.error(`Invalid JSON in file: ${e}`);
            }
        }
    });
});

