const express = require('express');



const router = express.Router();

router.get('/', (req,res)=>{
	return res.json({update: "all docs"});
});

router.get('/:docsId', (req,res)=>{
		const {docsId} = req.params;
	return res.json({current:docsId});
})

module.exports = router;

