const Sequelize = require('sequelize');
const pagesCreator = require('../models/pages_model.js');  
const pdfCardCreator = require('../models/pdfCard_model.js');


const sequelize = new Sequelize(process.env.DB_NAME,


process.env.DB_USER_NAME, process.env.DB_USER_PASS, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
});

const pdfCard  = pdfCardCreator(sequelize);

const infoPage = pagesCreator(sequelize);


const infoPageController = async (req,res)=>{
	 	const {info_page_path} = req.params;
 	const info_page = await infoPage.findOne({ where: { path_name: info_page_path } });
		if (info_page === null) {
				return res.json({
					message:"Такой страницы нет",
				});
		} else {
   	
  let allcards = await pdfCard.findAll({row:true, where:{
  		infoPageId: info_page.id
  }});
 		if( Array.isArray(allcards) && allcards.length){
   	 		return res.json(allcards);
 		}
 		return res.json({
 			message:"Не удалось найти соответсвтующих pdf"
 		});
 }
}
module.exports = infoPageController;