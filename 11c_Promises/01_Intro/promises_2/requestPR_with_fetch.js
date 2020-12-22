//Promise producer
const SERVER = "http://localhost:3000";
const getStudentPromise = (id) => {
  return fetch(SERVER+'/students/'+id)
      .then(response => response.text());
}

const getModuleMarksPromise = (id) => {
  return fetch(SERVER+'/marks_modules/'+id)
      .then(response => response.text());
}

