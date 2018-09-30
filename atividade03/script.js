const PEDRA = 1, PAPEL = 2, TESOURA = 3;
var vitoriasJogador = 0, vitoriasComputador = 0;

var audioVitoria = new Audio("audios/vitoria.mp3");
var audioEmpate = new Audio("audios/empate.mp3");
var audioDerrota = new Audio("audios/derrota.mp3");

var imagemLoading = document.createElement("img");
imagemLoading.width = "240";
imagemLoading.height = "180";
imagemLoading.src = "imgs/loading.gif";

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("pedra").addEventListener("click", function() { jogar(PEDRA) });
    document.getElementById("papel").addEventListener("click", function() { jogar(PAPEL) });
    document.getElementById("tesoura").addEventListener("click", function() { jogar(TESOURA) });
    document.getElementById("reiniciar").addEventListener("click", function() { reiniciarJogo() });

    document.getElementById("jo").addEventListener("click", function() { escolherPersonagem("imgs/jo.png") });
    document.getElementById("ken").addEventListener("click", function() { escolherPersonagem("imgs/ken.png") });
    document.getElementById("po").addEventListener("click", function() { escolherPersonagem("imgs/po.png") });

    reiniciarJogo();
});

function jogar(escolhaJogador) {
    var escolhaComputador = Math.floor(Math.random() * 3 + 1);

    if (escolhaJogador == escolhaComputador) {
        mensagem("Empate!");
        audioEmpate.play();
        return;
    } 

    switch (escolhaJogador) {
        case PEDRA: {
            if (escolhaComputador == TESOURA) {
                vitoria();
            } else {
                derrota();
            }
            break;
        }
        case PAPEL: {
            if (escolhaComputador == PEDRA) {
                vitoria();
            } else {
                derrota();
            }
            break;
        }
        case TESOURA: {
            if (escolhaComputador == PAPEL) {
                vitoria();
            } else {
                derrota();
            }
            break;
        }
    }
}

function mensagem(texto) {
    document.getElementById("mensagem").innerHTML = texto;
}

function vitoria() {
    mensagem("Você ganhou!");
    vitoriasJogador++;
    atualizarVitorias();
    audioVitoria.play();
}

function derrota() {
    mensagem("Você perdeu!");
    vitoriasComputador++;
    atualizarVitorias();
    audioDerrota.play();
}

function atualizarVitorias() {
    document.getElementById("vitoriasJogador").innerHTML = vitoriasJogador;
    document.getElementById("vitoriasComputador").innerHTML = vitoriasComputador;
}

function reiniciarJogo() {
    vitoriasComputador = 0;
    vitoriasJogador = 0;
    mensagem("");
    atualizarVitorias();
    document.getElementById("personagens").style.display = 'block';
    document.getElementById("jogo").style.display = 'none';
}

function escolherPersonagem(linkImg) {
    document.getElementById("personagemJogador").src = linkImg;
    document.getElementById("personagens").style.display = 'none';
    document.body.appendChild(imagemLoading);

    setTimeout(function() {
        document.body.removeChild(imagemLoading);
        document.getElementById("jogo").style.display = 'block';
    }, 2000);
}