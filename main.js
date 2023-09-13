const form= document.getElementById ('form-atividade'); /*criação constante formulario*/
const imgAprovado = '<img src="./images/aprovado.png alt="emogi celebrando" />'; /*config emogi*/
const imgReprovado = '<img src="./images/reprovado.png" alt="emogi decepcionado" />'; /*config emogi*/
const atividades = []; /* arreio vazio que vai armazenar todas as informações para calculo da média */
const notas = []; /* arreio vazio que vai armazenar todas as informações para calculo da média */
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; /* config para incluir emogi*/
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';  /* config para incluir emogi*/
const notaMinima = parseFloat(prompt("Digite a nota minima:"));  /* config para incluir nota minima a escolha do usuario*/


let linhas= ''; /* config o acrescimo de linhas conforme inclusão de dados*/

form.addEventListener ('submit', function(e){ /*criação evento submit */
    e.preventDefault(); /*criação função para remoção do comportamento de atualização de pagina quando submetido*/
   
    adicionalinha(); /* chama a função add linha */
    atualizaTabela (); /* chama a função atualiza tabela */
    atualizaMediaFinal (); /* chama a função atualiza media */
});

function adicionalinha() {
    const inputNomeAtividade= document.getElementById('nome-atividade');
    const inputNotaAtividade= document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) {  /* função que não permite repetição de atividade*/
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push (inputNomeAtividade.value); /* link da função com arreio*/
        notas.push (parseFloat(inputNotaAtividade.value)); /* link da função com arreio*/

        let linha=`<tr>`; /* config conteudo que será inserido na tabela*/
        linha+= `<td>${inputNomeAtividade.value}</td>`;
        linha+= `<td>${inputNotaAtividade.value}</td>`;
        linha+= `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado }</td>`; /* o ponto de interrogação é If e os dois pontos Else*/
        linha+= `</tr>`;

        linhas+=linha;
    }

    inputNomeAtividade.value = ''; /*limpa campo ao final*/
    inputNotaAtividade.value = '';   /*limpa campo ao final*/
}

function atualizaTabela () {
    
    const corpoTabela = document.querySelector('tbody'); 
    corpoTabela.innerHTML = linhas; /* inclui a config da linha no corpo da tabela*/
}

function atualizaMediaFinal () { /* armazena os dados e compara com a config media*/
    const mediaFinal = calculaMediaFinal ();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >=7 ? spanAprovado : spanReprovado;
}

function calculaMediaFinal (){  /* config calculo média*/
    let somaDasNotas = 0;

    for (let i = 0; i< notas.length; i++) {
        somaDasNotas += notas [i];
    }

    return somaDasNotas / notas.length;
}