
const url  =  'https://utvchannel.tw1.su'
// const url = 'http://localhost:9000'



const loginForm = document.getElementById('login_form');

loginForm.addEventListener('submit', async (e) => {

  e.preventDefault()

  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;

  try {
    const responce = await fetch(`${url}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })

    const data = await responce.json()

    if(data.message === 'Успешно') {
      window.location.href = '/main'
    } else {
      alert(`Ошибка входа в систему: ${data.message}`)
    }

  } catch (error) {
    console.log(error + 'ERROR ОШИБКА')
  }

})