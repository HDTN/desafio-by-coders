const db = require('../database/knex')


const insert = async (data) => {
    let sql = `insert into transacao
            (tipo, data, valor, cpf, cartao, hora, nome_proprietario, nome_estabelecimento, uid)`
                        
    if(Array.isArray(data) && Array.isArray(data[0])){
        sql += ` values ${data.map(line => `(${line.map(item => `'${item}'`)})`)} returning *` 
    }else{
        sql += ` values (${data.map(item => `'${item}'`)}) returning *`
    
    }

    return await db.raw(sql).then(result => result.rows)

}

const select = async (data) => {
    let sql = `
        select 
            t.tipo, t.data, t.valor, t.cpf, t.cartao, t.hora, t.nome_proprietario, t.nome_estabelecimento
        from transacao t 
        where 1 = 1 
    `
    if(data.hasOwnProperty('user')){
        sql += ` and t.uid = '${data.user.google_id}'`
    }

    if(data.hasOwnProperty('nome_estabelecimento')){
        sql += ` and upper(t.nome_estabelecimento) like '%${data.nome_estabelecimento.toUpperCase()}%'`
    }
    if(data.hasOwnProperty('nome_proprietario')){
        sql += ` and upper(t.nome_proprietario) like '%${data.nome_proprietario.toUpperCase()}%'`
    }

    return db.raw(sql).then(result => result.rows)
}

const balance = async (data) => {
    let sqlAux = ''

    let sql = `
        select 
            sum(
                case when t.tipo = 1 then t.valor * 1 
                    when t.tipo = 2 then t.valor * -1 
                    when t.tipo = 3 then t.valor * -1 
                    when t.tipo = 4 then t.valor * 1 
                    when t.tipo = 5 then t.valor * 1 
                    when t.tipo = 6 then t.valor * 1 
                    when t.tipo = 7 then t.valor * 1
                    when t.tipo = 8 then t.valor * 1
                    when t.tipo = 9 then t.valor * -1 end
            ) as saldo, 
            t.nome_estabelecimento  
        from transacao t 
        where 1 = 1
        ${sqlAux}
        group by t.nome_estabelecimento 
    `

    if(data.hasOwnProperty('nome_estabelecimento')){
        sqlAux += `and upper(t.nome_estabelecimento) like '%${data.nome_estabelecimento.toUpperCase()}%'`
    }

    return await db.raw(sql).then(result => result.rows)

} 

module.exports = {
    insert,
    select,
    balance
}