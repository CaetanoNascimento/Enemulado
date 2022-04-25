class Enemulado {

    entrar_simulado() {


        let data = new Date
        let data_inicio = data.toISOString()

        let simulado = {}
        simulado.id_tipo_simulado = localStorage.getItem('id_tipo_simulado')
        simulado.id_usuario = localStorage.getItem('Id_user')
        simulado.data_inicio = data_inicio
        simulado.duracao = 0
        simulado.status = 2
        simulado.nota_geral = 0
        fetch('http://localhost:3030/simulado', {
            method: 'POST',
            headers:
                { "content-type": "application/json" },
            body: JSON.stringify(simulado)

        }).then(result => {
            return result.json();
        }).then(data => {
            localStorage.setItem('id_simulado', data.simulado.id_simulado)
            localStorage.removeItem('atual')
            localStorage.removeItem('questao_atual')
            this.gerar_simulado()
        })

    }

    gerar_simulado() {
        let conhecimento = localStorage.getItem('id_tipo_simulado')
        conhecimento = parseInt(conhecimento)
        fetch('http://localhost:3030/questoes/id_conhecimento/' + conhecimento, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {

            return result.json();
        }).then(data => {

            function getRandomNumber(min, max) {
                let step1 = max - min + 1;
                let step2 = Math.random() * step1;
                let result = Math.floor(step2) + min;
                return result;
            }
            function createArrayOfNumbers(start, end) {
                let myArray = [];
                for (let i = start; i <= end; i++) {
                    myArray.push(i);
                }
                return myArray;
            }
            let numbersArray = createArrayOfNumbers(1, data.questao.length);
            var contador = []
            for (let i = 0; i < 60; i++) {

                let randomIndex = getRandomNumber(0, numbersArray.length - 1);
                let randomNumber = numbersArray[randomIndex];
                numbersArray.splice(randomIndex, 1)
                contador.push(randomNumber)

            }

            localStorage.setItem('contador', contador)
            location.assign('/pages/simulado')

        })
    }


    entrar_simulado_aberto(id_simulado, id_tipo_simulado) {
        fetch('http://localhost:3030/questoes/resultado/' + id_simulado, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            let questoes_respondidas = 60 - data.questoes.length

            fetch('http://localhost:3030/questoes/id_conhecimento/' + id_tipo_simulado, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(result => {

                return result.json();
            }).then(data => {

                function getRandomNumber(min, max) {
                    let step1 = max - min + 1;
                    let step2 = Math.random() * step1;
                    let result = Math.floor(step2) + min;
                    return result;
                }
                function createArrayOfNumbers(start, end) {
                    let myArray = [];
                    for (let i = start; i <= end; i++) {
                        myArray.push(i);
                    }
                    return myArray;
                }
                let numbersArray = createArrayOfNumbers(1, data.questao.length);
                var contador = []
                for (let i = 0; i < questoes_respondidas; i++) {

                    let randomIndex = getRandomNumber(0, numbersArray.length - 1);
                    let randomNumber = numbersArray[randomIndex];
                    numbersArray.splice(randomIndex, 1)
                    contador.push(randomNumber)

                }
                location.assign('/pages/simulado')
                localStorage.setItem('contador', contador)
                localStorage.setItem('id_tipo_simulado', id_tipo_simulado)
                localStorage.setItem('id_simulado', id_simulado)
                this.adicionar_tempo(id_simulado)
            })


        })
    }
    load_questao() {

        let id = localStorage.getItem('questao_atual')
        if (id == null) {
            console.log('aqui tbm')
            this.gerar_questao()
        } else {
            fetch('http://localhost:3030/questoes/id/' + id, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(result => {
                return result.json();
            }).then(data => {
                try {
                    document.getElementById('nomeinstituicao').innerHTML = `${data.questao[0].instituicao}`
                    document.getElementById('numeroquestao').innerHTML = `QUESTÃO ${data.questao[0].numero}`

                    document.getElementById('corprova').innerHTML = `PROVA:${data.questao[0].corprova}`
                    document.getElementById('anoprova').innerHTML = `ANO:${data.questao[0].anoprova}`
                    document.getElementById('textoprincipal').innerHTML = `${data.questao[0].textoprincipal}`
                    document.getElementById('textoquestao').innerHTML = `${data.questao[0].textoquestao}`

                    if (data.questao[0].continuacao_texto != 'undefined') {
                        document.getElementById('continuacao_texto').innerHTML = `${data.questao[0].continuacao_texto}`
                    }
                    document.getElementById(`posicao_imagem_${data.questao[0].posicao_imagem}`).innerHTML = `<img id="imagem_simulado" src='${data.questao[0].imagem_questoes}'  >`
                    document.getElementById('alternativa_a').innerHTML = `${data.questao[0].alternativa_A}`
                    document.getElementById('alternativa_b').innerHTML = `${data.questao[0].alternativa_B}`
                    document.getElementById('alternativa_c').innerHTML = `${data.questao[0].alternativa_C}`
                    document.getElementById('alternativa_d').innerHTML = `${data.questao[0].alternativa_D}`
                    document.getElementById('alternativa_e').innerHTML = `${data.questao[0].alternativa_E}`

                    document.getElementById("alternativa_a").style.backgroundColor = "";
                    document.getElementById("alternativa_b").style.backgroundColor = "";
                    document.getElementById("alternativa_c").style.backgroundColor = "";
                    document.getElementById("alternativa_d").style.backgroundColor = "";
                    document.getElementById("alternativa_e").style.backgroundColor = "";




                    window.scrollTo(0, 0);

                } catch (error) {
                    this.finalizar_simulado()
                }

            })
        }

    }
    gerar_questao(id) {
        localStorage.setItem('questao_atual', id)
        if (id == undefined) {
            console.log('depois aqui')
            this.primeira_questao()

        } else {
            window.location.reload(true)
        }

    }
    adicionar_tempo(tempo) {

    }
    tempo() {

        var timerVar = setInterval(countTimer, 1000);
        var totalSeconds = 0;
        function countTimer() {
            ++totalSeconds;

            localStorage.setItem('tempo', totalSeconds)
        }
    }
    calcular_resposta() {
        if (localStorage.getItem('alternativa_selecionada') == undefined) {
            alert('Escolha uma alternativa')
        } else {
            let alternativa = localStorage.getItem('alternativa_selecionada');
            let id = localStorage.getItem('questao_atual')
            id = parseInt(id)
            fetch('http://localhost:3030/questoes/gabarito/' + id, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(result => {
                return result.json();
            }).then(data => {

                let resposta = data.questao[0].gabarito
                let nota = 0
                if (alternativa == resposta) {
                    nota = 1
                }
                localStorage.removeItem('alternativa_selecionada')
                let simulado_questao = {}
                let id_simulado = localStorage.getItem('id_simulado')
                id_simulado = parseInt(id_simulado)
                simulado_questao.id_questoes = id
                simulado_questao.id_simulado = id_simulado
                simulado_questao.resposta_usuario = nota
                simulado_questao.status = 1
                fetch('http://localhost:3030/simulado/questao', {
                    method: 'POST',
                    headers:
                        { "content-type": "application/json" },
                    body: JSON.stringify(simulado_questao)

                }).then(result => {
                    return result.json();
                }).then(data => {
                    this.proxima_questao(2)
                })


            });
        }
    }
    primeira_questao() {
        let primeira_questao = 0
        let contador = localStorage.getItem('contador')
        this.gerar_questao(contador[primeira_questao])
    }
    proxima_questao(x) {
        let proxima_questao = localStorage.getItem('atual')

        if (proxima_questao == null) {


            let questao_atual = proxima_questao = x

            localStorage.setItem('atual', questao_atual)

            let contador = localStorage.getItem('contador')


            this.gerar_questao(contador[questao_atual])
        } else {
            proxima_questao = parseInt(proxima_questao)
            let questao_atual = proxima_questao + x
            localStorage.setItem('atual', questao_atual)

            let contador = localStorage.getItem('contador')


            this.gerar_questao(contador[questao_atual])
        }



    }

    verificar_resposta() {
        let alternativa = localStorage.getItem('alternativa_selecionada');
        let id = localStorage.getItem('questao_atual')
        id = parseInt(id)
        fetch('http://localhost:3030/questoes/gabarito/' + id, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            if (localStorage.getItem('alternativa_selecionada') == undefined) {
                alert('Escolha uma alternativa')
            } else {
                let resposta = data.questao[0].gabarito
                if (alternativa == resposta) {
                    document.getElementById('alternativa_' + resposta).style.backgroundColor = "#98FB98"
                } else {
                    document.getElementById('alternativa_' + resposta).style.backgroundColor = "#98FB98"
                    document.getElementById('alternativa_' + alternativa).style.backgroundColor = "#FA8072"
                }
            }



        })
    }
    resposta_A() {
        localStorage.setItem("alternativa_selecionada", "a")
        document.getElementById("alternativa_a").style.backgroundColor = "#FEE774";
        document.getElementById("alternativa_b").style.backgroundColor = "";
        document.getElementById("alternativa_c").style.backgroundColor = "";
        document.getElementById("alternativa_d").style.backgroundColor = "";
        document.getElementById("alternativa_e").style.backgroundColor = "";


    }
    resposta_B() {
        localStorage.setItem("alternativa_selecionada", "b")
        document.getElementById("alternativa_b").style.backgroundColor = "#FEE774";
        document.getElementById("alternativa_a").style.backgroundColor = "";
        document.getElementById("alternativa_c").style.backgroundColor = "";
        document.getElementById("alternativa_d").style.backgroundColor = "";
        document.getElementById("alternativa_e").style.backgroundColor = "";

    }
    resposta_C() {
        localStorage.setItem("alternativa_selecionada", "c")
        document.getElementById("alternativa_c").style.backgroundColor = "#FEE774";
        document.getElementById("alternativa_a").style.backgroundColor = "";
        document.getElementById("alternativa_b").style.backgroundColor = "";
        document.getElementById("alternativa_d").style.backgroundColor = "";
        document.getElementById("alternativa_e").style.backgroundColor = "";


    }
    resposta_D() {
        localStorage.setItem("alternativa_selecionada", "d")
        document.getElementById("alternativa_d").style.backgroundColor = "#FEE774";
        document.getElementById("alternativa_a").style.backgroundColor = "";
        document.getElementById("alternativa_b").style.backgroundColor = "";
        document.getElementById("alternativa_c").style.backgroundColor = "";
        document.getElementById("alternativa_e").style.backgroundColor = "";


    }
    resposta_E() {
        localStorage.setItem("alternativa_selecionada", "e")
        document.getElementById("alternativa_e").style.backgroundColor = "#FEE774";
        document.getElementById("alternativa_a").style.backgroundColor = "";
        document.getElementById("alternativa_b").style.backgroundColor = "";
        document.getElementById("alternativa_c").style.backgroundColor = "";
        document.getElementById("alternativa_d").style.backgroundColor = "";


    }
    time() {
        enemulado.calcular_resposta()
    }
    finalizar_simulado() {
        let id_simulado = localStorage.getItem('id_simulado')
        id_simulado = parseInt(id_simulado)
        fetch('http://localhost:3030/simulado/buscar/' + id_simulado, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            let inicio = data.simulados_prontos[0].simulado.data_inicio

            inicio = new Date(inicio)

            let fim = new Date()

            let data_final = fim.toLocaleString()
            let data_inicio = inicio.toLocaleString()
            fetch('http://localhost:3030/questoes/resultado/' + id_simulado, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(result => {
                return result.json();
            }).then(data => {
                var resultado = 0
                var result = 0
                var nota_geral = 0
                var nota = 0
                for (let i = 0; i < data.questoes.length; i++) {
                    resultado = data.questoes[i].resultado
                    resultado = parseInt(resultado)
                    if (resultado == 1) {
                        nota = resultado + result
                        nota_geral = nota_geral + nota
                    }
                }

                let simulado = {}
                simulado.data_inicio = data_inicio
                simulado.data_final = data_final
                simulado.nota_geral = nota_geral
                simulado.status = 1
                fetch('http://localhost:3030/simulado/' + id_simulado, {
                    method: 'PATCH',
                    headers:
                        { "content-type": "application/json" },
                    body: JSON.stringify(simulado)

                }).then(result => {
                    return result.json();
                }).then(data => {
                    this.removedorLocal()
                    location.assign('/usuarios/Notas')
                })
            })



        })



    }
    removedorLocal() {
        localStorage.removeItem('id_tipo_simulado')
        localStorage.removeItem('questao_atual')
        localStorage.removeItem('id_simulado')
        localStorage.removeItem('atual')
    }
}

var enemulado = new Enemulado


class Questoes {

    carregar_dados() {

        fetch('http://localhost:3030/questoes/materia', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            for (let i = 0; i < data.materiaa.length; i++) {
                let materia = document.createElement('option')
                materia.setAttribute("value", data.materiaa[i].materia)
                document.getElementsByClassName("materia")[0].appendChild(materia)
            }
            fetch('http://localhost:3030/questoes/instituicao', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(result => {
                return result.json();
            }).then(data => {
                for (let i = 0; i < data.instituicao.length; i++) {
                    let instituicao = document.createElement('option')
                    instituicao.setAttribute("value", data.instituicao[i].instituicaoo)
                    document.getElementsByClassName("instituicao")[0].appendChild(instituicao)
                }
            })

        })
    }
    umcheck(checkbox) {
        var checkboxes = document.getElementsByName('check')
        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false
        })

    }
    cadastrar_questao() {
        let questao = {}

        let continuacao_textual = document.getElementById('continuacao_texto')
        if (continuacao_textual != undefined) {
            questao.continuacao_texto = document.getElementById('continuacao_texto').value
        }

        questao.posicao_imagem = document.getElementById('posicao_imagem').value
        questao.numero_questao = document.getElementById('numero_questao').value
        questao.materia = document.getElementById('materia').value
        questao.cor_prova = document.getElementById('cor_prova').value
        questao.ano_prova = document.getElementById('ano_prova').value
        questao.instituicao = document.getElementById('instituicao').value
        questao.textoprincipal = document.getElementById('textoprincipal').value
        questao.textoquestao = document.getElementById('textoquestao').value
        questao.alternativa_A = document.getElementById('alternativa_A').value
        questao.alternativa_B = document.getElementById('alternativa_B').value
        questao.alternativa_C = document.getElementById('alternativa_C').value
        questao.alternativa_D = document.getElementById('alternativa_D').value
        questao.alternativa_E = document.getElementById('alternativa_E').value
        questao.gabarito = document.getElementsByName('check')

        questao.imagem_questoes = document.getElementById('imagem_top').value



        for (let i = 0; i < questao.gabarito.length; i++) {
            if (questao.gabarito[i].checked) {
                questao.gabarito = questao.gabarito[i].value
            }
        }
        fetch('http://localhost:3030/questoes/materia/' + questao.materia, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {

            questao.materia = data.materia[0].id_materia

            fetch('http://localhost:3030/questoes/instituicao/' + questao.instituicao, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(result => {
                return result.json();
            }).then(data => {

                questao.instituicao = data.instituicao[0].id_instituicao



                const formData = new FormData();
                const fileField = document.querySelector('input[type="file"]');
                formData.append('numero_questao', questao.numero_questao);
                formData.append('materia', questao.materia);
                formData.append('cor_prova', questao.cor_prova);
                formData.append('ano_prova', questao.ano_prova);
                formData.append('instituicao', questao.instituicao);
                formData.append('textoprincipal', questao.textoprincipal);
                formData.append('textoquestao', questao.textoquestao);
                formData.append('alternativa_A', questao.alternativa_A);
                formData.append('alternativa_B', questao.alternativa_B);
                formData.append('alternativa_C', questao.alternativa_C);
                formData.append('alternativa_D', questao.alternativa_D);
                formData.append('alternativa_E', questao.alternativa_E);
                formData.append('gabarito', questao.gabarito);
                formData.append('posicao_imagem', questao.posicao_imagem);
                formData.append('continuacao_texto', questao.continuacao_texto);
                formData.append('imagem_questoes', fileField.files[0]);


                fetch('http://localhost:3030/questoes/cadastrar', {
                    method: 'POST',
                    body: formData,
                }).then(result => {
                    return result.json();
                }).then(data => {

                    window.location.reload(true)
                    window.scrollTo(0, 0);

                })
            })


        })

    }
    posicao_selecionada() {

        let posicao = document.getElementById('posicao_imagem').value
        let voltar = document.getElementById('continuacao_texto')
        if (voltar != undefined) {
            let principal_texto = document.getElementById('principal_texto')
            principal_texto.classList.remove('col-6')
            principal_texto.classList.add('col-12')
            let apagar_texto = document.getElementById('apagar_texto')
            apagar_texto.remove()
            let textoprincipal = document.getElementById('textoprincipal')
            textoprincipal.style.width = '1000px'
        }
        if (posicao == 'CENTRO') {
            let criado = document.getElementById('continuacao_texto')
            if (criado == undefined) {
                let textprin = document.getElementById('textoprin')
                let textoprincipal = document.getElementById('textoprincipal')
                textoprincipal.style.width = '300px'
                let principal_texto = document.getElementById('principal_texto')
                principal_texto.classList.remove('col-12')
                principal_texto.classList.add('col-6')
                let contiucao = document.createElement('div')
                contiucao.classList.add('col-6')
                contiucao.setAttribute('id', 'apagar_texto')
                contiucao.innerHTML = `
                <span class="dados_questao">TEXTO PÓS IMAGEM</span>
                 <input type="text" class="textoP" id="continuacao_texto" style="width: 300px;">
                                         `
                textprin.appendChild(contiucao)
            }

        }
    }
}

