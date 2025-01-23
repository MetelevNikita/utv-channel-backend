
//

const getPresentation = (req: any, res: Response | any) => {
  try {
    res.status(200).send('Presentation loaded')
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error'})
  }
}


export { getPresentation }