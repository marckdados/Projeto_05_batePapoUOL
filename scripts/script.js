let usuario;
let tamanho;
let conectado;
let nome;

function buscarMensagens(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(exibirMensagem);
}


function usuarioEntrar(){
    nome = prompt('Qual seu nome ?');
    usuario = {name:nome};
    const conectar = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',usuario)
    conectar.then(buscarMensagens);
    conectar.then(() => {
         conectado = setInterval(manterConexao,4000);
    });
    conectar.catch(tratarErro);
}

function tratarErro(){
    alert('Usuário já conectado, logue com outro nome.');
    usuarioEntrar();
}


function exibirMensagem(resposta){
    const lugarMensagens = document.querySelector('.section');
    for( i = 0; i < resposta.data.length; i++){
        lugarMensagens.innerHTML += `
        <div class="caixa-mensagem ${resposta.data[i].type}">
                <div class="timer">${resposta.data[i].time}</div>
                <div class="nome">${resposta.data[i].from}</div>
                <div class="mensagem">${resposta.data[i].text}</div>
        </div>
        `;
    }
    setInterval(atualizarMensagens,3000);
}



function manterConexao(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
    promise.then(console.log('Deu certo'));
}


function atualizarMensagens(){
    const promesa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promesa.then(novasMensagens);
    
}

function novasMensagens(resposta){
    tamanho = resposta.data.length -1;
    if(resposta.data[tamanho].to !== nome && resposta.data[tamanho].to !== "Todos" && resposta.data[tamanho].type === "private_message"){
        return;
    }
    const novaMensagem = document.querySelector('.section');
    if(resposta.data[tamanho].type === "status"){
        novaMensagem.innerHTML += 
            `<div class="caixa-mensagem ${resposta.data[tamanho].type}">
            <div class="timer">(${resposta.data[tamanho].time})</div>
            <div class="nome">${resposta.data[tamanho].from}</div>
            <div class="mensagem">${resposta.data[tamanho].text}</div>
            </div>
            `;
    }else{
        novaMensagem.innerHTML += 
            `<div class="caixa-mensagem ${resposta.data[tamanho].type}">
            <div class="timer">(${resposta.data[tamanho].time})</div>
            <div class="nome">${resposta.data[tamanho].from}</div>
            <div>para</div
            <div class="destino">${resposta.data[tamanho].to}</div>
            <div class="mensagem">${resposta.data[tamanho].text}</div>
            </div>
            `;
    }
            
}



function enviarMensagens(){ 
    let textoInput = document.querySelector("input").value;
    console.log(textoInput)
    const mensagem = {
        from: nome,
        to: nome,
        text: textoInput,
        type: "message"
    }
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',mensagem);
    promise.then(console.log('Mensagem Enviada'));
    promise.catch(()=>{
        window.location.reload();
    });

}

usuarioEntrar();