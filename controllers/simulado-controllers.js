const mysql = require('../mysql')


exports.postSimulado = async (req, res, next) => {
    try {
        const query = 'INSERT INTO simulados (id_tipo_simulado, id_usuario, data_inicio, data_final, duracao, nota_geral, status) VALUES (?,?,?,?,?,?,?)';
        const result = await mysql.execute(query, [
            req.body.id_tipo_simulado,
            req.body.id_usuario,
            req.body.data_inicio,
            req.body.data_final,
            req.body.duracao,
            req.body.nota_geral,
            req.body.status
        ]);
        const response = {
            mensagem: 'Simulado inserido com sucesso',
            simulado: {
                id_simulado: result.insertId,
                id_tipo_simulado: req.body.id_tipo_simulado,
                id_usuario: req.body.id_usuario,
                data_inicio: req.body.data_inicio,
                data_final: req.body.data_final,
                duracao: req.body.duracao,
                nota_geral: req.body.nota_geral,
                status: req.body.status
            }
        }
        return res.status(201).send(response)
    } catch (error) {

        return res.status(500).send({ error: error })
    }
}

exports.postQuestao = async (req, res, next) => {
    try {
        const query = 'INSERT INTO simulado_questao (id_simulado, id_questoes, resposta_usuario, status) VALUES (?,?,?,?)'
        await mysql.execute(query, [
            req.body.id_simulado,
            req.body.id_questoes,
            req.body.resposta_usuario,
            req.body.status
        ])
        const response = {
            mensagem: 'Simulado_questao inserido com sucesso'
        }

        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }


}
exports.getLista = async (req, res, next) => {
    try {
        const query = `SELECT tipo_simulado.nome as Nome_tipo_simulado ,simulados.id,data_inicio, duracao, nota_geral,id_tipo_simulado, simulados.status FROM simulados
        INNER JOIN tipo_simulado
        ON simulados.id_tipo_simulado = tipo_simulado.id
                     WHERE    id_usuario = ?
                     ORDER BY simulados.id DESC
                      `
        const result = await mysql.execute(query, [req.params.id_usuario])
        const response = {
            simulados_prontos: result.map(qts => {
                return {
                    simulado: qts,
                }

            })

        }

        return res.status(201).send(response)

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getSimulado = async (req, res, next) => {
    try {
        const query = `SELECT * FROM simulados
                       WHERE    id = ?;`
        const result = await mysql.execute(query, [req.params.id_simulado])
        const response = {
            simulados_prontos: result.map(qts => {
                return {
                    simulado: qts
                }

            }),


        }

        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getUserSimulado = async (req, res, next) => {
    try {
        const query = `SELECT  id, id_tipo_simulado, duracao, nota_geral/30*1000 AS nota_geral FROM simulados
        WHERE STATUS = 1 AND id_usuario = ? AND id_tipo_simulado = ?
        ORDER BY id DESC LIMIT 10;`
        const result = await mysql.execute(query, [req.params.id_usuario, req.params.id_tipo_simulado])
        const response = {
            simulados_prontos: result.map(qts => {
                return {
                    simulado: qts
                }

            })


        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.patchSimulado = async (req, res, next) => {
    try {
        const query = `UPDATE simulados
        SET nota_geral = ?,
            data_inicio = ?,
            data_final = ?,
            status = ?
      WHERE simulados.id = ?`
        await mysql.execute(query, [
        req.body.nota_geral,
        req.body.data_inicio,
        req.body.data_final,
        req.body.status,
        req.params.id_simulado])

        const response = {
            mensagem: 'Simulado atualizado com sucesso'
        }

        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.patchTempoSimulado = async (req, res, next) => {
    try {
        const query = `UPDATE simulados
        SET duracao = ?
      WHERE simulados.id = ?`
        await mysql.execute(query, [
        req.body.duracao,
        req.params.id_simulado])

        const response = {
            mensagem: 'Simulado atualizado com sucesso'
        }

        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}



exports.deleteSimulado = async (req, res, next) => {
 try {
     const query = 'DELETE FROM simulados WHERE id = ?' 
     await mysql.execute(query ,[req.params.id_simulado] )

     const response = {
        mensagem: 'Simulado removido com sucesso'
    }

    return res.status( 200 ).send( response );
 } catch (error) {
    return res.status(500).send({ error: error })
 }

}

exports.patchUsuario = async (req, res, next) => {
    try {
        const query = `UPDATE usuario
        SET nome = ?,
            email = ?,
            cpf = ?,
            telefone = ?
      WHERE usuario.id = ?`
        await mysql.execute(query, [
        req.body.nome,
        req.body.email,
        req.body.cpf,
        req.body.telefone,
        req.params.id])

        const response = {
            mensagem: 'usuario atualizado com sucesso'
        }

        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}
exports.getTempoSimulado = async (req, res, next) => {
    try {
        const query = `SELECT duracao FROM simulados
                       WHERE id = ?;`
        const result = await mysql.execute(query, [req.params.id_simulado])
        const response = {
            simulado: result.map(qts => {
                return {
                    duracao: qts.duracao
                }

            }),


        }

        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
