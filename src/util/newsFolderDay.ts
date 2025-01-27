import fs from 'fs';
import path from 'path';

// logs

import { logger } from '../util/logging';


//


export const newsFolderNews = (day: any) => {
  try {

    const folderName = day.toString();
    const newsFolderDay = path.join(__dirname, '..', '..', 'public/image/news', folderName);

    if(!fs.existsSync(folderName)) {
      logger.info(`Создание папки ${folderName} в папке ${newsFolderDay}`)
      fs.mkdirSync(newsFolderDay, {recursive: true});
    } else {
      console.log(`Папка ${folderName} уже существует.`);
      return
    }

  } catch (error) {
    logger.error(`Ошибка при создании папки`)
    console.log('Папка уже существует' + ' ', error);
  }


}
