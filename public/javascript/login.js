//login form

async function loginButton(event) {
    
    event.preventDefault();
    console.log("work pls");

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
            document.location.replace('/')
            console.log('logged in!');
            alert("logged in i think!! ")
        } else {
            alert(response.statusText)
        }
       
    } else {
        console.log("not working")
    }
    console.log("hello!!!")
};

document.querySelector("#loginBtn").addEventListener("click", loginButton)