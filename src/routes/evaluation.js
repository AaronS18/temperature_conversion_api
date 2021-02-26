const evaluationController = require('../controllers/evaluation');
const express = require('express');
const router = express.Router();

 // get worksheet details by student name
router.get('/:worksheet/:student',  evaluationController.getWorksheet);

// post a new worksheet
router.post('/', evaluationController.postNewWorksheet);

// put a worksheet
//router.put('/',)

// delete a worksheet
//router.delete('/',)
 
module.exports = router;