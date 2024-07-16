import fs from 'fs';
import path from 'path';


//


export const newsFolderNews = (day: any) => {
  try {

    const folderName = day.toString();
    const newsFolderDay = path.join(__dirname, '..', '..', 'public/image/news', folderName);

    if(!fs.existsSync(folderName)) {
      fs.mkdirSync(newsFolderDay, {recursive: true});
    } else {
      console.log(`Папка ${folderName} уже существует.`);
      return
    }

  } catch (error) {
    console.log('Папка уже существует' + ' ', error);
  }


}
