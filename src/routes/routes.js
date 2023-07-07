const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Account = require("../models/account");
const Client = require("../models/client");

const router = express.Router();

router.get("/getContas", (req, res) => {
    Account.find()
    .then((result) => {
        res.status(200).send({ output: "ok", payload: result });
    }).catch((erro) => {
        res.status(500).send({ output: `Erro ao processar dados -> ${erro}` });
    });
});

router.get("/getClientes", (req, res) => {
    Client.find()
    .then((result) => {
        res.status(200).send({ output: "ok", payload: result });
    }).catch((erro) => {
        res.status(500).send({ output: `Erro ao processar dados -> ${erro}` });
    });
});

router.post("/cadastrar/:id", verifyToken, (req, res) => {
    Client.findById(req.params.id).then((result) => {
        if(!result){
            return res.status(404).send({ output: `User not found.` });
        }
        const nomecompleto = result.nomecompleto
        const email = result.email
        Account.findOne({email:email}).then((result) => {
            if(result){
                return res.status(400).send({ output: `Email em uso. Use um diferente.`});
            }
            req.body.nome_titular = nomecompleto;
            req.body.email = email;
            req.body.apikey = req.headers.token;
            const dados = new Account(req.body);
            dados.save().then((result) => {
                res.status(201).send({ output: `Conta cadastrada com sucesso`, payload: result });
            }).catch((erro) => {
                res.status(500).send({ output: `Erro ao cadastrar conta -> ${erro}` });
            });
        });
    });
})

router.put("/atualizar/:id", verifyToken, (req, res) => {
    Account.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((result) => {
        if(!result){
            return res.status(400).send({ output: `Couldn't update.` });
        }
        res.status(202).send({ output: `Updated.`, payload:result });
    }).catch((erro) => {
        res.status(500).send({ output: `Erro ao processar a solicitação -> ${erro}` });
    });
});

router.delete("/delete/:id", verifyToken, (req, res) => {
    Account.findByIdAndDelete(req.params.id).then((result) => {
        res.status(204).send({ output: `Account erased.` });
    }).catch((erro) => console.log(`Erro ao tentar apagar -> ${erro}` ));
});

router.use((req, res) => {
    res.type("application/json");
    res.status(404).send({msg:`404 - Page Not Found`});
});

module.exports = router;