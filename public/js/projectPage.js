// const url = 'https://utvchannel.tw1.su'
const url = 'http://localhost:9000'

//

const cardsContainer = document.getElementById('cards_container')
const btnBack = document.getElementById('select_project_back_btn')




const emptyList = document.createElement('div')
emptyList.setAttribute('id', 'empty_list');
emptyList.setAttribute('class', 'empty_list d-flex')
emptyList.textContent = 'Нет проектов'



const getAllProjectCards = async () => {
  try {
    const responce = await fetch(`${url}/api/v1/project`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })


    const data = await responce.json()

    const projectCards = (data.message === 'Проекты не найдены') ? cardsContainer.appendChild(emptyList) : data.map(project => {
      console.log(project)

      const projectCard = document.createElement('div')
      projectCard.setAttribute('class', 'project-card-container')
      projectCard.setAttribute('id', 'project-card-container')

      const projectPoster = document.createElement('img')
      projectPoster.setAttribute('class', 'project-card-poster')
      projectPoster.setAttribute('src', project.image)
      projectPoster.setAttribute('alt', 'project poster')

      const projectTitle = document.createElement('div')
      projectTitle.setAttribute('class', 'project-card-title')
      projectTitle.setAttribute('id', 'project-card-title')
      projectTitle.textContent = project.title


      const projectBtnContainer = document.createElement('div')
      projectBtnContainer.setAttribute('class', 'project-card-btn-container')
      projectBtnContainer.setAttribute('id', 'project-card-btn-container')


      const projectUpdateBtn = document.createElement('button')
      projectUpdateBtn.setAttribute('class', 'project-btn project-card-update')
      projectUpdateBtn.setAttribute('id', 'project-card-update')
      projectUpdateBtn.textContent = 'Обновить'


      const projectDelBtn = document.createElement('button')
      projectDelBtn.setAttribute('class', 'project-btn project-card-del')
      projectDelBtn.setAttribute('id', 'project-card-del')
      projectDelBtn.textContent = 'Удалить'


      projectBtnContainer.appendChild(projectUpdateBtn)
      projectBtnContainer.appendChild(projectDelBtn)

      //

      projectCard.appendChild(projectPoster)
      projectCard.appendChild(projectTitle)
      projectCard.appendChild(projectBtnContainer)

      //

      cardsContainer.appendChild(projectCard)


      projectDelBtn.addEventListener('click', async () => {
        try {

          const responce = await fetch(`${url}/api/v1/project/${project.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          })

          const data = await responce.json()
          projectCard.remove()
          alert(`Карточка с проектом ${project.title} удалена`)
          window.location.reload()
          return data

        } catch (error) {
          console.log(`Крточка проекта не удалена: код ошибки ${error}`)
        }
      })


      projectUpdateBtn.addEventListener('click', async () => {
        try {

          localStorage.setItem('projectId', project.id)
          window.location.href = `/project/${project.id}`

        } catch (error) {
          console.log(`Переход на страницу с данными проекта не совершен: код ошибки ${error}`)
        }
      })

    })


  } catch (error) {
    console.log(error)
  }
}


getAllProjectCards()


btnBack.addEventListener('click', () => {

  try {

    window.location.href = '/main'

  } catch (error) {
    console.log(`Запрос назад не выполнен`)
  }

})