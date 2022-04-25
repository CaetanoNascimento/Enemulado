var arraysimulados = [];

var arraysimulados_tipo1 = [];

var arraysimulados_tipo2 = [];

var arraysimulados_tipo3 = [];

var arraysimulados_tipo4 = [];


function Chamararraysimulados(valor_1_4) {

    fetch('http://localhost:3030/simulado/user/' + parseFloat(localStorage.getItem("Id_user")) + '/' + valor_1_4, {
        method: 'GET'
    })
        .then(response => response.json())

        .then(data => {
            data.simulados_prontos.forEach(simu => {
                arraysimulados.push(simu);
            });
            if (valor_1_4 == 4) {
                separar_tipos_simulado(arraysimulados)
            }
        });

}
function separar_tipos_simulado(arraysimulados) {

    for (var aj = 0; aj < arraysimulados.length; aj++) {

        switch (arraysimulados[aj].simulado.id_tipo_simulado) {
            case 1:
                arraysimulados_tipo1.push(arraysimulados[aj].simulado.nota_geral);
                break;
            case 2:
                arraysimulados_tipo2.push(arraysimulados[aj].simulado.nota_geral);
                break;
            case 3:
                arraysimulados_tipo3.push(arraysimulados[aj].simulado.nota_geral);
                break;
            case 4:
                arraysimulados_tipo4.push(arraysimulados[aj].simulado.nota_geral);
                break;

            default:
        }

    }


    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                // xAxes: [{
                   //ticks: {
                        // suggestedMin: 0,
                         //suggestedMax: 100,
                //   }
                // }]
            }
        }

    });

    func_valores_dash();


}


function mudar_valor_1_4() {
    for (var ah = 1; ah < 5; ah++) {
        Chamararraysimulados(ah)

    }

}



function func_valores_dash() {
    if(arraysimulados_tipo2.length == 0){
        document.getElementById('CN_media').innerHTML = '0'
    }else{
        document.getElementById('CN_media').innerHTML = parseInt(func_calular_media(arraysimulados_tipo2));
    }
    if(arraysimulados_tipo1.length == 0){
        document.getElementById('CH_media').innerHTML = '0'
    }else{
        document.getElementById('CH_media').innerHTML = parseInt(func_calular_media(arraysimulados_tipo1));
    }
    if(arraysimulados_tipo3.length == 0){
        document.getElementById('LC_media').innerHTML = '0'
    }else{
        document.getElementById('LC_media').innerHTML = parseInt(func_calular_media(arraysimulados_tipo3));
    }
    if(arraysimulados_tipo4.length == 0){
        document.getElementById('MT_media').innerHTML = '0'
    }else{
        document.getElementById('MT_media').innerHTML = parseInt(func_calular_media(arraysimulados_tipo4));
    }
    
   
    func_adc_tabela_simus();

}


function func_calular_media(array_valores) {
    let nota_total = 0
    for (var ai = 0; ai < array_valores.length; ai++) {
        nota_total += array_valores[ai]
        console.log(nota_total)

    }
    return nota_total / array_valores.length
}


