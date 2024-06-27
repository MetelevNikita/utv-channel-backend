
const errorHanlder = (err, req, res, next) => {

    console.error(err);
    res.status(500).json({message: `что то сломалось ${err}`})
    next(err);

}


export { errorHanlder };