var questoes = new Questoes
// -------------------------------------------------------------------------------------------------------------------


function mudaimagem() {
    document.getElementById("imagemcor").src = "./img/professor_color.png"

}

function mousesai() {
    document.getElementById("imagemcor").src = "./img/professor_uncolor.png"
}

function mudaimagem1() {
    document.getElementById("imagemcor1").src = "./img/mundocolor.png"
}

function mousesai1() {
    document.getElementById("imagemcor1").src = "./img/mundo.png"
}

function mudaimagem2() {
    document.getElementById("imagemcor2").src = "./img/molequinhocolor.png"
}

function mousesai2() {
    document.getElementById("imagemcor2").src = "./img/molequinho.png"
}

function mudaimagem3() {
    document.getElementById("imagemcor3").src = "./img/livroscolor.png"
}

function mousesai3() {
    document.getElementById("imagemcor3").src = "./img/livros.png"
}

function mudatexto(elemento) {


    let nome = elemento.children[2].innerText

    if (nome == "Caetano Nascimento") {

        document.getElementById("myP").innerHTML = "Usar o ENEMULADO me salvou porque não tinha outra ferramenta que encaixava tão bem com o meu perfil. Espero que muitas pessoas possam também encontrar esse site"
        document.getElementById("titulo").innerHTML = "ME SALVOU!"
    }

    if (nome == "Pepas El Mago") {

        document.getElementById("myP").innerHTML = "Texto de Pepas"
        document.getElementById("titulo").innerHTML = "AAAAEEE"

    }

    if (nome == "Juan Euzinho") {

        document.getElementById("myP").innerHTML = "Texto de Euzis"
        document.getElementById("titulo").innerHTML = "VALEUUUUUUU"

    }

}



