console.log('criei o controller de vendas!');

const Venda = require('../../models/venda/vendaModel.js');
const nodemailer = require("nodemailer");
require('dotenv').config();


//metodo do controller para listar todas as vendas
exports.listar_vendas = function(req, res){
    Venda.getAllVendas(req, res, function(err, venda) {
        if (err){
          console.log('resultado: ', err);
          return res.send(err);
        }
        else{  
          console.log('resultado: ', vendas);
          res.send(vendas);
        }
    });    
};

//metodo do controller para buscar venda por email do user
exports.get_venda_by_email = function (req, res) {
    Venda.getVendaByEmail(req, res, function(err, venda){
          if(err){
            console.log('resultado: ', err);
            res.send(err);  
          }else{
            console.log('resultado: ', venda);
              const result = {success: true, vendas: venda }
            res.send(result);
          }
    });
};

//metodo do controller para registrar uma venda
exports.create_venda = function (req, res) {
    Venda.createVenda(req, res, function(err, vendas){
        if(err){
          console.log('resultado: ', err);
          res.send(err);
        }else{
          console.log('resultado: ', vendas);
          res.send(vendas);
        }  
    });    
};

//metodo do controler para enviar um email para confirmar venda
exports.enviar_email_venda = function(req, res){    
    console.log('Preparando envio de email...');    
    const $usuario = process.env.MY_USER;
    const $senha = process.env.PASSWORD;
    const $subject = 'Reserva de produto';
    const $email = JSON.stringify(req.body.email);
    const $nome = JSON.stringify(req.body.nome);
    const $data_venda = JSON.stringify(req.body.data_venda);
    const $qtd_items = JSON.stringify(req.body.qtd_items);
    const $nome_items = JSON.stringify(req.body.nome_items);    

    const $text = 'Olá! Uma reserva foi feita.';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: $usuario,
            pass: $senha
        }
    });
    //fr@bgcbrasil.com.br
    const $destinatario = $email;
    const $destinatario2 = 'fr@bgcbrasil.com.br,'+$email;
    const mailOptions = {
        from: $email,
        to: $destinatario2, 
        subject: 'Assunto: ' + $subject,
        text: 'Enviado por: ' + $nome + ' <' + $email + '>' + '\n' + 'Mensagem: ' + $text + '\n' + 'data_venda: ' + req.body.data_venda + 'qtd: ' + '\n' + req.body.qtd_items + ' Items: ' + req.body.nome_items
    };        
    transporter.sendMail(mailOptions, function(error, info){
        console.log('cheguei no sender!');
        if (error) {
            console.log(error);
            res.json({message: "Ocorreu um erro no envio! Tente mais tarde", success: false, erro: error });
        } else {
            console.log('Email enviado: ' + info.response);
            res.json({message: "E-mail enviado com sucesso!", success: true});
        }
    });               
};