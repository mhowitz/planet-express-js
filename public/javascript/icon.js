async function loginButton(event) { 
  event.preventDefault();

  const like = document.getElementById("likeBtn");
  const comment = document.getElementById("commentBtn");

  console.log('like clicked', like);
  console.log('comment clicked',comment)

//   const email = document.querySelector("#emailLog").value.trim();
//   const password = document.querySelector("#passwordLog").value.trim();

//   if(email && password) {
//       const res = await fetch('/api/users/login', {
//           method: 'post',
//           body: JSON.stringify({
//               email,
//               password
//           }),
//           headers: { 'Content-Type': 'application/json'}
//       });
//       if(res.ok) {
//           document.location.replace('/');
//           alert("logged in ! ")
//       } else {
//           alert(res.statusText)
//       }
     
//   } else {
//       console.log("not working")
//   }
// };

// async function signUpForm(event){
//   event.preventDefault();

//   const username = document.querySelector("#userSU").value.trim();
//   const email = document.querySelector("#emailSU").value.trim();
//   const password = document.querySelector("#passSU").value.trim();

//   if(username && email && password){
//       const res = await fetch('/api/users', {
//           method: 'post',
//           body: JSON.stringify({
//               username, 
//               email,
//               password
//           }),
//           headers: { 'Content-Type': 'application/json' }
//       });

//       if(res.ok){
//           document.location.replace('/');
//       }else {
//           alert(res.statusText);
//       }
//   }
}

document.querySelector("#loginBtn").addEventListener("click", loginButton);

document.querySelector(".signUpForm").addEventListener("submit", signUpForm);