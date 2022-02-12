//login form
const loginFail = document.querySelector('.invalidLogin');

async function loginButton(event) { 
    loginFail.classList.add('is-invisible')
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
            document.location.replace('/dashboard');
            // alert("logged in ! ")
        } else {
            // alert(res.statusText)

            loginFail.classList.remove('is-invisible')
        }
       
    } else {
        console.log("not working");
        loginFail.classList.remove('is-invisible')
    }
};

const signUpFail = document.querySelector('.signUpFail');
async function signUpForm(event){
    signUpFail.classList.add('is-invisble')
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
            document.location.replace('/dashboard');
        }else {
            signUpFail.classList.remove('is-invisible')
            // alert(res.statusText);
        }
    } else {
        signUpFail.classList.remove('is-invisible')
    }
}

document.querySelector("#loginBtn").addEventListener("click", loginButton);

document.querySelector(".signUpForm").addEventListener("submit", signUpForm);