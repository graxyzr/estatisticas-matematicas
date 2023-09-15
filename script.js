function calcularEstatisticas() {

    let input = document.getElementById('numeros');
    let resultadoDiv = document.getElementById('resultado');
    let numeros = input.value.trim().split(',').map(Number);            // trim() remove espaços, split(',') divide a string em um array de substrings com base no separador especificado, o map(Number) converte cada elemento de um array em um número

    if (numeros.length === 0 || (numeros.length === 1 && numeros[0] === 0)) {

        resultadoDiv.textContent = 'Por favor, informe números válidos!';

    }

    else {

        const media = calcularMedia(numeros);
        const moda = calcularModa(numeros);
        const mediana = calcularMediana(numeros);

        resultadoDiv.innerHTML = `
            <p>Média: ${media.toFixed(1)}</p>
            <p>Moda: ${moda.join(', ')}</p>
            <p>Mediana: ${mediana}</p>
        `;

    }

}

function calcularMedia(numeros) {

    let soma = numeros.reduce((acc, num) => acc + num, 0);          // calcula a soma dos números no array 'numeros' e em seguida temos a função callback que recebe dois parâmetros

    // 'acc': começa com o valor inicial de 0
    // 'num': número atual do array durante a iteração
    // a função de callback adicionou o número atual('num') ao acumulador('acc') a cada iteração, acumulando a soma

    return soma / numeros.length;                       // a média é calculada dividindo a soma pelo número de elementos no array('numeros.length')

}

function calcularModa(numeros) {

    let numCount = {};

    numeros.forEach(num => {        // loop que percorre cada elemento do array 'numeros' juntamente da função de callback que é executada para cada elemento do array

        if (numCount[num]) {            // verifica se o número 'num' já existe como uma chave(propriedade) no objeto 'numCount', se existe, significa que o número 'num' já foi encontrado antes no array

            numCount[num]++;        // incrementa a contagem de ocorrências desse número no objeto 'numCount' em 1

        }

        else {              // se não existe, significa que é a primeira vez que o número 'num' está sendo encontrado

            numCount[num] = 1;          // inicializa a contagem de ocorrências desse número no objeto 'numCount' como 1

        }

    });

    let moda = [];
    let maxCount = 0;

    for (let num in numCount) {         // loop através dos números únicos: itera sobre as chaves do objeto 'numCount' e cada chave representa um número único no array 'numeros'

        if (numCount[num] > maxCount) {         // verificação de contagem: para cada número único, verificamos se a contagem desse número (quantas vezes aparece no array) é maior do que o valor atual de 'maxCount'(variável que rastreia a contagem máxima encontrada até o momento)

            moda = [num];                  // atualização da moda: se a contagem do número atual for maior do que a contagem máxima atual, atualizamos a variável 'moda' para conter um array com apenas o número atual e atualizamos 'maxCount' com a nova contagem máxima
            maxCount = numCount[num];

        }

        else if (numCount[num] === maxCount) {

            moda.push(num);                     // adição de números à moda: se a contagem do número atual for igual à contagem máxima atual, teremos um outro número com a mesma frequência que a moda atual e adicionamos o número atual à lista de moda 'moda' usando 'moda.push(num'

        }

    }

    return moda;

}

function calcularMediana(numeros) {

    let sortedNums = numeros.sort((a, b) => a - b);         // cria uma cópia do array 'numeros' e ordena em ordem crescente usando o 'sort()'
    let meio = Math.floor(sortedNums.length / 2);           // calcula o índice do valor do meio, 'sortedNums.length' representa o número de elementos no array ordenado e 'Math.floor()' garante que o índice seja um número inteiro

    if (sortedNums.length % 2 === 0) {              // verifica se o array ordenado tem um número par ou ímpar de elementos.

        let meio1 = sortedNums[meio - 1];   // obtém o valor imediatamente antes do meio
        let meio2 = sortedNums[meio];           // obtém o valor imediatamente após o meio
        return (meio1 + meio2) / 2;         // calcula a média desses dois valores e retorna a mediana

    }

    else {

        return sortedNums[meio];

    }

}

function limparCampo() {

    document.getElementById('numeros').value = '';
    document.getElementById('resultado').textContent = '';

}