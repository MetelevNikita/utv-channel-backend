

const urlLogin = 'http://localhost:9000/api/v1/login'


const loginButton = document.getElementById('login_button')
const loginForm = document.getElementById('login_form')


console.log(loginForm)

// loginButton.addEventListener('click', async (e) => {



//   try {

//     const loginEmail = document.getElementById('login_email').value
//     const loginPassword  = document.getElementById('login_password').value


//     console.log(loginEmail, loginPassword)

//     if(!loginEmail || !loginPassword) {
//       alert('Заполните все поля')
//       return
//     }


//     const responce = await fetch(urlLogin, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-agent': 'learning app',
//       },

//       body: JSON.stringify({email: loginEmail, password: loginPassword})
//     })


//     const data = await responce.json()
//     console.log(data)
//     return data

//   } catch (error) {
//     console.log(error)
//   }
// })


// loginForm.addEventListener('submit', async  (e)  =>  {
//   e.preventDefault()

//   try {

//     const loginEmail = document.getElementById('login_email').value
//     const loginPassword  = document.getElementById('login_password').value

//     const newForm = new FormData()
//     newForm.append('email', loginEmail)
//     newForm.append('password', loginPassword)


//     const responce = await fetch(urlLogin, {
//       method: 'POST',
//       body: newForm
//     })


//     const data = await responce.json()
//     console.log(data)
//     return data


//   } catch (error) {
//     console.log(error)

//   }
// })