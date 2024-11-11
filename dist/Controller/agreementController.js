"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAgreement = exports.getAgreetment = void 0;
const getAgreetment = ((req, res) => {
    try {
        res.status(200).send('agreetment loaded');
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAgreetment = getAgreetment;
const postAgreement = (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        if (!file) {
            res.status(404).send('File not found');
            return;
        }
        res.status(200).send({ message: 'Файл успешно загружен' });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Что то пошло не так. Код ошибки: ${error}`);
    }
};
exports.postAgreement = postAgreement;
