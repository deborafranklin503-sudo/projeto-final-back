// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Nossa lista de usuários na memória
// let usuarios = [
//     { nome: "Ana Costa", cargo: "Desenvolvedora" },
//     { nome: "Carlos Souza", cargo: "Designer" }
// ];

// // [GET] Listar todos
// app.get('/usuarios', function (requisicao, response) {
//     return response.json(usuarios);
// });

// // [POST] Criar um novo
// app.post('/usuarios', function (requisicao, response) {
//     const dadosRecebidos = requisicao.body;

//     const novoUsuario = {
//         nome: dadosRecebidos.nome,
//         cargo: dadosRecebidos.cargo
//     };

//     usuarios.push(novoUsuario);
//     return response.status(201).json(novoUsuario);
// });

// // [PUT] Atualizar pelo Nome
// // Rota para o recebimento do parametro de texto
// app.put('/usuarios/:nomeParametro', function (requisicao, response) {
//     // AQUI VEM ROTA PUT 
// });

// // [DELETE] Remover pelo Nome
// app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
//     // AQUI VEM ROTA DELETE
// });

// const PORTA = 3000;
// app.listen(PORTA, function () {
//     console.log(`🚀 Backend (Ajustado) rodando em http://localhost:${PORTA}`);
// });



const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env') });

const app =express();

app.use(cors());
app.use(express.json());

const LINK_DO_BANCO =process.env.MONGO_URI;

mongoose.connect(LINK_DO_BANCO)
.then(function () {
    console.log("conectado com sucesso ao MongoDB na nuvem!");
})
.catch(function (erro){
    console.error("Erro ao conectar ao MongoDB:", erro);
});

const UsuarioSchema = new mongoose.Schema ({
    nome: {type: String, required: true},
    cargo: { type: String, required: true}
});

const Usuario = mongoose.model('usuario', UsuarioSchema);

app.get('/usuarios', function (requisicao, response) {
    Usuario.find()
        .then(function (listaDeUsuarios) {
            return response.json(listaDeUsuarios);
        })
        .catch(function (erro) {
            return response.status(500).json({ erro: "Erro ao buscar dados do banco" });
        });
});

app.post('/usuarios', function (requisicao, response) {
    const dadosRecebidos = requisicao.body;
    Usuario.create({
        nome: dadosRecebidos.nome,
        cargo: dadosRecebidos.cargo
    })
        .then(function (novoUsuario) {
            return response.status(201).json(novoUsuario);
        })
        .catch(function (erro) {
            return response.status(400).json({ erro: "Erro ao salvar usuário no banco" });
        });
});

app.put('/usuarios/:nomeParametro', function (requisicao, response) {
    
});

app.delete('/usuarios/:nomeParametro', function (requisicao, response) {
   
});


const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend rodando e pronto em http://localhost:${PORTA}`);
});

app.put('/usuarios/:nomeParametro', function (requisicao, response){
    const nomeParametro = decodeURIComponent(requisicao.params.nomeParametro);
    const dadosNovos = requisicao.body;
    Usuario.findOneAndUpdate(
        { nome: {$regex: new RegExp("^" + nomeParametro + "$", "i") }},
        { nome: dadosNovos.nome, cargo: dadosNovos.cargo},
        {new: true}
    )
    .then(function(usuarioAtualizado){
        if (!usuarioAtualizado){
            return response.status(404).json({ erro: "Usuario não encontrado para atualizar"})
        }
        return response.json(usuarioAtualizado); 
    })
    .catch(function (erro) {
        return response.status(500).json({erro: "Erro ao processar a atualização no banco"});
    });
});


























































































































































































































































