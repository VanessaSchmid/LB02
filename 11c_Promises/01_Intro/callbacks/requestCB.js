const studentURL = "http://localhost:3000/students/";
const marksModulesURL = "http://localhost:3000/marks_modules/";


const getStudentCB = (id, callback) =>{
    const request1 = new XMLHttpRequest();
    request1.addEventListener('readystatechange', (evt) => {
        if (evt.target.readyState === 4 && evt.target.status === 200) {
            let data1 = evt.target.responseText;
            console.log(`log request ${data1}`);
            //Falls angeforderte Daten undefiniert ...
            if (typeof data1 == "undefined") {
                //... dann Fehlermeldung zurückgeben
                callback('Error occurred', undefined);
            } else {
                callback(undefined, data1);
            }
        } else if (evt.target.readyState === 4) {
            console.log(`Error occured with status ${evt.target.status}`);
        }
    });
    request1.open('GET', studentURL+id);
    request1.send();
}

const getModuleMarksCB = (id, callback) =>{
    const request1 = new XMLHttpRequest();
    request1.addEventListener('readystatechange', (evt) => {
        if (evt.target.readyState === 4 && evt.target.status === 200) {
            let data1 = evt.target.responseText;
            console.log(`log request ${data1}`);
            if (typeof data1 == "undefined") {
                callback('Error occurred', undefined);
            } else {
                callback(undefined, data1);
            }
        } else if (evt.target.readyState === 4) {
            console.log(`Error occured with status ${evt.target.status}`);
        }
    });
    request1.open('GET', marksModulesURL+id);
    request1.send();
}
