var w;

function iniciarWorker() {
  if(typeof(Worker) !== "undefined") {
    if(typeof(w) == "undefined") {
      w = new Worker('ordenacao.js');
    }
    
    w.postMessage(document.getElementById("tamanhoVetor").value);
    
    w.onmessage = function(event) {
      atualizarPorcentagem(event.data);
    };
  } else {
    document.getElementById("porcentagem").innerHTML = "Sem suporte para WebWorker!";
  }
}

function atualizarPorcentagem(perc) {
  document.getElementById("porcentagem").innerHTML = Math.floor(perc) + "%";
}
