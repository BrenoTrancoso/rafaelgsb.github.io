const ESQUERDA = 37;
const CIMA = 38;
const DIREITA = 39;
const BAIXO = 40;

const TAMANHO_BLOCO = 25;
const QUANTIDADE_BLOCOS = 20;
const TAMANHO_INICIAL_COBRA = 4;

var cabecaCobraX, cabecaCobraY;
var macaX = 10, macaY = 10;
var pontuacao, direcao, corpoCobra;
var ultimaPontuacao = 0;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", controleSetas);

    reiniciarJogo();
    gerarMaca();
    setInterval(jogo, 100);
}

function jogo() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    desenharCobra();

    cabecaCobraX = corpoCobra[0].x;
    cabecaCobraY = corpoCobra[0].y;

    verificarDirecao();

    // Verifica se a cobra comeu a maçã
    if (cabecaCobraX == macaX && cabecaCobraY == macaY) {
        pontuacao++;
        gerarMaca();
    } else {
        corpoCobra.pop();
    }

    atualizarPontuacao();
    corpoCobra.unshift({
        x: cabecaCobraX,
        y: cabecaCobraY
    });

    //Desenha a maçã
    ctx.fillStyle = "red";
    ctx.fillRect(macaX * TAMANHO_BLOCO, macaY * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);

    verificarSePerdeu();
}

function desenharCobra() {
    for (let i = 0; i < corpoCobra.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(corpoCobra[i].x * TAMANHO_BLOCO, corpoCobra[i].y * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);

        ctx.strokeStyle = "black";
        ctx.strokeRect(corpoCobra[i].x * TAMANHO_BLOCO, corpoCobra[i].y * TAMANHO_BLOCO, TAMANHO_BLOCO, TAMANHO_BLOCO);
    }
}

function gerarMaca() {
    macaX = Math.floor(Math.random() * QUANTIDADE_BLOCOS);
    macaY = Math.floor(Math.random() * QUANTIDADE_BLOCOS);

    for (let i = 0; i < corpoCobra.length; i++) {
        if (macaX == corpoCobra[i].x && macaY == corpoCobra[i].y) {
            gerarMaca();
        }
    }
}

function reiniciarJogo() {
    corpoCobra = [];
    cabecaCobraX = 0;
    cabecaCobraY = 0;
    pontuacao = 0;

    if (direcao != 0) {
        gerarMaca();
    }

    direcao = 0;
    atualizarPontuacao();
    document.getElementById("ultima_pontuacao").innerHTML = "<b>Última pontuação: </b>" + ultimaPontuacao;

    // Inicia o tamanho da cobra
    for (let i = 0; i < TAMANHO_INICIAL_COBRA; i++) {
        corpoCobra.unshift({
            x: i,
            y: 0
        });
    }
}

function controleSetas(event) {
    if (event.keyCode == CIMA && direcao != BAIXO) {
        direcao = CIMA;
    } else if (event.keyCode == BAIXO && direcao != CIMA) {
        direcao = BAIXO;
    } else if (event.keyCode == ESQUERDA && direcao != DIREITA) {
        direcao = ESQUERDA;
    } else if (event.keyCode == DIREITA && direcao != ESQUERDA) {
        direcao = DIREITA;
    }
}

function verificarDirecao() {
    if (direcao == CIMA) {
        cabecaCobraY--;
    } else if (direcao == BAIXO) {
        cabecaCobraY++;
    } else if (direcao == ESQUERDA) {
        cabecaCobraX--;
    } else if (direcao == DIREITA) {
        cabecaCobraX++;
    }
}

function verificarSePerdeu() {
    // Verifica se bateu em alguma parede
    if (cabecaCobraX == -1 || cabecaCobraX > QUANTIDADE_BLOCOS - 1 || 
        cabecaCobraY == -1 || cabecaCobraY > QUANTIDADE_BLOCOS - 1) {
        if (pontuacao > 0) {
            ultimaPontuacao = pontuacao;
        }

        reiniciarJogo();
    }

    // Verifica se a cabeça colidiu com o corpo
    for (let i = 1; i < corpoCobra.length ; i++) {
        if (cabecaCobraX == corpoCobra[i].x && cabecaCobraY == corpoCobra[i].y) {
            if (pontuacao > 0) {
                ultimaPontuacao = pontuacao;
            }

            reiniciarJogo();
        }
    }
}

function atualizarPontuacao() {
    ctx.font = "15px arial";
    ctx.fillStyle = "white";
    ctx.fillText("Pontos: " + pontuacao, 10, 490);
}