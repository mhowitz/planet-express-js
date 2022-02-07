//login form

async function loginButton(event) { 
    event.preventDefault();

    const email = document.querySelector("#emailLog").value.trim();
    const password = document.querySelector("#passwordLog").value.trim();

    if(email && password) {
        const res = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if(res.ok) {
            document.location.replace('/home');
            alert("logged in ! ")
        } else {
            alert(res.statusText)
        }
       
    } else {
        console.log("not working")
    }
};

async function signUpForm(event){
    event.preventDefault();

    const username = document.querySelector("#userSU").value.trim();
    const email = document.querySelector("#emailSU").value.trim();
    const password = document.querySelector("#passSU").value.trim();

    if(username && email && password){
        const res = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username, 
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(res.ok){
            document.location.replace('/home');
        }else {
            alert(res.statusText);
        }
    }
}

document.querySelector("#loginBtn").addEventListener("click", loginButton);

document.querySelector(".signUpForm").addEventListener("submit", signUpForm);