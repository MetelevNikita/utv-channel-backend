// URL

const url  =  'https://utvchannel.tw1.su'
// const url = "http://localhost:9000";

// text toolbar

const textStyle = [
  "none",
  "underline",
  "underline dotted",
  "green wavy underline",
];

const fontStyle = ["normal", "italic"];
const fontBold = ["bold", "regular", "thin"];

const textStyleSelect = document.createElement("select");
textStyleSelect.setAttribute("id", "text_style");
textStyleSelect.setAttribute("class", "select_style");
for (let i = 0; i < textStyle.length; i++) {
  const option = document.createElement("option");
  option.value = textStyle[i];
  option.textContent = textStyle[i];
  textStyleSelect.appendChild(option);
}

const fontStyleSelect = document.createElement("select");
fontStyleSelect.setAttribute("id", "font_style");
fontStyleSelect.setAttribute("class", "select_style");
for (let i = 0; i < fontStyle.length; i++) {
  const option = document.createElement("option");
  option.value = fontStyle[i];
  option.textContent = fontStyle[i];
  fontStyleSelect.appendChild(option);
}

const fontBoldSelect = document.createElement("select");
fontBoldSelect.setAttribute("id", "text_style");
fontBoldSelect.setAttribute("class", "select_style");
for (let i = 0; i < fontBold.length; i++) {
  const option = document.createElement("option");
  option.value = fontBold[i];
  option.textContent = fontBold[i];
  fontBoldSelect.appendChild(option);
}

let textNum = 1;
let textArr = [];
let fileNum = 1;
let fileArr = [];
let commentFile = 1;
let commentFileArr = [];
let commentNum = 1;
let commentArr = [];

// get single news

const newsId = localStorage.getItem("newsId");
let currentNewsTags;












