// Variables
const course = document.getElementById('course-items');
const submit = document.getElementById('mysubmit');

const url = 'http://localhost/moment-5_1/read.php/course';

// Fetch API
fetch(url)
    // JSON response
    .then((resp) => resp.json())
    .then((data) => {
        // If no objects
        if (data.message) {
            course.innerHTML = '<tr><td colspan="4" class="nothing"><em class="nothing">0 kurser hittades</em></td></tr>';
        }
        // Get arrays
        let arrJson = data;
        // For loop
        for (let i = 0; i < arrJson.length; i++) {
            // Variable for url
            let urlOutput = '';
            // Check if courseplan has a value
            if (arrJson[i].courseplan) {
                // Creates link if true
                urlOutput = `<a href="${arrJson[i].courseplan}" target="_blank" title="${arrJson[i].name}">Webblänk</a>`;
            } else {
                // Output text if false
                urlOutput = `<em>Saknas</em>`;
            }
            // Output inside table
            course.innerHTML += `
            <tr>
                <td>${arrJson[i].code}</td>
                <td>${arrJson[i].name}</td>
                <td>${arrJson[i].progression}</td>
                <td>${urlOutput}</td>
                <td><a onclick="deletePost(${arrJson[i].id})" class="delete" title="Radera ${arrJson[i].name}">X</a> <a onclick="changePost(${arrJson[i].id})" class="delete" title="Ändra ${arrJson[i].name}">Y</a></td>
            </tr>`;
        }
    });

// Send post
submit.addEventListener('click', function () {
    let codeVal = document.getElementById('courseCode').value;
    let nameVal = document.getElementById('courseName').value;
    let progVal = document.getElementById('courseProg').value;
    let urlVal = document.getElementById('coursePlan').value;

    const data = { "name": nameVal, "code": codeVal, "progression": progVal, "courseplan": urlVal };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((resp) => resp.json())
        .then((data) => {
            if (data) {
                location.reload();
            }
        })
});



// Delete post
function deletePost(id) {
    fetch(url+"/"+id, {
        method: 'DELETE',
    }).then((resp) => resp.json())
        .then((data) => {
            if (data) {
                location.reload();
            }
        })
}

// Check form
function doCheck() {
    var allFilled = true;

    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text" && inputs[i].value == '') {
            allFilled = false;
            break;
        }
    }
    document.getElementById("mysubmit").disabled = !allFilled;
    document.getElementById('mysubmit').style.cursor = 'pointer';
}

window.onload = function () {
    var inputs = document.getElementsByTagName('input');
    submit.disabled = true;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text") {
            inputs[i].onkeyup = doCheck;
            inputs[i].onblur = doCheck;
            inputs[i].value = '';
        } else if (inputs[i].type == 'url') {
            inputs[i].value = '';
        }
    }
};