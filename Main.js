let entrada, saida, botao;

function setup() {
	entrada = createInput()
		.class("Caixa");
	saida = createInput()
		.class("Caixa");
	botao = createButton("Traduzir");
}

function draw() {
}
function mousePressed() {
	saida.value("Você me clicou!");
}