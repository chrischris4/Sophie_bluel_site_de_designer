document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementsById('email', userId.json);
    const password = document.getElementsById('mdp', token.json);

    if (email.value == "")
    {
        alert("Mettez votre mail"); 
        email.focus(); 
        return false; 
    } 

    if (password.value == "")
    {
        alert("Mettez votre mdp"); 
        password.focus(); 
        return false; 
    }
    return true;
});

localStorage.getItem('user' , "json");

const data = { username: 'userId' };
const pwd = { passeword: 'token'};

fetch('http://localhost:5678/api/users/login', {
    method: 'POST', // or 'PUT'
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then((response) => response.json())
.then((data) => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});;


console.log('yooo');