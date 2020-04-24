const Sequelize = require("sequelize");

function pdfCardCreator(sequelize){

 	const pdfCard = sequelize.define('pdf_card',{
			id:{
				        type: Sequelize.INTEGER,
				        primaryKey: true,
				        autoIncrement: true,
				        allowNull: false
				},
				title:{

				type: Sequelize.STRING,
				defaultValue:"Название карточки",	
				},
			pdf_path_name:{
				type: Sequelize.STRING,
				defaultValue:"",

			}
		 });
	return pdfCard;
}

module.exports = pdfCardCreator;