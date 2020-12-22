const nachnameEl = document.querySelector('#lr_nachname');
const vornameEl = document.querySelector('#lr_vorname');
const lehrbetriebIdEl = document.querySelector('#lb_id');

//Für Modulnoten und Lehrbetrieb verwendet
function addItems(parentElId,text) {
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
    getStudentPromise(id).then((data) => {
        let student = JSON.parse(data);
        nachnameEl.textContent = `Nachname: ${student.Nachname}`;
        vornameEl.textContent = `Vorname: ${student.Vorname}`;
        lehrbetriebIdEl.textContent = `Id: ${student.company_id}`;
        return id;
    }).then(id => getModuleMarksPromise(id))
      .then((data) => {
            console.log(data);
            let marks = JSON.parse(data);
            for (let row in marks.modulelist) {
                let el = marks.modulelist[row];
                //Füge alle Modul-Noten hinzu
                addItems("marks_module",`${el.module}: ${el.mark}`);
            }
      }).catch((err) => {
        console.log(err);
    });
}


