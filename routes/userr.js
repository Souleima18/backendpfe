const express=require('express');
const router = express.Router();
const {registre ,login,getUserById, feedback} = require('../controllers/user');


router.post('/registre',registre);
router.post('/login',login);

router.get('/getUserById/:id',getUserById);

router.post('/feedback', feedback);





module.exports=router;