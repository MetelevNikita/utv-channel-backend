"use strict";
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresentation = void 0;
const getPresentation = (req, res) => {
    try {
        res.status(200).send('Presentation loaded');
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getPresentation = getPresentation;
