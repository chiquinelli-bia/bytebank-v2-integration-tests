import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import api from './api';
import { buscaTransacoes, salvaTransacao } from '../services/transacoes';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

// Mocks manuais criados para fins de estudo (simulando delay com Promise)
// const mockRequisicao = (retorno) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ data: retorno });
//     }, 200);
//   });
// };

// const mockRequisicaoErro = () => {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error());
//     }, 50);
//   });
// };

describe('Requisições para API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Deve retornar uma lista de transações', async () => {
    // Estudo: alternativa usando o mock manual com delay criado acima
    // api.get.mockImplementation(() => mockRequisicao(mockTransacao));

    api.get.mockImplementation(() => Promise.resolve({ data: mockTransacao }));

    const transacao = await buscaTransacoes();
    expect(transacao).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    // Estudo: alternativa chamando o mock de erro manual (lembrar de invocar a função com parênteses)
    // api.get.mockImplementation(() => mockRequisicaoErro());

    api.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Erro de requisição'))
    );

    const transacao = await buscaTransacoes();
    expect(transacao).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
  test('Deve retornar uma lista de 2 itens ', async () => {
    const listaComDoisItens = [
      mockTransacao[0],
      {
        id: 2,
        transacao: 'Depósito',
        valor: '200',
        data: '27/11/2022',
        mes: 'Novembro',
      },
    ];

    // Mock do POST (retorna status 201 de sucesso na criação)
    api.post.mockImplementation(() => Promise.resolve({ status: 201 }));

    // Mock do GET (retorna a lista com os 2 itens)
    api.get.mockImplementation(() =>
      Promise.resolve({ data: listaComDoisItens })
    );

    // 1. Salva a nova transação
    const status = await salvaTransacao({
      transacao: 'Depósito',
      valor: '200',
      data: '27/11/2022',
      mes: 'Novembro',
    });

    expect(status).toBe(201);

    // 2. Busca a lista atualizada
    const transacoes = await buscaTransacoes();

    expect(transacoes).toHaveLength(2);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
