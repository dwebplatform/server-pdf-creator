
const express = require("express");
const bodyParser = require("body-parser");
const pretty = require("express-prettify");
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const app = express();
require('dotenv').config();
const base64topdf = require('base64topdf');

const Sequelize = require("sequelize");

//models -------------------------------------
const pagesCreator = require('./models/pages_model.js');  
const pdfCardCreator = require('./models/pdfCard_model.js');
const urlencodedParser = bodyParser.urlencoded({extended: false});


//controllers ----------------
 
const infoPageController = require('./controllers/info_page_controller.js');


//rest------------------------

const sequelize = new Sequelize(process.env.DB_NAME,


process.env.DB_USER_NAME, process.env.DB_USER_PASS, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
});

 
 
//Страницы infopages with corresponding pdf 
const pdfCard  = pdfCardCreator(sequelize);
const infoPage = pagesCreator(sequelize);

infoPage.hasMany(pdfCard);


sequelize.sync()
    .then(result=>{
    console.log(result);
    })
    .catch(err=> console.log(err));
 


app.use(express.json());
app.use(express.static('public'));

app.set("view engine", "ejs");
app.use(cors());
app.use(urlencodedParser);
app.use(pretty({ query: 'pretty' }));






const docsRouter = require('./routes/docs_route.js');
app.get('/all_pages', async (req,res)=>{
const info_pages = await infoPage.findAll({row: true});

		if (info_pages === null) {
				return res.json({
					message:"Такой страницы нет",
				});
		} else {
				return res.json(info_pages);
		}
});
app.get('/api/:info_page_path',infoPageController);

 
app.get('/api/:info_page_path/:pdfId',async (req,res)=>{

	const {info_page_path, pdfId} = req.params;
	let current_page = await infoPage.findOne({where:{
		path_name:info_page_path
	}});
	
	let currentCard = await pdfCard.findOne({where: {
		id: pdfId,
		infoPageId:current_page.id
	}});
	if(	currentCard instanceof pdfCard){
		return res.json(currentCard);
	}
	
	return res.json({message: "Не удалось найти "});
	
});

app.use('/api/',function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(5000,()=>console.log('Listening port'));