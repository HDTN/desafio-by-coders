const db = require('../database/knex')

const insertOrUpdate = async (data) => {
    return await db('usuario')
        .insert(data)
        .returning('*')
        .onConflict('google_id')
        .merge()
}

const select = async (data) => {
    let sql = 'select * from usuario where 1=1'
    
    if(data.hasOwnProperty('google_id')){
        sql += ` and google_id = '${data.google_id}'`
    }

    return await db.raw(sql).then(result => result.rows)
}

module.exports = {
    insertOrUpdate,
    select
}