
const getAgreetment = ((req: any, res: Response | any) => {
  try {
    res.status(200).send('agreetment loaded');
  } catch (error) {
    console.log(error)
  }
})



const postAgreement = (req: any, res: any) => {
  try {

    const file = req.file;

    if(!file) {
      res.status(404).send('File not found');
      return
    }

    res.status(200).send({message: 'Файл успешно загружен'});

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}



export { getAgreetment, postAgreement }