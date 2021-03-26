const newUserHandler = async (event) => {
    event.preventDefault();
    
    const username = document.getElementById(`name`).value.trim();
    const email = document.getElementById(`email`).value.trim();
    const password = document.getElementById(`password`).value.trim();


    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            // TODO: change route location once established
            document.location.replace('/');
        } else {
            document.getElementById(`tryAgain`).innerHTML = `Something went wrong. 
            Please check your information.`
        }
    };
};


document
.getElementById(`newUserForm`)
.addEventListener(`submit`, newUserHandler)