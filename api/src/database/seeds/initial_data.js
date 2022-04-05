/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tipo_transacao').del()
  await knex('tipo_transacao').insert([
    {tipo: 1, descricao: 'Débito', natureza: 'Entrada', sinal: 1 },
    {tipo: 4, descricao: 'Crédito', natureza: 'Entrada', sinal: 1 },
    {tipo: 5, descricao: 'Recebimento Empréstimo', natureza: 'Entrada', sinal: 1 },
    {tipo: 6, descricao: 'Vendas', natureza: 'Entrada', sinal: 1 },
    {tipo: 7, descricao: 'Recebimento TED', natureza: 'Entrada', sinal: 1 },
    {tipo: 8, descricao: 'Recebimento DOC', natureza: 'Entrada', sinal: 1 },
    {tipo: 2, descricao: 'Boleto', natureza: 'Saída', sinal: -1 },
    {tipo: 3, descricao: 'Financiamento', natureza: 'Saída', sinal: -1 },
    {tipo: 9, descricao: 'Aluguel', natureza: 'Saída', sinal: -1 },    
  ]);
};
