
const postAgreement = (req: any, res: Response | any) => {
  try {

    console.log(req.file)
     res.status(200).send('agreetment loaded');

  } catch (error) {
    console.log(error);
    res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
  }
}



export { postAgreement }