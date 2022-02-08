const logout = async () => {
    console.log("hello")
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if(res.ok) {
        document.location.replace('/home');
        console.log('Logged out');
        alert('logged out!')
    } else {
        alert(res.statusText)
    }
};

document.querySelector('#logout').addEventListener('click', logout)