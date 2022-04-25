const mysql = require('../mysql')

exports.getQuestoes = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM questoes;'
        const result = await mysql.execute(query)

        const response = {
            tamanho: result.length,
            questao: result.map(qts => {
                return {
                    numero: qts.numero_questao,
                    id_questao: qts.id_questao,
                    id_materia: qts.id_Materia,
                    corprova: qts.id_CorProva,
                    anoprova: qts.id_AnoProva,
                    id_instituicao: qts.id_instituicao,
                    textoprincipal: qts.textoprincipal,
                    textoquestao: qts.textoquestao,
                    img_top: qts.Img_Top,
                    img_central: qts.Img_Central,
                    img_final: qts.Img_Final,
                    alternativa_A: qts.alternativa_A,
                    alternativa_B: qts.alternativa_B,
                    alternativa_C: qts.alternativa_C,
                    alternativa_D: qts.alternativa_D,
                    alternativa_E: qts.alternativa_E,
                    gabarito: qts.gabarito
                }
            })
        }
        return res.status(202).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getIdQuestoes = async (req, res) => {
    try {
        const query = 'SELECT * FROM questoes WHERE id = ?;'
        const result = await mysql.execute(query,[req.params.id])

        const response = {
            tamanho: result.length,
            questao: result.map(qts => {
                return {
                    id_questao: qts.id_questao,
                    numero: qts.numero_questao,
                    id_materia: qts.id_Materia,
                    corprova: qts.id_CorProva,
                    anoprova: qts.id_AnoProva,
                    instituicao: qts.nome_instituicao,
                    textoprincipal: qts.textoprincipal,
                    textoquestao: qts.textoquestao,
                    alternativa_A: qts.alternativa_A,
                    alternativa_B: qts.alternativa_B,
                    alternativa_C: qts.alternativa_C,
                    alternativa_D: qts.alternativa_D,
                    alternativa_E: qts.alternativa_E,
                    gabarito: qts.gabarito,
                    posicao_imagem: qts.posicao_imagem,
                    imagem_questoes: qts.imagem_questoes,
                    continuacao_texto: qts.continuacao_texto

                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


exports.getApenasIdConhecimentos = async (req, res, next) => {
    try {
        const query = `SELECT questoes.id, questoes.numero_questao FROM questoes
        INNER JOIN materia
        ON questoes.id_Materia  = materia.id
         INNER JOIN instituicao
        ON questoes.id_instituicao = instituicao.id
        WHERE materia.id_AreaConhecimento In (?);`
        const result = await mysql.execute(query, [req.params.id_areaConhecimento])

        const response = {
            questao: result.map(qts => {
                return {
                    id: qts.id,
                    numero_questao: qts.numero_questao
                }

            }),


        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }

}
exports.getResultadoQuestao = async (req, res, next) => {
    try {
        const query = `SELECT simulado_questao.resposta_usuario FROM simulado_questao WHERE id_simulado = ?;`
        const result = await mysql.execute(query, [req.params.id_simulado])
        const response = {
              questoes: result.map(qts => {
                return {
                    resultado: qts.resposta_usuario
                }

            }),


        }

        return res.status(201).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}


exports.getConhecimentosGabarito = async (req, res, next) => {
    try {
        const query = `SELECT gabarito FROM questoes WHERE id = ?;`
        const result = await mysql.execute(query, [req.params.id])

        const response = {
            questao: result.map(qts => {
                return {
                    gabarito: qts.gabarito
                }

            }),


        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}

exports.getConhecimentos = async (req, res, next) => {
    try {
        const query = `SELECT * FROM questoes
        INNER JOIN materia
        ON questoes.id_Materia  = materia.id
         INNER JOIN instituicao
        ON questoes.id_instituicao = instituicao.id
        WHERE materia.id_AreaConhecimento In (?);`
        const result = await mysql.execute(query, [req.params.id_areaConhecimento])

        const response = {
            questao: result.map(qts => {
                return {
                    id_questao: qts.id_questao,
                    numero: qts.numero_questao,
                    id_materia: qts.id_Materia,
                    corprova: qts.id_CorProva,
                    anoprova: qts.id_AnoProva,
                    instituicao: qts.nome_instituicao,
                    textoprincipal: qts.textoprincipal,
                    textoquestao: qts.textoquestao,
                    alternativa_A: qts.alternativa_A,
                    alternativa_B: qts.alternativa_B,
                    alternativa_C: qts.alternativa_C,
                    alternativa_D: qts.alternativa_D,
                    alternativa_E: qts.alternativa_E,
                    gabarito: qts.gabarito,
                    posicao_imagem: qts.posicao_imagem,
                    imagem_questoes: qts.imagem_questoes,
                    continuacao_texto: qts.continuacao_texto

                }

            }),


        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getQuestaoMateria = async (req, res, next) => {
    try {
        const query = `SELECT * FROM questoes
        INNER JOIN materia
        ON questoes.id_Materia  = materia.id
         INNER JOIN instituicao
        ON questoes.id_instituicao = instituicao.id
        WHERE materia.id_AreaConhecimento In (?, ?);`
        const result = await mysql.execute(query, [req.params.v1, req.params.v2])
        const response = {
            questao1: result.map(qts => {
                return {
                    id_questao: qts.id_questao,
                    numero: qts.numero_questao,
                    id_materia: qts.id_Materia,
                    id_corprova: qts.id_CorProva,
                    id_anoprova: qts.id_AnoProva,
                    instituicao: qts.nome_instituicao,
                    textoprincipal: qts.textoprincipal,
                    textoquestao: qts.textoquestao,
                    img_top: qts.Img_Top,
                    img_central: qts.Img_Central,
                    img_final: qts.Img_Final,
                    alternativa_A: qts.alternativa_A,
                    alternativa_B: qts.alternativa_B,
                    alternativa_C: qts.alternativa_C,
                    alternativa_D: qts.alternativa_D,
                    alternativa_E: qts.alternativa_E,
                    gabarito: qts.gabarito,

                }

            }),


        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
exports.postQuestao = async (req, res, next) => {
    try {
        const query = `INSERT INTO questoes (numero_questao, id_Materia, id_CorProva, id_AnoProva, id_instituicao, textoprincipal, textoquestao, 
            alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, gabarito,posicao_imagem,continuacao_texto, imagem_questoes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        await mysql.execute(query, [
            req.body.numero_questao,
            req.body.materia,
            req.body.cor_prova,
            req.body.ano_prova,
            req.body.instituicao,
            req.body.textoprincipal,
            req.body.textoquestao,
            req.body.alternativa_A,
            req.body.alternativa_B,
            req.body.alternativa_C,
            req.body.alternativa_D,
            req.body.alternativa_E,
            req.body.gabarito,
            req.body.posicao_imagem,
            req.body.continuacao_texto,
            req.file.path.replace("public", "")
        ])
        const response = {
            mensagem: 'Questao inserida com sucesso',
            questoes: {
                numero_questao: req.body.numero_questao,
                materia: req.body.materia,
                cor_prova: req.body.cor_prova,
                ano_prova: req.body.ano_prova,
                instituicao: req.body.instituicao,
                textoprincipal: req.body.textoprincipal,
                textoquestao: req.body.textoquestao,
                alternativa_A: req.body.alternativa_A,
                alternativa_B: req.body.alternativa_B,
                alternativa_C: req.body.alternativa_C,
                alternativa_D: req.body.alternativa_D,
                alternativa_E: req.body.alternativa_E,
                gabarito: req.body.gabarito,
                posicao_imagem: req.body.posicao_imagem,
                continuacao_texto: req.body.continuacao_texto,
                imagem_questoes: req.file

            }
        }
        return res.status(201).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }

}

exports.getMateria = async (req, res, next) => {
    try {
        const query = `SELECT * FROM materia WHERE NomeMateria = ?`

        const result = await mysql.execute(query, [req.params.materia]);

        const response = {
            materia: result.map(mate => {
                return {
                    id_materia: mate.id
                }
            })

        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getTodasMateria = async (req, res) => {
    try {
        const query = `SELECT * FROM materia `

        const result = await mysql.execute(query);

        const response = {
            materiaa: result.map(mate => {
                return {
                    materia: mate.NomeMateria
                }
            })

        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
exports.getTodasInstituicao = async (req, res) => {
    try {
        const query = `SELECT * FROM instituicao `

        const result = await mysql.execute(query);

        const response = {
            instituicao: result.map(mate => {
                return {
                    instituicaoo: mate.nome_instituicao
                }
            })

        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


exports.getInstituicao = async (req, res, next) => {
    try {
        const query = `SELECT * FROM instituicao WHERE nome_instituicao = ?`

        const result = await mysql.execute(query, [req.params.instituicao]);

        const response = {
            instituicao: result.map(mate => {
                return {
                    id_instituicao: mate.id
                }
            })

        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
exports.getIDInstituicao = async (req, res, next) => {
    try {
        const query = `SELECT * FROM instituicao WHERE id = ?`

        const result = await mysql.execute(query, [req.params.id_instituicao]);

        const response = {
            instituicao: result.map(mate => {
                return {
                    instituto: mate.nome_instituicao
                }
            })

        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}