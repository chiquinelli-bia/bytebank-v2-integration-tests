import { renderHook, act } from '@testing-library/react';
import useListatransacoes from './useListaTransacoes';
import { buscaTransacoes } from '../services/transacoes';

jest.mock('../services/transacoes');
const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];
describe('./useListatransacoes.js', () => {
  test('Deve retornar uma lista de transações e uma função que a atualiza', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);
    const { result } = renderHook(() => useListatransacoes(''));

    expect(result.current[0]).toEqual([]);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacao);
  });
});