const getSingleNews = async () => {
  try {
    const responce = await fetch(`${url}/api/v1/news/${newsId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (responce.ok) {
      const data = await responce.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

getSingleNews().then((data) => {
  console.log(data)
  currentNewsTags = data.tags.split(" ");
  const tagBox = document.getElementById("tag_news_box");

  const categoryArr = [
    "Все",
    "Политика",
    "Экономика",
    "Общество",
    "Мир",
    "Криминал",
    "Cпорт",
    "Технологии",
    "Здоровье",
    "Культура",
    "Искуство",
  ];

  const newsCategory = document.getElementById("news_category");
  const newsCategoryBox = document.getElementById("news_category_box");

  for (let i = 0; i < categoryArr.length; i++) {
    const option = document.createElement("option");
    option.value = categoryArr[i];
    option.textContent = categoryArr[i];
    newsCategory.append(option);
  }

  currentNewsTags.map((item) => {
    const tagContainer = document.createElement("div");
    tagContainer.setAttribute("id", "news_tag_container");
    tagContainer.setAttribute("class", "news_tag_container");
    tagContainer.setAttribute("data-title", item);

    const deleteTag = document.createElement("div");
    deleteTag.setAttribute("id", "news_tag_delete");
    deleteTag.setAttribute("class", "news_tag_delete");
    deleteTag.textContent = "X";

    deleteTag.addEventListener("click", (e) => {
      currentNewsTags = currentNewsTags.filter((tag) => {
        return tag !== e.target.parentNode.dataset.title;
      });

      tagContainer.remove();
    });

    const tag = document.createElement("div");
    tag.setAttribute("id", "news_tag");
    tag.setAttribute("class", "news_tag md-2");
    tag.textContent = item;

    tagContainer.appendChild(deleteTag);
    tagContainer.appendChild(tag);

    tagBox.appendChild(tagContainer);
  });

  newsCategory.addEventListener("change", (e) => {
    currentNewsTags.push(e.target.value);

    const tagContainer = document.createElement("div");
    tagContainer.setAttribute("id", "news_tag_container");
    tagContainer.setAttribute("class", "news_tag_container");
    tagContainer.setAttribute("data-title", e.target.value);

    const deleteTag = document.createElement("div");
    deleteTag.setAttribute("id", "news_tag_delete");
    deleteTag.setAttribute("class", "news_tag_delete");
    deleteTag.textContent = "X";

    deleteTag.addEventListener("click", (e) => {
      currentNewsTags = currentNewsTags.filter((tag) => {
        return tag !== e.target.parentNode.dataset.title;
      });

      tagContainer.remove();
    });

    const tag = document.createElement("div");
    tag.setAttribute("id", "news_tag");
    tag.setAttribute("class", "news_tag md-2");
    tag.textContent = e.target.value;

    tagContainer.appendChild(deleteTag);
    tagContainer.appendChild(tag);

    tagBox.appendChild(tagContainer);
  });

  const newsTitle = document.getElementById("news_title");
  const newsLead = document.getElementById("news_lead");
  const newsAuthor = document.getElementById("news_author");
  const newsDate = document.getElementById("news_date");
  const newsVideo = document.getElementById("news_video");
  let tags = currentNewsTags;
  const views = 0;

  newsTitle.value = data.title;
  newsLead.value = data.lead;
  newsAuthor.value = data.author;
  newsDate.value = data.date;
  newsVideo.value = data.video;

  const currentObj = {};


  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== "") {
      currentObj[key] = data[key];

      const num = 10;

      for (let i = 1; i <= num; i++) {
        if (key == `text_${i}`) {

          newsText(data[key]);
        }

        if (key === `image_${i}`) {
          newsFile(data[key])

        }

        if (key == `comment_${i}`) {
          newsComment(JSON.parse(data[key]).input);
        }
      }
    }
  });
});

// add new element news

const btnNewsText = document.getElementById("btn_news_text");
const btnNewsFile = document.getElementById("btn_news_file");
const btnNewsComment = document.getElementById("btn_news_comment");
const btnNewsBox = document.getElementById("btn_news_box");
const submitNewsBtn = document.getElementById("login_news_button");

//




const newsText = (text) => {
  if (textArr.length >= 10) {
    alert("Максимальное количество новостей 10");
    return;
  }

  const newText = textNum++;

  const textAreaBox = document.createElement("div");
  textAreaBox.setAttribute("id", `text_area_box_${newText}`);
  textAreaBox.setAttribute("class", "text_area_box");

  const closeButton = document.createElement("div");
  closeButton.setAttribute("class", "close-btn");
  closeButton.setAttribute("id", "close-button");
  closeButton.textContent = "x";

  const newsTextArea = document.createElement("textarea");
  newsTextArea.setAttribute("id", `news_text_${newText}`);
  newsTextArea.setAttribute("placeholder", "Введите текст новости");
  newsTextArea.setAttribute("rows", "6");
  newsTextArea.setAttribute("name", "news_text_area");
  newsTextArea.setAttribute("class", "input_area input_news_description");
  newsTextArea.value = text;

  textAreaBox.appendChild(newsTextArea);
  textAreaBox.appendChild(closeButton);

  btnNewsBox.insertAdjacentElement("beforebegin", textAreaBox);

  textArr.push(newsTextArea);

  closeButton.addEventListener("click", (e) => {
    textArr = textArr.filter((item) => {
      textAreaBox.remove();
      return item.id !== `news_text_${e.target.parentNode.id.slice(14)}`;
    });
    return textArr;
  });
};

btnNewsText.addEventListener("click", (e) => {
  e.preventDefault();
  newsText("");
});

const newsFile = (file) => {
  if (fileArr.length >= 10) {
    alert("Максимальное количество новостей 10");
    return;
  }

  const newFileNum = fileNum++;

  const textAreaBox = document.createElement("div");
  textAreaBox.setAttribute("id", `text_area_box_${newFileNum}`);
  textAreaBox.setAttribute("class", "text_area_box_file");

  const closeButton = document.createElement("div");
  closeButton.setAttribute("class", "close-btn-file");
  closeButton.setAttribute("id", "close-button");
  closeButton.textContent = "x";

  const textAreaSubBox = document.createElement("div");
  textAreaSubBox.setAttribute("id", `text_area_sub_box_file_${newFileNum}`);
  textAreaSubBox.setAttribute("class", "text_area_sub_box_file");

  const imgComment = document.createElement("input");
  imgComment.setAttribute("type", "text");
  imgComment.setAttribute("id", `img_comment_${newFileNum}`);
  imgComment.setAttribute("class", "input_form input_news_comment_file");
  imgComment.value = "";

  const newsFile = document.createElement("input");
  newsFile.setAttribute("type", "file");
  newsFile.setAttribute("id", `news_file_${newFileNum}`);
  newsFile.setAttribute("name", `file_${newFileNum}`);
  newsFile.setAttribute("class", "input_file d-flex mt-2 mb-4");
  newsFile.setAttribute("text", `загрузите изображение ${newFileNum}`);

  //

  textAreaSubBox.appendChild(newsFile);
  textAreaSubBox.appendChild(imgComment);

  //

  textAreaBox.appendChild(textAreaSubBox);


  //


  const currantImageContainer = document.createElement('div')
  currantImageContainer.setAttribute('class', 'image_container')
  currantImageContainer.setAttribute('id', 'image_container')
  currantImageContainer.setAttribute('data-image', file)

  const currantImageNews = document.createElement('img')
  currantImageNews.setAttribute('class', 'image_news')
  currantImageNews.setAttribute('id', 'image_news')
  currantImageNews.setAttribute('src', file)


  const currentImageDelete = document.createElement('div')
  currentImageDelete.setAttribute('class', 'image_delete_btn')
  currentImageDelete.setAttribute('id', 'image_delete_btn')
  currentImageDelete.textContent = 'X'

  currantImageContainer.appendChild(currantImageNews)
  currantImageContainer.appendChild(currentImageDelete)


  textAreaBox.appendChild(currantImageContainer)

  textAreaBox.appendChild(closeButton);


  btnNewsBox.insertAdjacentElement("beforebegin", textAreaBox);


  fileArr.push(file)

  currentImageDelete.addEventListener('click', (e) => {

    currantImageContainer.remove()
    commentFileArr.push(imgComment);

    fileArr = fileArr.map((item) => {
      if(item == e.target.parentNode.dataset.image){
        return newsFile
      } else {
        return item
      }
    })






  })





  closeButton.addEventListener("click", (e) => {
    fileArr = fileArr.filter((item) => {
      return item.id !== `news_file_${e.target.parentNode.id.slice(14)}`;
    });

    commentFileArr = commentFileArr.filter((item) => {
      return item.id !== `img_comment_${e.target.parentNode.id.slice(14)}`;
    });

    textAreaBox.remove();

    return newsFile;
  });
};



btnNewsFile.addEventListener("click", (e) => {
  e.preventDefault();
  newsFile();
});

const newsComment = (comment) => {
  if (commentArr.length >= 10) {
    alert("Максимальное количество новостей 10");
    return;
  }

  const newComment = textNum++;
  const textAreaBox = document.createElement("div");
  textAreaBox.setAttribute("id", `text_area_box_${newComment}`);
  textAreaBox.setAttribute("class", "text_area_box");

  const closeButton = document.createElement("div");
  closeButton.setAttribute("class", "close-btn");
  closeButton.setAttribute("id", "close-button");
  closeButton.textContent = "x";

  const newCommentDiv = document.createElement("div");
  newCommentDiv.setAttribute("id", "news_comment_div");
  newCommentDiv.setAttribute("class", "news_comment_div");
  const newsComment = document.createElement("textarea");
  newsComment.setAttribute("type", "text");
  newsComment.setAttribute("id", `news_comment_${newComment}`);
  newsComment.setAttribute("class", "input_area");
  newsComment.setAttribute("placeholder", "Введите комментарий");
  newsComment.setAttribute("name", `comment_${newComment}`);
  newsComment.setAttribute("cols", 4);
  newsComment.setAttribute("rows", 8);
  newsComment.value = comment;

  newCommentDiv.appendChild(fontBoldSelect);
  newCommentDiv.appendChild(fontStyleSelect);
  newCommentDiv.appendChild(textStyleSelect);
  newCommentDiv.appendChild(newsComment);

  textAreaBox.appendChild(newCommentDiv);
  textAreaBox.appendChild(closeButton);

  btnNewsBox.insertAdjacentElement("beforebegin", textAreaBox);

  commentArr.push(newsComment);

  closeButton.addEventListener("click", (e) => {
    commentArr = commentArr.filter((item) => {
      textAreaBox.remove();
      return item.id !== `news_comment_${e.target.parentNode.id.slice(14)}`;
    });
    return commentArr;
  });

  return commentArr;
};

btnNewsComment.addEventListener("click", (e) => {
  e.preventDefault();
  newsComment("");
});
































// update news

const newsUpdateForm = document.getElementById("news_update_form");

newsUpdateForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const newsTitle = document.getElementById("news_title").value;
    const newsLead = document.getElementById("news_lead").value;
    const newsAuthor = document.getElementById("news_author").value;
    const newsDate = document.getElementById("news_date").value;
    const newsVideo = document.getElementById("news_video").value;
    const tags = currentNewsTags.join(" ");
    const views = 0;

    const newNewsForm = new FormData();
    newNewsForm.append("id", newsId);
    newNewsForm.append("title", newsTitle);
    newNewsForm.append("lead", newsLead);
    newNewsForm.append("author", newsAuthor);
    newNewsForm.append("date", newsDate);
    newNewsForm.append("video", newsVideo);
    newNewsForm.append("tags", tags);
    newNewsForm.append("views", views);

    if (textArr.length >= 1) {
      for (let i = 0; i < textArr.length; i++) {
        newNewsForm.append(`text_${i + 1}`, textArr[i].value);
      }
    } else {
      console.log("нет текстов");
    }

    if (fileArr.length >= 1) {
      for (let i = 0; i < fileArr.length; i++) {
        console.log(typeof fileArr[i]);

        newNewsForm.append(
          `file_${i + 1}`,
          typeof fileArr[i] === "string" ? fileArr[i] : fileArr[i].files[0]
        );
      }
    } else {
      console.log("нет файлов");
    }

    if (commentFileArr.length >= 1) {
      for (let i = 0; i < commentFileArr.length; i++) {
        newNewsForm.append(`image_comment_${i + 1}`, commentFileArr[i].value);
      }
    } else {
      console.log("нет комментариев к фото");
    }

    if (commentArr.length >= 1) {
      for (let i = 0; i < commentArr.length; i++) {
        const newObj = JSON.stringify({
          input: commentArr[i].value,
          fontStyle: fontStyleSelect.value,
          textStyle: textStyleSelect.value,
          fontBold: fontBoldSelect.value,
        });

        newNewsForm.append(`comment_${i + 1}`, newObj);
      }
    } else {
      console.log("нет комментариев");
    }

    console.log(...newNewsForm);

    const responce = await fetch(`${url}/api/v1/news`, {
      method: "PUT",
      body: newNewsForm,
    });

    const data = responce;

    if (responce.status === 200) {
      newsUpdateForm.reset();
      alert("карточка проекта успешно изменена");
      return data;
    }
  } catch (error) {
    console.log("произошла ошибка " + error);
  }
});

// back to news

const backNewsBtn = document.getElementById("select_news_back_btn");

backNewsBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    window.location.href = "/main/news";
  } catch (error) {
    console.log(`произошла ошибка ${error}`);
  }
});
