/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('usuario', function(table) {
            table.unique('google_id')
            table.string('nome', 255).notNullable()
            table.string('email', 255).notNullable()
            table.string('foto', 255).notNullable()
            table.string('google_id', 255).notNullable()
        })
        .createTable('transacao', function(table) {
            table.increments().primary()
            table.integer('tipo', 255).notNullable()
            table.date('data', 255).notNullable(knex.fn.now())
            table.float('valor', 255).notNullable()
            table.string('cpf', 255).notNullable()
            table.string('cartao', 255).notNullable()
            table.string('hora', 255).notNullable()
            table.string('nome_proprietario', 255).notNullable()
            table.string('nome_estabelecimento', 255).notNullable()
            table.string('uid', 255).notNullable()
        })  
        .createTable('tipo_transacao', function(table) {
            table.integer('tipo', 255).notNullable()
            table.string('descricao', 255).notNullable()
            table.string('natureza', 255).notNullable()
            table.integer('sinal', 255).notNullable()
        })          
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('usuario').dropTable('transacao').dropTable('tipo_transacao')
};
