const express = require("express");
const Estado = require("./database/models/Estados");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

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
    Estado.findOne({
        raw: true,
        where : {
            "uf" : json.uf;
        }
    }).then((estado){
        if (estado) {
            res.send("Estado já cadastrado com a UF informada: " + json.uf)
        } else {
            Estado.create(json).then(() =>{
                res.redirect("/estados")
            }).catch((error) => {
                res.status(500).send("Erro ao inserir estado na Base de dados: " + error)
            })
        }
    })
})

app.put("/estados", (req, res, next) => {
    var json = req.body;
    Estado.update(json, {
        where : {
            "uf" : json.uf
        }
    }).then(result => {
        res.send("{ status : Registro alterado com sucesso! }");
    }).then(error => {
        res.status(500).send("Ocorreu um erro ao realizar Update: " + error)
    })
})

app.delete("/estados/:uf", (req, res, next) => {
    var uf = req.params.uf;
    Estado.destroy({
        where : {
            "uf" : json.uf
        }
    }).then(result => {
        res.send("{status : Registro excluído com sucesso! }");
    }).catch(error => {
        res.status(500).send("Erro ao excluir o estado do banco de dados: " + error)
    })
})

app.listen(port, (error)=>{
    if (error) {
        console.log("Erro ao subir servidor: " + error);        
    } else {
        console.log("Servidor iniciado com sucesso!");        
    }
});