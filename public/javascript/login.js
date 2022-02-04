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
            document.location.replace('/');
            alert("logged in ! ")
        } else {
            alert(res.statusText)
        }
       
    } else {
        console.log("not working")
    }
};

document.querySelector("#loginBtn").addEventListener("click", loginButton)