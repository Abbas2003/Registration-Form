// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD70cRHolhOxcf5pDGjYSPLNiAQHzVVrwc",
  authDomain: "carshowroom-463c2.firebaseapp.com",
  databaseURL: "https://carshowroom-463c2-default-rtdb.firebaseio.com",
  projectId: "carshowroom-463c2",
  storageBucket: "carshowroom-463c2.appspot.com",
  messagingSenderId: "160971526837",
  appId: "1:160971526837:web:bfc44fcb5504cb8c74e4fc",
  measurementId: "G-H1C45Q3K0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();


// Input button
var inp = document.getElementById("inp")

window.addData = function () {
  var obj = {
    text: inp.value
  }

  // -- JS Method for key --
  // var JSkey = Math.random().toString().slice(3);
  // var reference = ref(db, `tasks/${key}`)  // ref(db_config, reference_node)
  // set(reference, obj)   // set(reference, data)

  // -- Firebase method for key --
  obj.id = push(ref(db, "taks")).key
  var reference = ref(db, `tasks/${obj.id}`)
  set(reference, obj)

  // console.log(obj)
}

var allTask;

function getData() {
  const reference = ref(db, "task/")
  onValue(reference, function (taskData) {
    allTask = taskData.val()
    console.log("Task Data: ", allTask)

    var arr = Object.values(allTask)
    console.log("All data in Array: ", arr)
  })
}
// getData()


// --------- REGISTRATION FORM --------- //
var name = document.getElementById("name")
var rollNum = document.getElementById("rollNum")
var courseDropDown = document.getElementById("courseDropDown")


window.submitData = function () {

  if (name.value && rollNum.value && courseDropDown.childNodes[3].value) {
    // Student data object
    var userDataObj = {
      name: name.value,
      rollNum: rollNum.value,
      course: courseDropDown.childNodes[3].value,
      // key: 
    }

    // Sending data to DB
    userDataObj.key = push(ref(db, "Student Data")).key
    var reference = ref(db, `Student Data/${userDataObj.key}`)
    set(reference, userDataObj)

    // Fields will be set empty
    name.value = ''
    rollNum.value = ''
    courseDropDown.childNodes[3].value = ''

    alert("Thanks for registration")
    console.log(userDataObj)
  } else {
    alert("Please enter all data")
  }

}

var allData = null;
// Retrieving data from DB
window.getUserData = function () {
  const reference = ref(db, "Student Data/")
  onValue(reference, function (data) {
    allData = data.val()
    var arr = Object.values(allData)
    displayData(arr)
    console.log("Array of all Data", arr)
  })
}

// Displaying all data from DB to browser
function displayData(allData) {
  const tableBody = document.getElementById('data-table-body');
  tableBody.innerHTML = ''; // Clear existing table data

  for (const key in allData) {
    if (allData.hasOwnProperty(key)) {
      const student = allData[key];
      console.log(student['name'])
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = student['name'];
      row.appendChild(nameCell);

      const rollNumberCell = document.createElement('td');
      rollNumberCell.textContent = student['rollNum'];
      row.appendChild(rollNumberCell);

      const courseCell = document.createElement('td');
      courseCell.textContent = student['course'];
      row.appendChild(courseCell);
      
      const actionCell = document.createElement('button');
      actionCell.textContent = "Delete";
      actionCell.setAttribute('onclick', `removeData("${student["key"]}")`)
      actionCell.setAttribute('class', "btn btn-danger w-100")
      row.appendChild(actionCell);
      
      console.log("STUDENT = ",student["key"]) 
      tableBody.appendChild(row);
    }
  }
}

window.removeData = function(id){
  var reference = ref(db, `Student Data/${id}`)
  remove(reference)
}