function jwt_login() {

    let user = {
        email: document.getElementById("login").value,
        senha: document.getElementById("senha").value
    };


    let response = fetch('http://localhost:3030/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `${localStorage.getItem("ourToken")}`

        },
        body: JSON.stringify(user)
    }).then(result => {
        if (result.ok) {
            return result.json()
        } else {
            localStorage.setItem("ourToken", null)
            alert("Senha errada")
            document.getElementById('login').value = '';
            document.getElementById('senha').value = '';
        }
    }).then(data => {


        localStorage.setItem("ourToken", data.token)
        setarinfo(document.getElementById('login').value)

    });


}

function jwt_auth_load() {
    fetch('http://localhost:3030/home/entrar', {
        headers: {
            'Authorization': `${localStorage.getItem("ourToken")}`
        }
    }).then(result => {
        if (result.ok) {
            return result.json()
        } else {
            localStorage.setItem("ourToken", null)
            location.assign('/login')
        }
    });

}
function verify_simulado() {
    let mulado = localStorage.getItem('id_tipo_simulado')
    if (mulado == undefined) {
        location.assign('/usuarios/dashboard')
    }
}
function jwt_auth_load_login() {
    fetch('http://localhost:3030/home/entrar', {
        headers: {
            'Authorization': `${localStorage.getItem("ourToken")}`
        }
    }).then(result => {
        if (result.ok) {
            location.assign('/usuarios/dashboard')
            return result.json()

        }
    });
}

