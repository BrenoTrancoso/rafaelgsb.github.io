var vetor = [];
var tamanhoVetor;

self.onmessage = function(event) {
  tamanhoVetor = event.data;
  gerarVetor();
}

function gerarVetor() {
  for (let i = 0; i < tamanhoVetor; i++) {
    vetor[i] = Math.floor(Math.random() * (10000 - 1) + 1);
  }
 
  ordenacao();
}

function ordenacao() {
  for (var i = 0; i < vetor.length; i++) {
    for (var j = 0; j < vetor.length; j++) {
      if (parseInt(vetor[i]) > parseInt(vetor[j])) {
        var temp = vetor[i];
        vetor[i] = vetor[j];
        vetor[j] = temp;
      }   
    } 
    
    self.postMessage(((i + 1) / vetor.length) * 100);
  }
}
