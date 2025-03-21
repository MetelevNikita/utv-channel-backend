import path from 'path';
import * as XLSX from 'xlsx';



const getEpg = (req: any, res: any) => {
  try {

    const file = XLSX.readFile(path.join(__dirname, '../../public/epg/tv_epg.xls'));

    if(!file) {
      res.status(404).send('File not found');
      return
    }

    const sheetNames = file.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(file.Sheets[sheetNames]);



    const newEpg = data.map((item: any) => {


      const unixTime = Number(Object.values(item)[1]);
      const hours = Math.floor(unixTime * 24);
      const minutes = Math.floor((unixTime * 24 - hours) * 60);
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`



      const newObjEpg = {
        id: 1,
        date: [new Date((Number(Object.values(item)[0]) - 25569) * 86400000).toDateString().split(' ')[0], new Date((Number(Object.values(item)[0]) - 25569) * 86400000).toLocaleDateString()],
        time: formattedTime,
        marker: Object.values(item)[2],
        title: Object.values(item)[3],
        subtitle: Object.values(item)[4]
      }
      return newObjEpg;
    });


    res.status(200).json(newEpg);

  } catch (error) {
    res.status(500).send(error)
  }

}



const postEpg = (req: any, res: any) => {
  const file = req.file;

  console.log(file);

  if(!file) {
    res.status(404).send('File not found');
    return
  }

  res.status(200).send({message: 'Файл успешно загружен'});

}

export { getEpg, postEpg };