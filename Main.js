/*
 Copyright 2019 Joyce Emanuele, Wellington Cesar

 This file is part of Tradutor de Determinismo (TdD).

 TdD is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 TdD is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with TdD. If not, see <https://www.gnu.org/licenses/>.
 */

let entrada, saida, botao;
let AFN, AFD;

function setup() {
	entrada = document.getElementById('nde');
	saida = document.getElementById('det');

	AFD = {
		"alfabeto": undefined,
		"qtdEstados": undefined,
		"estadoInicial": 0,
		"estadosFinais": undefined,
		"delta": undefined
	}
}

function traduzir() {
	AFN = JSON.parse(entrada.value);
	AFD.alfabeto = AFN.alfabeto;
	AFD.estadosFinais = [];
	AFD.delta = [];

	let estados = [];
	let falta = [];
	let temp = [];

	falta.push(new Set(AFN.estadoInicial));
	while(falta.length !== 0) {
		estados.push(falta[0]);
		temp[temp.length] = [];
		for(let i = 0; i < AFD.alfabeto.length; i++) {
			temp[temp.length - 1][i] = new Set();
			for(let ele of falta[0]) {
				temp[temp.length - 1][i] = new Set([...temp[temp.length - 1][i], ...AFN.delta[ele][i]]);
			}
			if(!estados.contconj(temp[temp.length - 1][i]) && !falta.contconj(temp[temp.length - 1][i]))
				falta.push(temp[temp.length - 1][i]);
		}
		falta.shift();
	}

	for(let i = 0; i < estados.length; i++) {
		if([...(estados[i])].filter(u => AFN.estadosFinais.includes(u)).length > 0) AFD.estadosFinais.push(i);
	}

	for(let i = 0; i < temp.length; i++) {
		AFD.delta[i] = [];
		for(let j = 0; j < temp[i].length; j++) {
			AFD.delta[i][j] = estados.indiceconj(temp[i][j]);
		}
	}

	AFD.qtdEstados = AFD.delta.length;
	saida.value = JSON.stringify(AFD, null, "\t");
}

Set.prototype.igual = function(a) { //Igualdade entre conjuntos
	if(this.size !== a.size) return false;
	for(let ele of this) if(!a.has(ele)) return false;
	return true;
};
Array.prototype.contconj = function(a) { //Array contém conjunto
	for(let ele of this) {
		if(ele instanceof Set && ele.igual(a)) return true;
	}
	return false;
};
Array.prototype.indiceconj = function(a) { //Índice de um conjunto em um array
	for(let i = 0; i < this.length; i++) {
		if(this[i].igual(a)) return i;
	}
};
