function mudaFoto (foto)
{
   document.getElementById("central").src= foto;
}

// Verificar a largura da tela e desabilitar onmouseover se for necessário
function verificarResponsividade() {
   if (window.innerWidth < 1000) { // Defina o limite de largura da tela conforme necessário
       document.getElementById("central").removeEventListener('mouseover', mudaFoto); // Remover o evento mouseover
   } else {
       document.getElementById("central").addEventListener('mouseover', function() {
           mudaFoto('nova_imagem.jpg'); // Chame a função mudaFoto quando o mouse passar por cima
       });
   }
}

// Chame a função verificarResponsividade quando a página carregar e redimensionar

function ocultarMenu() {
  var ocultarItens = document.getElementById("menu");
  if(window.innerWidth <= 1000) {
    ocultarItens.style.display = "none"; 
  } else {
    ocultarItens.style.display = "block";
  }

}

function clickMenu() {
var mostrarItens = document.getElementById("menu");
 if(mostrarItens.style.display == "none"){
      mostrarItens.style.display = "block";
    } else {
      mostrarItens.style.display = "none";
 }
}

 function mudouTamanho() {
  var mostrarItens = document.getElementById("menu");
  if(window.innerWidth >= 1000) {
    mostrarItens.style.display = "block"; 
  } else {
    mostrarItens.style.display = "none";
  }

}

//window.addEventListener("load", ocultarMenu);

function ajustarTamanhoImagemPrincipal() {
  var larguraJanela = window.innerWidth;
  var novaLargura;

  if (larguraJanela <= 1000) {
      novaLargura = 55;
  } else {
      novaLargura = 'relative';
  }

  // Substitua 'idDaSuaImagemPrincipal' pelo ID da sua imagem principal
  var imagemPrincipal = document.getElementById('central');

  // Ajusta a largura da imagem principal
  imagemPrincipal.style.width = novaLargura + '%';
}

window.onload = verificarResponsividade;
window.onresize = verificarResponsividade;
// Chama a função quando a página é carregada e redimensionada
window.onload = ajustarTamanhoImagemPrincipal;
window.onresize = ajustarTamanhoImagemPrincipal;

window.addEventListener("load", ocultarMenu);

