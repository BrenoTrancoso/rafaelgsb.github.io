var palavras = ["Ruido", "Bilhete", "Mentira", "Trombeta", "Carro", "Cidade", "Palavra", "Carpa", "Taxidermia", "Popular",
                "Turismo", "Ruim", "Página", "Amor", "Acesso", "Etiqueta", "Sugestão", "Hospital", "Almoço", "Brinde",
                "Bermuda", "Madeira", "Razão", "Divisória", "Tijolo", "Salsicha", "Formigueiro", "Gotejamento", "Quadrúpede",
                "Chão", "Famoso", "Acampamento", "Longe", "Recital", "Barcelona", "Superstição", "Prego", "Enfermeira", "Bateria", "Carta",
                "Medalha", "Cereais", "Beijo", "Manutenção", "Mulher", "Homicídio", "Cardeal", "Postiço", "Frágil", "Céu", "Antena",
                "Virgem", "Co-piloto", "Violação", "Bicicleta", "TV", "Revendedor", "Duro", "Deslumbramento", "Saraivada", "Captura",
                "Resgate", "Lubrificante", "Enigma", "Lago", "Marrom", "Monumento", "Queijo", "Galeria", "Descobridor", "Amendoim",
                "Zangado", "Igual", "Aliança", "Inesperado", "Plágio", "Pomba", "Ocupação", "Granada", "Universidade", "Açougueiro",
                "Bigorna", "Esquilo", "Presente", "Doce", "Cola", "Livraria", "Lavatório", "Molde", "Fábrica", "Boato", "Ciclone",
                "Computador", "Ato", "Grelha", "Membrana", "Verruga", "Camponês", "Pedal", "Facada", "Jogo", "Cintura", "Eixo"];
var palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
var jogo = "_".repeat(palavraEscolhida.length);
var chances = 5;

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
		atualizarFeedback("<u>Você perdeu, aperte F5 para jogar novamente!</u>");
		return;
	}

	if (!letra.match(/^[a-zA-Z]+$/) || letra == "") {
		alert("Insira um caractere válido!");
		return;
	}

	var tentativa = letra.toUpperCase();
	
	if (palavraEscolhida.includes(tentativa)) {
		atualizarFeedback("<font color='green'>Acertou!</font>");
		jogo = jogo.replaceAt(tentativa);
		atualizarJogo();
	} else {
		atualizarFeedback("<font color='red'>Errou!</font>");
		chances--;
		atualizarChances();
	}
}

function atualizarJogo() {
	document.getElementById("palavra").innerHTML = jogo;

	if (palavraEscolhida == jogo) {
		atualizarFeedback("<h2><font color='green'>Parabéns! Você ganhou!</font></h2>");
		chances = 0;
	}
}

function atualizarChances() {
	document.getElementById("chances").innerHTML = "<b>Chances:</b> " + chances;
}

function atualizarFeedback(texto) {
	document.getElementById("feedback").innerHTML = texto;
}

function resetarComponenteTentativa() {
	var tentativaComponente = document.getElementById("tentativa");
	tentativaComponente.value = "";
	tentativaComponente.focus();
}

String.prototype.replaceAt = function(replacement) {
	var novoTexto = this;
	var indexes = [];
	
    for(var i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === replacement) {
            indexes.push(i);
        }
    }

    indexes.forEach(function(index) {
    	novoTexto = novoTexto.substr(0, index) + replacement+ novoTexto.substr(index + replacement.length);
    });

    return novoTexto;
}