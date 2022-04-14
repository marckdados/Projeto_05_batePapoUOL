const nome = {
    name:"Bisamar"
}  
function getApi(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    console.log(promise.then())
    promise.then(exibirMensagem)
}

function exibirMensagem(resposta){
    let lugarMensagens = document.querySelector('.section');
    console.log(resposta)
    for( i = 0; i < resposta.data.length; i++){
        lugarMensagens.innerHTML += `
        <div class="caixa-mensagem ${resposta.data[i].type}">
                <div class="timer">${resposta.data[i].time}</div>
                <div class="nome">${resposta.data[i].from}</div>
                <div class="mensagem">${resposta.data[i].text}</div>
        </div>
        `;
        
    }

}

function entrarSala(){
    
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome);

}

function manterConexao(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nome);
    console.log('to sendo chamado')
}


function enviarMensagens(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages')
}

setInterval(manterConexao,5000);


entrarSala();
getApi();