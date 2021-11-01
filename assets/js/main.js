function geral() {
    const formQuestoes = document.querySelector('#formquestoes');
    const divBtConclusao = document.querySelector('#conclusaoQuestionario');
    const botaoConclusao = document.querySelector('.conclusaoQuestionario');
    const resultado = document.querySelector('#resultado');
    const radiosEDClass = document.getElementsByClassName('ed');
    const radiosDTClass = document.getElementsByClassName('dt');
    const radiosAGClass = document.getElementsByClassName('ag');
    const radiosAVClass = document.getElementsByClassName('av');
    const inputsChecados = document.querySelectorAll('input[type=radio]');
    const questoes = document.getElementsByClassName("questao");
    const questaoAtual = document.querySelector('#questaoAtual');

    const container = document.querySelector('section.container');
    container.insertAdjacentHTML('afterbegin', `<p class="instrucao">Por favor, preencha o formulário e responda as ${questoes.length} questões:</p>`);
    
    function criaStep() {
        const divSteps = document.querySelector('#steps');
        let i = 0;
        for (i; i < questoes.length; i++) {
            divSteps.appendChild(criaSpan());
        }
    }
    criaStep();

    var currentTab = 0;
    showTab(currentTab);


    function showTab(n) {

        questoes[n].style.display = "block";
        divBtConclusao.style.display = 'none';

        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }

        questoes[currentTab].addEventListener('change', () => {
            nextPrev(1);
        });

        fixStepIndicator(n)
        questaoAtual.innerHTML = `QUESTÃO Nº ${currentTab + 1} `;
        questaoAtual.innerHTML += ` <span style="font-weight:300;color:#6b6b6b;">- Código ${questoes[currentTab].id.toUpperCase()}</span>`;

    }

    function nextPrev(n) {

        if (n == 1 && !validateForm(currentTab)) return false;

        questoes[currentTab].style.display = "none";
        currentTab = currentTab + n;

        if (currentTab >= questoes.length) {
            divBtConclusao.style.display = 'block';
            return false;
        }
        showTab(currentTab);
    }

    function validateForm(currentTab) {
        const inputsQuestao = questoes[currentTab].querySelectorAll('input[type=radio]');
        for (let i in inputsQuestao) {
            if (inputsQuestao[i].checked) {
                document.getElementsByClassName("step")[currentTab].className += " finish";
                return true;
            }
        }
    }


    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        x[n].className += " active";
    }



    function criaSpan() {
        const span = document.createElement('span');
        span.classList.add('step');
        return span;
    }


    formQuestoes.addEventListener('submit', function (e) {
        //e.preventDefault();

        console.log(checarRadioEDClass());
        console.log(somaCatED());
        console.log(arrayED.length);
        console.log('//////////');
        console.log(checarRadioDTClass());
        console.log(somaCatDT());
        console.log(arrayDT.length);
        console.log('//////////');
        console.log(checarRadioAGClass());
        console.log(somaCatAG());
        console.log(arrayAG.length);
        console.log('//////////');
        console.log(checarRadioAVClass());
        console.log(somaCatAV());
        console.log(arrayAV.length);

        const somaTotal = document.getElementById('somaTotal');
        somaTotal.value = somaCatED() + somaCatDT() + somaCatAG() + somaCatAV();

        const somaED = document.getElementById('somaED');
        somaED.value = somaCatED();

        const somaDT = document.getElementById('somaDT');
        somaDT.value = somaCatDT();

        const somaAG = document.getElementById('somaAG');
        somaAG.value = somaCatAG();

        const somaAV = document.getElementById('somaAV');
        somaAV.value = somaCatAV();

        console.log('soma av', somaAV.value);

        if (arrayED.length === 6 && arrayDT.length === 6 && arrayAG.length === 6 && arrayAV.length === 6) {
            botaoConclusao.classList.add('sumir');
            formQuestoes.classList.add('sumir');
            formQuestoes.style.display = 'none';
            setTimeout(() => { botaoConclusao.style.display = 'none'; }, 500)
            const msg = `Sua pontuação total é ${somaCatED() + somaCatDT() + somaCatAG() + somaCatAV()}.<br><br>
        Pontuação por categoria:<br>
        Exposição de dados: ${somaCatED()} pontos;<br>
        Dependência tecnológica: ${somaCatDT()} pontos;<br>
        Agravamento físico/emocional: ${somaCatAG()} pontos;<br>
        Alienação virtual: ${somaCatAV()} pontos.`;
            setResultado(msg, true);
        } else {
            arrayED = [];
            const msg = `Por favor, responda todas as perguntas`;
            setResultado(msg, false);
        }


    });

    let arrayED = [];
    function checarRadioEDClass() {
        for (let i in radiosEDClass) {
            if (radiosEDClass[i].checked) {
                arrayED.push(Number(radiosEDClass[i].value));
            }
        }
        console.log(arrayED);
    }

    function somaCatED() {
        let soma = 0;
        for (let i in arrayED) {
            soma += arrayED[i];
        }
        return soma;
    }

    let arrayDT = [];
    function checarRadioDTClass() {
        for (let i in radiosDTClass) {
            if (radiosDTClass[i].checked) {
                arrayDT.push(Number(radiosDTClass[i].value));
            }
        }
        console.log(arrayDT);
    }

    function somaCatDT() {
        let soma = 0;
        for (let i in arrayDT) {
            soma += arrayDT[i];
        }
        return soma;
    }

    let arrayAG = [];
    function checarRadioAGClass() {
        for (let i in radiosAGClass) {
            if (radiosAGClass[i].checked) {
                arrayAG.push(Number(radiosAGClass[i].value));
            }
        }
        console.log(arrayAG);
    }

    function somaCatAG() {
        let soma = 0;
        for (let i in arrayAG) {
            soma += arrayAG[i];
        }
        return soma;
    }

    let arrayAV = [];
    function checarRadioAVClass() {
        for (let i in radiosAVClass) {
            if (radiosAVClass[i].checked) {
                arrayAV.push(Number(radiosAVClass[i].value));
            }
        }
        console.log(arrayAV);
    }

    function somaCatAV() {
        let soma = 0;
        for (let i in arrayAV) {
            soma += arrayAV[i];
        }
        return soma;
    }

    function criaP() {
        const p = document.createElement('p');
        return p;
    }



    function setResultado(msg, isValid) {
        const resultado = document.querySelector('#resultado');
        resultado.innerHTML = '';
        const p = criaP();
        p.innerHTML = msg;
        resultado.appendChild(p);
        if (isValid) {
            p.classList.add('paragrafo-resultado');
        } else {
            p.classList.add('resultado-invalido');
        }
    }
} geral();
