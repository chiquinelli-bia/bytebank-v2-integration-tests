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
describe('Requisições para API', () => {
  test('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    const transacao = await buscaTransacoes();
    expect(transacao).toEqual(mockTransacao);
  });
});
