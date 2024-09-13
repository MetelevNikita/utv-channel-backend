
const url  =  'https://utvchannel.tw1.su'


//

const containerNews = document.getElementById('cards_container')



const getAllNewsCard = async () => {

  try {

    const responce = await fetch(`${url}/api/v1/news`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })


    const data = await responce.json()
    console.log(data)


    data.map((news) => {

    const cardNews = document.createElement('div')
    cardNews.setAttribute('class', 'card_news d-flex flex-column mb-3')
    cardNews.setAttribute('id', 'card_news')


    const dateNews = document.createElement('div')
    dateNews.setAttribute('class', 'date_news d-flex mb-3')
    dateNews.setAttribute('id', 'date_news')
    dateNews.textContent = `Дата: ${news.date}`


    const titleNews = document.createElement('div')
    titleNews.setAttribute('class', 'title_news d-flex mb-3')
    titleNews.setAttribute('id', 'title_news')
    titleNews.textContent = news.title


    const btnBoxNews = document.createElement('div')
    btnBoxNews.setAttribute('class', 'btn_box_news d-flex mb-4')
    btnBoxNews.setAttribute('id', 'btn_box_news')


    const btnDelNews = document.createElement('button')
    btnDelNews.setAttribute('class', 'btn_card_news btn_del_news')
    btnDelNews.setAttribute('id', 'btn_del_news')
    btnDelNews.textContent = 'Удалить'



    const btnUpdateNews = document.createElement('button')
    btnUpdateNews.setAttribute('class', 'btn_card_news btn_update_news')
    btnUpdateNews.setAttribute('id', 'btn_update_news')
    btnUpdateNews.textContent = 'Изменить'


    btnDelNews.addEventListener('click', async () => {

      try {

        const responce = await fetch(`${url}/api/v1/news/${news.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await responce.json()
        cardNews.remove()
        return data

      } catch (error) {
        console.error(error)

      }

    })


    btnUpdateNews.addEventListener('click', () => {
      console.log('perehod 3.0')
      localStorage.setItem('newsId', news.id)
      window.location.href = `/news/${news.id}`

    })



    //

    cardNews.appendChild(dateNews)
    cardNews.appendChild(titleNews)
    cardNews.appendChild(btnBoxNews)
    btnBoxNews.appendChild(btnDelNews)
    btnBoxNews.appendChild(btnUpdateNews)


    containerNews.appendChild(cardNews);
    })

  } catch (error) {

    console.log(error)

  }

}


getAllNewsCard()


const backBtn = document.getElementById('select_news_back_btn')

backBtn.addEventListener('click', () => {
  window.location.href = '/main'
})

