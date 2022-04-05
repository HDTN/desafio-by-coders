const db = require('../database/knex')

const select = async (data) => {
    let sqlAux = ''

    let sql = `
        select 
            round((sum(
                case when t.tipo = 1 then t.valor * 1 
                    when t.tipo = 2 then t.valor * -1 
                    when t.tipo = 3 then t.valor * -1 
                    when t.tipo = 4 then t.valor * 1 
                    when t.tipo = 5 then t.valor * 1 
                    when t.tipo = 6 then t.valor * 1 
                    when t.tipo = 7 then t.valor * 1
                    when t.tipo = 8 then t.valor * 1
                    when t.tipo = 9 then t.valor * -1
                end))::numeric, 2) as saldo, 
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
    select
}