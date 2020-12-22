const nachnameEl = document.querySelector('#lr_nachname');
const vornameEl = document.querySelector('#lr_vorname');
const lehrbetriebElementID = 'lehrbetriebDetails';

function addItems(parentElId, text) {
    let node = document.createElement("li");
    node.classList.add('list-group-item');
    let textnode = document.createTextNode(text);
    node.appendChild(textnode);
    //parent element
    document.getElementById(parentElId).appendChild(node);
}


function validateForm(form) {
    let id = form.student_id.value;
    if (id == "") {
        alert("Name must be filled out");
        return false;
    }
    console.log(id);
    //Promise consumer
    getStudentPromise(id).then((data) => {
        let student = JSON.parse(data);
        nachnameEl.textContent = `Nachname: ${student.Nachname}`;
        vornameEl.textContent = `Vorname: ${student.Vorname}`;
        return {'student_id': id};
    }).then(idObj => getModuleMarksPromise(idObj.student_id))
        .then((data) => {
            console.log(data);
            let marks = JSON.parse(data);
            for (let row in marks.modulelist) {
                let el = marks.modulelist[row];
                //Füge alle Modul-Noten hinzu
                addItems("marks_module", `${el.module}: ${el.mark}`);
            }
        }).catch((err) => {
        console.log(err);
    });
    
}

