import { Router } from 'express';

// module


import { getPresentation } from '../Controller/presentationController';


const presentationRouter = Router();


//

presentationRouter.get('/presentation', getPresentation)


// 

export default presentationRouter;

