import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AppRoutes from '../../routes';

describe('App', () => {
  test('Deve permitir adicionar uma transação em Extrato', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(campoValor, '100');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  test('Deve navegar até a página cartões quando o link cartões for clicado', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const linkCartoes = screen.getByRole('link', { name: 'Cartões' });
    expect(linkCartoes).toBeInTheDocument();

    userEvent.click(linkCartoes);

    const tituloPagCartoes = await screen.findByRole('heading', {
      name: 'Meus cartões',
    });
    expect(tituloPagCartoes).toBeInTheDocument();
  });
});
