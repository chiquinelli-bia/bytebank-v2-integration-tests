import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import api from './api';
import { buscaTransacoes } from '../services/transacoes';

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
});
