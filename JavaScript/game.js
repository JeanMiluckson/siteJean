const listaDeFrases = [
    "Gênesis 1:1 No princípio, criou Deus os céus e a terra.",
    "João 3:16 Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    "Gálatas 5:22 Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.",
    "Hebreus 11:1 Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.",
    "João 1:1 No princípio, era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",
    "Salmos 23:1 O SENHOR é o meu pastor, nada me faltará.",
    "Salmos 91:1 Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará."
];

let fraseAtual = "";
let letraIndex = 0;

const container = document.getElementById('frase-container');
const teclado = document.getElementById('teclado-visual');

// Função para escolher uma frase aleatória
function carregarFraseAleatoria() {
    container.innerHTML = "";
    letraIndex = 0;
    
    // Sorteia um índice da lista
    const novoIndex = Math.floor(Math.random() * listaDeFrases.length);
    fraseAtual = listaDeFrases[novoIndex];
    
    fraseAtual.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.classList.add('letra');
        if (i === 0) span.classList.add('atual');
        container.appendChild(span);
    });
}

// Criar teclado visual (Apenas as letras base para referência)
const teclasBase = "abcdefghijklmnopqrstuvwxyz ".split('');
teclasBase.forEach(l => {
    const div = document.createElement('div');
    div.innerText = l === " " ? "SPACE" : l.toUpperCase();
    div.className = 'tecla';
    div.id = `key-${l === " " ? "space" : l.toLowerCase()}`;
    teclado.appendChild(div);
});

// Escutar o teclado físico
window.addEventListener('keydown', (e) => {
    const teclaPressionada = e.key; // Captura exatamente o que foi digitado (Maiúsculo ou Minúsculo)
    const spans = document.querySelectorAll('.letra');

    // Impede erro se já terminou a frase mas o delay do próximo ainda não rodou
    if (letraIndex >= spans.length) return;

    // Feedback visual no teclado (usamos toLowerCase para encontrar a tecla física no desenho)
    const idBusca = teclaPressionada === " " ? "space" : teclaPressionada.toLowerCase();
    const teclaDiv = document.getElementById(`key-${idBusca}`);
    if (teclaDiv) {
        teclaDiv.classList.add('tecla-ativa');
        setTimeout(() => teclaDiv.classList.remove('tecla-ativa'), 100);
    }

    // Lógica de acerto (Diferenciando Case)
    if (teclaPressionada === fraseAtual[letraIndex]) {
        spans[letraIndex].className = 'letra correto';
        letraIndex++;
        
        if (letraIndex < spans.length) {
            spans[letraIndex].classList.add('atual');
        } else {
            // Se terminou, sorteia a próxima imediatamente
            setTimeout(carregarFraseAleatoria, 300);
        }
    } else {
        // Se a tecla for funcional (Shift, Alt, etc), não marca como erro
        if (teclaPressionada.length === 1) { 
            spans[letraIndex].className = 'letra errado atual';
        }
    }
});

carregarFraseAleatoria();