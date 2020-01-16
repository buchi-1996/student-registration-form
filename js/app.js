const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const gender = document.getElementById('gender');
const state = document.getElementById('state');
const date = document.getElementById('date');
const course = document.getElementById('course');
// const trash = 'fa-trash';



const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');
const tBody = document.querySelector('tbody');
const card = document.querySelector('.card');
const heading = document.querySelector('h3');
const loader = document.querySelector('.loader');
const input = document.querySelectorAll('input[type="text"], input[type="date"]');
const select = document.querySelectorAll('select');




saveBtn.addEventListener('click', (e)=>{
    loader.style.display = 'block';
    setTimeout(addList, 3000);
    e.preventDefault();
});

function addList() {
    const firstNameInput = firstName.value.toUpperCase();
    const lastNameInput = lastName.value.toUpperCase();
    const genderInput = gender.value;
    const stateInput = state.value.toUpperCase();
    const dateInput = date.value;
    const courseInput = course.value;

    if (firstNameInput && lastNameInput && genderInput && stateInput && dateInput && courseInput) {
        const position = 'beforeend';
         const item = `<tr class="student-data">
                    <td scope="row">${firstNameInput} ${lastNameInput}</td>
                    <td>${genderInput}</td>
                    <td>${stateInput}</td>
                    <td>${dateInput}</td>
                    <td>${courseInput}</td>
                    <td><i class="fa fa-trash" job="delete"></i></td>
                </tr>`;

        tBody.insertAdjacentHTML(position, item);
        loader.style.display = 'none';
    }else{
        showError('have not completed form');
        loader.style.display = 'none';
    }
    Object.entries(input).map((input)=>{
        input[1].value = '';
    })
    Object.entries(select).map((select)=>{
        select[1].value = '';
    })

    
    
}

function showError(text){
    let error = document.createElement('div');
    error.className = 'alert alert-danger text-center text-secondary';
    error.appendChild(document.createTextNode(text));
    console.log(error);
    card.insertBefore(error, heading); 
    setTimeout(clearError, 3000);

    function clearError(){
        error.remove();
    }
}

const delBtn = document.querySelectorAll('.fa-trash');
console.log(delBtn);

delBtn.forEach(function(del){
    del.addEventListener('click', function(){
        let stuff = this.parentNode.parentNode;
        console.log(stuff);
        stuff.remove();
    })
})