function logout() {
    fetch('http://localhost:3030/logout', {

    }).then(result => {

        localStorage.setItem("ourToken", null);
        localStorage.setItem("email_user", null);
        localStorage.clear();

        location.assign('/login');

    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var xhr = new XMLHttpRequest();

    var id_token = googleUser.getAuthResponse().id_token;

    var email2 = profile.getEmail();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {

        if (xhr.responseText == 'success') {

            fetch('http://localhost:3030/usuarios/' + email2, {
            })
                .then(response => response.json())
                .then(data => {

                    if (data.tamanho > 0) {

                        try {

                            fetch('http://localhost:3030/usuarios/login', {
                                method: 'POST',
                                body: JSON.stringify({
                                    email: email2,
                                    google: true
                                }),
                                headers: {
                                    "Content-Type": "application/json; charset=utf-8"
                                }

                            }).then(result => {
                                return result.json();
                            }).then(data => {
                                localStorage.setItem("ourToken", data.token)

                                setarinfo(email2);
                            });

                        } catch (error) {
                        }

                    } else {

                        location.assign('/teste/cadastro')
                    }
                })

            signOut();
        }
    };
    xhr.send(JSON.stringify({ token: id_token }));

}

function setarinfo(email) {

    fetch('http://localhost:3030/usuarios/lista/' + email, {
        method: 'GET'
    })
        .then(response => response.json())

        .then(data => {
            localStorage.setItem("Id_user", data.usuario.id);
            localStorage.setItem("email_user", data.usuario.Email)
            location.assign('/usuarios/dashboard')
        });
}

function simuladoCH() {
    localStorage.setItem("id_tipo_simulado", 1);
    location.assign('/pages/load')
    enemulado.entrar_simulado()
}
function simuladoCN() {
    localStorage.setItem("id_tipo_simulado", 2);
    location.assign('/pages/load')
    enemulado.entrar_simulado()
}
function simuladoLC() {
    localStorage.setItem("id_tipo_simulado", 3);
    location.assign('/pages/load')
    enemulado.entrar_simulado()
}
function simuladoMT() {
    localStorage.setItem("id_tipo_simulado", 4);
    location.assign('/pages/load')
    enemulado.entrar_simulado()

}
function simuladoD1() {
    localStorage.setItem("id_tipo_simulado", 5);
    location.assign('/pages/load')
    enemulado.entrar_simulado()
}
function simuladoD2() {
    localStorage.setItem("id_tipo_simulado", 6);
    location.assign('/pages/load')
    enemulado.entrar_simulado()
}


function criar_conta() {

    let senha = document.getElementById("senha").value
    let confirmar = document.getElementById("confirmar").value

    let cad = {}

    cad.nome = document.getElementById("nome").value;
    cad.email = document.getElementById("email").value;
    cad.cpf = document.getElementById("cpf").value;
    cad.telefone = document.getElementById("telefone").value;
    cad.senha = document.getElementById("senha").value;
    cad.confirmar = document.getElementById("confirmar").value


    if (senha == confirmar) {
        if (validaCampos(cad)) {
            adicionar(cad)
            location.assign('/login')

        }

    } else {
        alert('senha incorreta');
    }

}

async function adicionar(cad) {
    try {

        fetch('http://localhost:3030/usuarios/cadastro', {
            method: 'POST',
            body: JSON.stringify(cad),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }

        }).then(result => {
            return result.json();
        }).then(data => {
        });

    } catch (error) {

    }
}

function validaCampos(cad) {
    let msg = '';

    if (cad.nome == '') {
        msg += '- Informe o Nome.  \n';
    }

    if (cad.email == '') {
        msg += '- Informe o Email.\n';
    }

    if (cad.cpf == '') {
        msg += '- Informe um CPF. \n';
    }

    if (cad.telefone == '') {
        msg += '- Informe um Telefone. \n';
    }

    if (cad.senha == '') {
        msg += '- Informe uma Senha.  \n';
    }

    if (cad.confirmar == '') {
        msg += '- Informe a senha novamente. \n';
    }

    if (msg != '') {
        alert(msg);
        return false
    }

    return true;
}
function carregar_perfil() {
    fetch('http://localhost:3030/usuarios/lista/' + localStorage.getItem('email_user'), {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(result => {
        return result.json();
    }).then(data => {
        console.log(data)
        document.getElementById('nome').value = data.usuario.Nome
        document.getElementById('email').value = data.usuario.Email
        document.getElementById('cpf').value = data.usuario.Cpf
        document.getElementById('telefone').value = data.usuario.Numero
    })
}
function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}
function fMascEx() {
    obj.value = masc(obj.value)
}
function mTel(tel) {
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
        tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
        tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
        tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    } return tel;
}

function atualizar_usuario() {
    let id = localStorage.getItem('Id_user')
    id = parseInt(id)
    let usuario = {}

    usuario.nome = document.getElementById('nome').value
    usuario.email = document.getElementById('email').value
    usuario.cpf = document.getElementById('cpf').value
    usuario.telefone = document.getElementById('telefone').value
    fetch('http://localhost:3030/simulado/usuario/' + id, {
        method: 'PATCH',
        headers:
            { "content-type": "application/json" },
        body: JSON.stringify(usuario)

    }).then(result => {
        return result.json();
    }).then(data => {
    })
}

function closeWin() {
    let id_simulado = localStorage.getItem('id_simulado')
    id_simulado = parseInt(id_simulado)
    fetch('http://localhost:3030/simulado/tempo/' + id_simulado, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(result => {

        return result.json();
    }).then(data => {
        let tempo = localStorage.getItem('tempo')
        tempo = parseInt(tempo)
        let data_simula = data.simulado[0].duracao
        data_simula = parseInt(data_simula)
        let duracao = tempo + data_simula
        let simulado = {}
        simulado.duracao = duracao
        fetch('http://localhost:3030/simulado/tempo/' + id_simulado, {
            method: 'PATCH',
            headers:
                { "content-type": "application/json" },
            body: JSON.stringify(simulado)

        }).then(result => {
            return result.json();
        }).then(data => {
        })

    })

}    