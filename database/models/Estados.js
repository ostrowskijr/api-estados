const Sequelize = require("sequelize");
const connection = require("../database");

// 1° Param - Nome da table no DB, 2° Objeto Js com parâmetros da table.
const Estado = connection.define("tb_estados", {
    uf : {
        type: Sequelize.STRING(2),
        allowNull: false
    },
    estado : {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

Estado.sync({force : false});

module.exports = Estado;