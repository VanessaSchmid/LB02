const nachnameEl = document.querySelector('#lr_nachname');
const vornameEl = document.querySelector('#lr_vorname');
const lbIdEl = document.querySelector('#lb_id');


function addMarks(parentElId,text) {
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
    getStudentCB(id,(err, data) =>{
        if (err) {
            console.log(err);
        } else {
            let student = JSON.parse(data);
            nachnameEl.textContent = `Nachname: ${student.Nachname}`;
            vornameEl.textContent = `Vorname: ${student.Vorname}`;
            lbIdEl.textContent = `Id: ${student.company_id}`;
            /*
            getLehrbetriebCB
            ....
                else { ...
            */
                getModuleMarksCB(id,(err, data) =>{
                    if (err) {
                        console.log(err);
                    } else {
                        let marks = JSON.parse(data);
                        for (let row in marks.modulelist) {
                            //TODO: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_node_appendchild
                            let el = marks.modulelist[row];
                            addMarks("marks_module",`${el.module}: ${el.mark}`);
                        }
                    }
                });

        }
    });
}


