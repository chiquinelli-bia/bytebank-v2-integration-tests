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

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: retorno });
    }, 200);
  });
};
const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 50);
  });
};

describe('Requisições para API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    // api.get.mockImplementation(() => Promise.resolve({ data: mockTransacao }));
    const transacao = await buscaTransacoes();
    expect(transacao).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
  test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    // api.get.mockImplementationOnce(() =>
    //   Promise.reject(new Error('Erro de requisição'))
    // );

    const transacao = await buscaTransacoes();
    expect(transacao).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
});
