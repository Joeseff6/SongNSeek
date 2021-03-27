const newUserHandler = async (event) => {
    event.preventDefault();
    
    const username = document.getElementById(`username`).value.trim();
    const email = document.getElementById(`email`).value.trim();
    const password = document.getElementById(`password`).value.trim();


    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)

        if (response.ok) {
            // TODO: change route location once established
            document.location.replace('/library');
        } else {
            document.getElementById(`wrong`).innerHTML = `Either email is in use,
            or password is less than 8 characters.`
        }
    };
};


document
.getElementById(`signUpForm`)
.addEventListener(`submit`, newUserHandler)