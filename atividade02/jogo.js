var palavras = ["RUIDO", "BILHETE", "MENTIRA", "TROMBETA", "CARRO", "CIDADE", "PALAVRA", "CARPA", "TAXIDERMIA", "POPULAR",
                "TURISMO", "RUIM", "PÁGINA", "AMOR", "ACESSO", "ETIQUETA", "SUGESTÃO", "HOSPITAL", "ALMOÇO", "BRINDE",
                "BERMUDA", "MADEIRA", "RAZÃO", "DIVISÓRIA", "TIJOLO", "SALSICHA", "FORMIGUEIRO", "GOTEJAMENTO", "QUADRÚPEDE",
                "CHÃO", "FAMOSO", "ACAMPAMENTO", "LONGE", "RECITAL", "BARCELONA", "SUPERSTIÇÃO", "PREGO", "ENFERMEIRA", "BATERIA", "CARTA",
                "MEDALHA", "CEREAIS", "BEIJO", "MANUTENÇÃO", "MULHER", "HOMICÍDIO", "CARDEAL", "POSTIÇO", "FRÁGIL", "CÉU", "ANTENA",
                "VIRGEM", "CO-PILOTO", "VIOLAÇÃO", "BICICLETA", "TV", "REVENDEDOR", "DURO", "DESLUMBRAMENTO", "SARAIVADA", "CAPTURA",
                "RESGATE", "LUBRIFICANTE", "ENIGMA", "LAGO", "MARROM", "MONUMENTO", "QUEIJO", "GALERIA", "DESCOBRIDOR", "AMENDOIM",
                "ZANGADO", "IGUAL", "ALIANÇA", "INESPERADO", "PLÁGIO", "POMBA", "OCUPAÇÃO", "GRANADA", "UNIVERSIDADE", "AÇOUGUEIRO",
                "BIGORNA", "ESQUILO", "PRESENTE", "DOCE", "COLA", "LIVRARIA", "LAVATÓRIO", "MOLDE", "FÁBRICA", "BOATO", "CICLONE",
                "COMPUTADOR", "ATO", "GRELHA", "MEMBRANA", "VERRUGA", "CAMPONÊS", "PEDAL", "FACADA", "JOGO", "CINTURA", "EIXO"];

var ACENTO_REGEX = {
  'a': /[\xE0-\xE6]/g,
  'e': /[\xE8-\xEB]/g,
  'i': /[\xEC-\xEF]/g,
  'o': /[\xF2-\xF6]/g,
  'u': /[\xF9-\xFC]/g,
  'c': /\xE7/g
}

var palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
var jogo = "_".repeat(palavraEscolhida.length);
var chances = 10;
var letrasTentadas = [];

document.addEventListener("DOMContentLoaded", function(event) {
	resetarComponenteTentativa();
	atualizarJogo();
	atualizarChances();
});

function tentar(letra) {
	resetarComponenteTentativa();

	if (!jogo.includes("_")) {
		return;
	}

	if (chances <= 0) {
		return;
	}

	if (!letra.match(/^[a-zA-Z]+$/) || letra == "") {
		alert("Insira um caractere válido!");
		return;
	}

	var tentativa = letra.toUpperCase();
	
	if (letrasTentadas.includes(tentativa)) {
		feedback("Você já tentou essa letra!");
		return;
	}
	
	letrasTentadas.push(tentativa);
	atualizarLetrasTentadas();
	
	if (padronizaStr(palavraEscolhida).includes(tentativa)) {
		feedback("<font color='green'>Acertou!</font>");
		jogo = jogo.replaceAt(tentativa);
		atualizarJogo();
	} else {
		feedback("<font color='red'>Errou!</font>");
		chances--;
		atualizarChances();
	}
}

function atualizarJogo() {
	document.getElementById("palavra").innerHTML = jogo;

	if (padronizaStr(palavraEscolhida) == jogo) {
		feedback("<h2><font color='green'>Parabéns! Você ganhou!</font></h2>");
		chances = 0;
	}
}

function atualizarChances() {
	document.getElementById("chances").innerHTML = "<b>Chances:</b> " + chances;
	
	if (chances <= 0) {
		feedback("<u>Você perdeu, aperte F5 para jogar novamente!</u>");
	}
}

function atualizarLetrasTentadas() {
	document.getElementById("letrasTentadas").innerHTML = "<b>Letras tentadas:<br /></b> " + letrasTentadas;
}

function feedback(texto) {
	document.getElementById("feedback").innerHTML = texto;
}

function resetarComponenteTentativa() {
	var tentativaComponente = document.getElementById("tentativa");
	tentativaComponente.value = "";
	tentativaComponente.focus();
}

String.prototype.replaceAt = function(replacement) {
	var novoTexto = this;
	var palavraTratada = padronizaStr(palavraEscolhida);
	
	for(var i = 0; i < palavraTratada.length; i++) {
		if (palavraTratada[i] === replacement) {
			novoTexto = novoTexto.substr(0, i) + palavraEscolhida[i] + novoTexto.substr(i + 1);
		}
	}

	return novoTexto;
}

function padronizaStr(str) {
  str = str.toLowerCase();
	
  for(var re in ACENTO_REGEX) {
	str = str.replace(ACENTO_REGEX[re], re)
  }

  return str.toUpperCase();
}
