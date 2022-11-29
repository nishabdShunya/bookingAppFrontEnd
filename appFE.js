const form = document.querySelector('#booking-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phnoInput = document.querySelector('#phno');
const btn = document.querySelector('.btn');
const userList = document.querySelector('#list-of-users');

form.addEventListener('submit', addUser);

function addUser(event) {
    event.preventDefault();
    if (usernameInput.value && emailInput.value && phnoInput.value) {
        const user = {
            username: usernameInput.value,
            email: emailInput.value,
            phno: phnoInput.value
        };
        axios.post('http://localhost:3000/user/add-user', user)
            .then((response) => {
                addToScreen(response.data);
            }).catch((err) => {
                console.log(err);
            });
        // Clearing the fields
        usernameInput.value = '';
        emailInput.value = '';
        phnoInput.value = '';
    }
    else {
        alert('Please enter all the fields.');
    }
};

function addToScreen(userObj) {
    const listItem = `
    <li id="${userObj.id}">
        <h3>${userObj.username} | ${userObj.email} | ${userObj.phno}</h3>
        <div>
            <button class="btn" onClick="editUser('${userObj.id}', '${userObj.username}', '${userObj.email}', '${userObj.phno}')">EDIT</button>
            <button class="btn del-btn" onClick="deleteUser('${userObj.id}')">DELETE</button>
        <div>
    </li>`;
    userList.innerHTML = userList.innerHTML + listItem;
};

// Simple Method
function editUser(id, username, email, phno){
    deleteUser(id);
    usernameInput.value = username;
    emailInput.value = email;
    phnoInput.value = phno;
}

function deleteUser(id) {
    axios.delete('http://localhost:3000/user/' + id)
        .then(response => {
            removeFromScreen(id);
        })
        .catch(err => console.log(err));
};

function removeFromScreen(id) {
    const deletedUser = document.getElementById(id);
    userList.removeChild(deletedUser);
}

window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    axios.get('http://localhost:3000/user')
        .then(response => {
            response.data.forEach(oneUser => {
                addToScreen(oneUser);
            });
        })
        .catch(err => { console.log(err) });
});