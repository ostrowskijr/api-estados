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
        res.status(200).json(Estados);
    }).catch((error) => {
        res.status(404).send("Erro ao acessar base de Dados Estados: " +  error);
    })
})

app.post("/estados", (req, res, next) => {
    var json = req.body;
    var uf = json.uf;
    Estado.findOne({
        raw: true,
        where : {
            "uf" : uf
        }
    }).then((estado) => {
        if (estado) {
            res.status(404).send("Estado já cadastrado com a UF informada: " + json.uf)
        } else {
            Estado.create(json).then(() =>{
                res.redirect("/estados")
            }).catch((error) => {
                res.status(500).send("Erro ao inserir estado na Base de dados: " + error);
            })
        }
    }).catch((error) => {
        res.status(500).send("Erro ao consulta Estado: " + error);
    })
})

app.put("/estados", (req, res, next) => {
    var json = req.body;
    var id = json.id;
    if (id === null || id === undefined){
        res.status(404).send({"{error : Id obrigatório para alteração}");
    } else {
        Estado.update(json, {
            where : {
                "id" : id
            }
        }).then((result) => {
            res.status(200).send("{ status : Registro alterado com sucesso! }");
        }).then(error => {
            res.status(500).send("Ocorreu um erro ao realizar Update: " + error);
        })
    }
})

app.delete("/estados", (req, res, next) => {
    var id = req.body.id;
    if (id === null || id === undefined){
        res.status(404).send({"{error : Id obrigatório para alteração}");
    } else {
        Estado.destroy({
            where : {
                "id" : id
            }
        }).then((result) => {
            res.status(200).send("{status : Registro excluído com sucesso! }");
        }).catch(error => {
            res.status(500).send("Erro ao excluir o estado do banco de dados: " + error);
        })
    }
})

app.listen(port, (error)=>{
    if (error) {
        console.log("Erro ao subir servidor: " + error);        
    } else {
        console.log("Servidor iniciado com sucesso!");        
    }
});