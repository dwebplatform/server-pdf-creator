const Sequelize = require("sequelize");

 

function pagesCreator(sequelize){

const pages = sequelize.define('info_page', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: "",

    },
    path_name:{
        type:Sequelize.TEXT,
   		defaultValue: null,


    }
});
	return pages;
}
 

module.exports = pagesCreator;