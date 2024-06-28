

const urlLogin = 'http://localhost:9000/api/v1/login'


const loginButton = document.getElementById('login_button')

loginButton.addEventListener('click', async (e) => {
  e.preventDefault()

  try {

    const loginEmail = document.getElementById('login_email').value
    const loginPassword  = document.getElementById('login_password').value


    console.log(loginEmail, loginPassword)

    if(!loginEmail || !loginPassword) {
      alert('Заполните все поля')
      return
    }


    const responce = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({email: loginEmail, password: loginPassword})
    })

  
    const data = await responce.json()
    console.log(data)
    return data

  } catch (error) {
    console.log(error)
  }
})