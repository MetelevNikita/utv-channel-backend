
// const url  =  'https://utvchannel.tw1.su'
const url = 'http://localhost:9000'


const changeFomtBtn = document.getElementById('select_project_back_btn')
const programUpdateForm = document.getElementById('program_update_form')

const programId = localStorage.getItem('programId')


const programDate = document.getElementById('program_date')
const programTitle = document.getElementById('program_title')
const programSubtitle = document.getElementById('program_subtitle')
const programDescription = document.getElementById('program_description')
const programLink = document.getElementById('program_link')
const programFile = document.getElementById('program_file').files[0]


const getSingleProgramCard = async () => {
  try {

    const responce = await fetch(`${url}/api/v1/program/${programId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await responce.json()

    programDate.value = data.date
    programTitle.value = data.title
    programSubtitle.value = data.subtitle
    programDescription.value = data.description
    programLink.value = data.link



  } catch (error) {
    console.log(`Запрос на обновление карты проекта вернулся с ошибкой. код ошибки ${error}`);
  }
}




programUpdateForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {

    const programDate = document.getElementById('program_date')
    const programTitle = document.getElementById('program_title')
    const programSubtitle = document.getElementById('program_subtitle')
    const programDescription = document.getElementById('program_description')
    const programLink = document.getElementById('program_link')
    const programFile = document.getElementById('program_file').files[0]


    const newFormData = new FormData()
    newFormData.append('id', programId)
    newFormData.append('date', programDate.value)
    newFormData.append('title', programTitle.value)
    newFormData.append('subtitle', programSubtitle.value)
    newFormData.append('description', programDescription.value)
    newFormData.append('link', programLink.value)
    newFormData.append('file', programFile)




    const responce = await fetch(`${url}/api/v1/program`, {
      method: 'PUT',
      body: newFormData
    })

    const data = await responce.json()
    alert('Карточка выпуска успешно обновлена')
    window.location.href = '/main/program'
    return data

  } catch (error) {
    console.log(`Запрос на обновление карты проекта вернулся с ошибкой. код ошибки ${error}`);
  }

})




getSingleProgramCard()










//


changeFomtBtn.addEventListener('click', (e) => {
  e.preventDefault()

  try {

    window.location = '/main/program'

  } catch (error) {
    console.log(`Произошла ошибка перехода ${error}`)
  }
})


