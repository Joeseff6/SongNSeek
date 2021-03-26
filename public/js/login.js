const loginHandler = async (event) => {
    event.preventDefault();
    const email = document.getElementById(`email`).value.trim();
    const password = document.getElementById(`password`).value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // TODO: change route location once established
            document.location.replace('/library');
        } else {
            document.getElementById(`wrong`).innerHTML = `Couldn't find that user, 
            please try again.`
        }
    };
};

document
.getElementById(`loginForm`)
.addEventListener(`submit`, loginHandler)