
const trash = 'fa-trash';



const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');

const card = document.querySelector('.card');
const loader = document.querySelector('.loader');
const input = document.querySelectorAll('input[type="text"], input[type="date"]');
const select = document.querySelectorAll('select');


class studentList {
    constructor(firstName, lastName, gender, state, date, course) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.state = state;
        this.date = date;
        this.course = course;
    }
}

class UI {
    addStudentList(student) {
        const tBody = document.querySelector('tbody');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td scope="row">${student.firstName} ${student.lastName}</td>
        <td>${student.gender}</td>
        <td>${student.state}</td>
        <td>${student.date}</td>
        <td>${student.course}</td>
        <td><i class="fa fa-trash" job="delete"></i></td>
        `;

        tBody.appendChild(row);
    }

    deleteStudentList(icon) {
        if (icon.className === 'fa fa-trash') {
            icon.parentNode.parentNode.remove();
        }
    }

    clearAll() {
        const tBody = document.querySelector('tbody');
        console.log(tBody);
        tBody.innerHTML = '';
    }


    clearInputs() {
        Object.entries(input).map((input) => {
            input[1].value = '';
        })

        Object.entries(select).map((select) => {
            select[1].value = '';
        })
    }

    showAlert(error, className) {
        const heading = document.querySelector('h3');
        const errorMessage = document.createElement('div');
        errorMessage.className = `alert ${className} text-center text-light`;
        errorMessage.appendChild(document.createTextNode(error));
        card.insertBefore(errorMessage, heading);
        setTimeout(clearError, 3000);

        function clearError() {
            errorMessage.remove();
        }
    }


}

// local storage class

class store {
    static addList(list) {
        const LIST = store.getList();
        LIST.push(list);
        localStorage.setItem('list', JSON.stringify(LIST));
    }


    static displayList() {
        const LIST = store.getList();
        LIST.forEach(function (list) {
            const ui = new UI();
            ui.addStudentList(list);
        })
    }


    static getList() {
        let LIST;
        if (localStorage.getItem('list') === null) {
            LIST = [];
        } else {
            LIST = JSON.parse(localStorage.getItem('list'));
        }
        return LIST;
    }
    static clearList() {
        localStorage.clear();

    }
    static removeList(item) {
        console.log(item);
        const LIST = store.getList();
        // console.log(LIST.date);
        for( let i = 0; i < LIST.length; i++){
        if(LIST[i].date === item){
            console.log(LIST[i].date);
            LIST.splice(i, 1);
        }
    }
        
        localStorage.setItem('list', JSON.stringify(LIST));

    }
}


document.addEventListener('DOMContentLoaded', function () {
    store.displayList();
})


// Event listener to add List================================================================= ADD LIST TO UI
saveBtn.addEventListener('click', (e) => {
    loader.style.display = 'block';
    setTimeout(add, 3000);
    e.preventDefault();

    function add() {
        const firstName = document.getElementById('firstName').value.toUpperCase();
        const lastName = document.getElementById('lastName').value.toUpperCase();
        const gender = document.getElementById('gender').value;
        const state = document.getElementById('state').value.toUpperCase();
        const date = document.getElementById('date').value;
        const course = document.getElementById('course').value;


        myData = new studentList(firstName, lastName, gender, state, date, course)
        console.log(myData);
        const ui = new UI();
        if (firstName && lastName && gender && state && date && course) {
            ui.addStudentList(myData);
            store.addList(myData);
            ui.showAlert('Student added Successfully', 'alert-success')
            ui.clearInputs();
            loader.style.display = 'none';
        } else {
            ui.showAlert('please fill form correctly', 'alert-danger');
            loader.style.display = 'none';
        }
    }
});
// ==================================================================================================

// Delete list from UI================================================================================
document.querySelector('tbody').addEventListener('click', function (e) {
    ui = new UI();
    console.log(e.target);
    ui.deleteStudentList(e.target);
    store.removeList(e.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent);

})
// =================================================================================================

// clear All LIST ==============================================================
clearBtn.addEventListener('click', function (e) {
    loader.style.display = 'block';
    setTimeout(clear, 1000);
    e.preventDefault();
});

function clear() {
    ui = new UI();
    ui.clearAll();
    store.clearList();
    loader.style.display = 'none';

}
// ==============================================================================