function func_adc_tabela_simus() {
    fetch('http://localhost:3030/simulado/lista/' + parseFloat(localStorage.getItem("Id_user")), {
        method: 'GET'
    })
        .then(response => response.json())

        .then(data => {
            console.log("data")

            console.log(data)
            var situacao_span = 0

            for (let i = 0; i < data.simulados_prontos.length; i++) {
                let simula = document.getElementById("simula")
                let criado_simula = document.createElement("div")

                criado_simula.innerHTML = `               
                <div class="linha"></div>
                <span class="excluir excluir${data.simulados_prontos[i].simulado.id}">${data.simulados_prontos[i].simulado.Nome_tipo_simulado}</span>
                <span id="excluir_simulado" onclick="excluir_simulado(${data.simulados_prontos[i].simulado.id})">Excluir</span>`

                simula.appendChild(criado_simula)


                let data_simula = document.getElementById("data_simula")
                let criado_simula2 = document.createElement("div")
                let data_inc2 = data.simulados_prontos[i].simulado.data_inicio
                
                data_inc2 = new Date()
                var data_inicio

                if(typeof(data_inc2) == 'object'){
                    console.log('passei')
                     data_inicio = data_inc2.toLocaleString()
                }else{
                    data_inicio = data.simulados_prontos[i].simulado.data_inicio
                }
                data_inicio = data_inicio.slice(0, -9)
                criado_simula2.innerHTML = `               
                <div class="todos"></div>
                <span class="resto">${data_inicio}</span>`

                data_simula.appendChild(criado_simula2)



                let melhor_materia = document.getElementById("melhor_materia")
                let criado_simula3 = document.createElement("div")
                criado_simula3.innerHTML = `               
                <div class="todos"></div>
                <span class="resto">Falta</span>`

                melhor_materia.appendChild(criado_simula3)



                
                let tempo = document.getElementById("tempo")
                let criado_simula4 = document.createElement("div")
                if(data.simulados_prontos[i].simulado.duracao == null){
                    data.simulados_prontos[i].simulado.duracao = ' -'
                }
                let totalSeconds = data.simulados_prontos[i].simulado.duracao
                totalSeconds = parseInt(totalSeconds)
                var hour = Math.floor(totalSeconds / 3600);
                var minute = Math.floor((totalSeconds - hour * 3600) / 60);
                if (hour < 10)
                    hour = "0" + hour;
                if (minute < 10)
                    minute = "0" + minute;
                criado_simula4.innerHTML = `               
                <div class="todos"></div>
                <span class="resto">${hour+ 'h' + minute + 'min'}</span>`
                
                tempo.appendChild(criado_simula4)


                                
                let nota = document.getElementById("nota")
                let criado_simula5 = document.createElement("div")
                criado_simula5.innerHTML = `               
                <div class="todos"></div>
                <span class="resto">${data.simulados_prontos[i].simulado.nota_geral}/60</span>`
                
                nota.appendChild(criado_simula5)


                situacao_span++
                let status = document.getElementById("status")
                let criado_simula6 = document.createElement("div")
                if( nome_status(data.simulados_prontos[i].simulado.status) == 'Aberto'){
                    criado_simula6.innerHTML = `               
                    <div class="todos"></div>
                   <a id="situacao"  onmouseover="continuar_simulado(${situacao_span})" 
                   onmouseout="voltar_simulado(${situacao_span})" 
                   onclick="enemulado.entrar_simulado_aberto(${data.simulados_prontos[i].simulado.id},${data.simulados_prontos[i].simulado.id_tipo_simulado})"> 
                   <span class="resto"  id="situacao_span${situacao_span}">${nome_status(data.simulados_prontos[i].simulado.status)}</span> </a>`
                }else{
                    criado_simula6.innerHTML = `               
                    <div class="todos"></div>
                   <span class="resto"  id="situacao_span${situacao_span}">${nome_status(data.simulados_prontos[i].simulado.status)}</span>`
                }
                

                
                status.appendChild(criado_simula6)

            }


        });
};

function continuar_simulado(x){
    document.getElementById('situacao_span' + x).innerText = `Continuar`
}

function voltar_simulado(x){
    document.getElementById('situacao_span' + x).innerText = `Aberto`
}

function nome_status(x){
    console.log(x)
    if(x == 1){
        let status_nome = 'Finalizado'
       return status_nome 
    }else{
        
         let status_nome = 'Aberto'
        return status_nome
    }
}



var ctx = document.getElementById('myChart')

var data = {
    labels: ['Nota Média', '', '', '', ''],
    datasets: [{
        label: 'CIÊNCIAS DA NATUREZA',
        backgroundColor: '#73DA73',
        borderColor: '#73DA73',
        data: arraysimulados_tipo2,
    }, {
        label: 'CIÊNCIAS HUMANAS',
        backgroundColor: '#E7EC49',
        borderColor: '#E7EC49',
        data: arraysimulados_tipo1,
    }, {
        label: 'MATEMÁTICA',
        backgroundColor: '#3B91E7',
        borderColor: '#3B91E7',
        data: arraysimulados_tipo4,
    }, {
        label: 'LINGUAGENS E CÓDIGOS',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: arraysimulados_tipo3,
    }]
};
function excluir_simulado(id_simulado) {

  
    fetch('http://localhost:3030/simulado/excluir/' + id_simulado, {
        method: 'DELETE',
        headers: { "content-type": "application/json" }
      }).then(result => {
        return result.json();
      }).then(data => {
        window.scrollTo(300, 600);
       // window.location.reload(true)

      })
}