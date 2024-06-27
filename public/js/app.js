// login



const loginSubmit = document.getElementById("login_submit");

loginSubmit.addEventListener("click", async (e) => {
  e.preventDefault()
  try {

    const loginEmail = document.getElementById("login_email").value;
    const loginPassword = document.getElementById("login_password").value;



  } catch (error) {
    console.log(error);
  }
})