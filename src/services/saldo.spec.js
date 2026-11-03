import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import api from './api';
import { buscaSaldo } from './saldo';

jest.mock('./api');

const mockSaldo = { valor: 100 };

describe('./saldo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Deve retornar o saldo atual', async () => {
    api.get.mockImplementation(() => Promise.resolve({ data: mockSaldo }));

    const saldo = await buscaSaldo();
    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
  test('Deve retornar o saldo 1000', async () => {
    api.get.mockImplementation(() => Promise.reject());

    const saldo = await buscaSaldo();
    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
