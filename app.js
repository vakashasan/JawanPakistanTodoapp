const firebaseConfig = {
    apiKey: "AIzaSyARz1zLRVETDQvRnXdATC159a4g4869jVc",
    authDomain: "todo-app-8c1d8.firebaseapp.com",
    databaseURL: "https://todo-app-8c1d8-default-rtdb.firebaseio.com",
    projectId: "todo-app-8c1d8",
    storageBucket: "todo-app-8c1d8.appspot.com",
    messagingSenderId: "617609128337",
    appId: "1:617609128337:web:2a1a52e2adfd953bad1230"
};


var input_value = document.getElementById('item');
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Generating key for data
var key = app.database().ref('/').child('tasklist').push().key

// Retreiving from Database
app.database().ref('/').child('tasklist/').on('child_added', function (data) {
    console.log(data.val().value, data.key)

    var taskText = document.createTextNode(data.val().value);
    var table = document.getElementById('table');
    var txtTd = document.createElement('td');
    var editBtnTd = document.createElement('td');
    var delBtnTd = document.createElement('td');
    var editBtn = document.createElement("button");
    var delBtn = document.createElement("button");

    txtTd.appendChild(taskText);
    var editBtnTxt = document.createTextNode("Edit");
    var delBtnTxt = document.createTextNode("Delete");
    editBtn.appendChild(editBtnTxt);
    delBtn.appendChild(delBtnTxt);
    editBtn.setAttribute('class', "editBtn");
    delBtn.setAttribute('class', "delBtn");
    editBtn.setAttribute('onclick', "editItem(this)");
    delBtn.setAttribute('onclick', "delItem(this)");

    editBtn.setAttribute('id', data.key);
    delBtn.setAttribute('id', data.key);




    editBtnTd.appendChild(editBtn);
    delBtnTd.appendChild(delBtn);
    txtTd.setAttribute('class', "firstTd");
    editBtnTd.setAttribute('class', "secondTd");
    delBtnTd.setAttribute('class', "thirdTd");
    var tr = document.createElement("tr");
    tr.appendChild(txtTd);
    tr.appendChild(editBtnTd);
    tr.appendChild(delBtnTd);
    table.appendChild(tr);
})



function addItem() {
    
    if (!input_value.value.trim()) {
        alert("Enter your task")
    }
    else {
        var key = firebase.database().ref('/').child('tasklist').push().key
        // adding Data to firebase
        app.database().ref('/').child('tasklist').push({ value: input_value.value, key: key })
        var val = {
            value: input_value.value,
            key: key
        }

        input_value.value = ""
    }
}




function editItem(e) {


    var val = e.parentNode.previousSibling.innerText;

    var uptval = prompt('Enter new Task', val)
    if (!uptval.trim()) {
        alert("Empty Input, Changes not saved")
    }
    else {
        var update = {
            value: uptval,
            key: e.id
        }

        app.database().ref('/tasklist').child(e.id).set(update)
        e.parentNode.previousSibling.innerText = update.value
    }


}

function delItem(e) {
    e.parentNode.parentNode.remove();
    app.database().ref('/tasklist').child(e.id).remove()




}

function deleteAll() {
    var table = document.getElementById('table');
    table.innerHTML = ""
    app.database().ref('/tasklist').remove()
}