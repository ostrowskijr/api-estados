const express = require("express");
const Estado = require("./database/models/Estados");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Minha primeira API Rest em Node Js...");
})

app.get("/estados", (req, res, next) => {
    Estado.findAll({
        raw: true
    }).then((Estados) => {
        res.json(Estados);
    }).catch((error) => {
        res.send("Erro ao acessar base de Dados Estados: " +  error);
    })
})

app.post("/estados", (req, res, next) => {
    var json = req.body;
    Estado.create(json).then(() =>{
        res.redirect("/estados")
    }).catch((error) => {
        res.send("Erro ao inserir estado na Base de dados: " + error)
    })
})

app.listen(3000, (error)=>{
    if (error) {
        console.log("Erro ao subir servidor: " + error);        
    } else {
        console.log("Servidor iniciado com sucesso!");        
    }
});