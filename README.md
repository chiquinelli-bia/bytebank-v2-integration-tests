![Título: "Bytebank — Testes de Integração & Mocks no Front-end" , SubTítulo: "adaptado por Bianca Chiquinelli"](./thumb.png)

# 🏦 Bytebank

Uma aplicação bancária simulada focada no desenvolvimento de uma suíte robusta de testes unitários e de integração no front-end, validando fluxos de saldo, depósitos, transações e navegação com consumo de API mockada.

## 🎯 Objetivo Técnico

Garantir a confiabilidade da aplicação e a integridade do fluxo de dados no front-end por meio de testes automatizados, simulando interações reais do usuário, requisições HTTP assíncronas e gerenciamento de estado de custom hooks sem dependência de um servidor de backend ativo.

## 🧪 Cobertura & Implementações de Teste

- **Testes de Custom Hooks com `renderHook`:** Testes unitários focados na gestão de estado e isolamento da lógica dos hooks `useSaldo` e `useListaTransacoes`.
- **Mocks de API Assíncrona:** Validação de chamadas HTTP (busca de extrato, atualização de saldo e inclusão de transações), cobrindo cenários de sucesso e tratamento de erros com inline mocks no Jest.
- **Integração de Fluxos de Interface:** Testes de integração end-to-component simulando a adição de transações no extrato e refletindo as mudanças de estado no saldo em tempo real.
- **Navegação & Roteamento (`AppRoutes`):** Validação de renderização e troca de rotas (Home, Cartões e tratamento de página 404).

## 🛠️ Stack de Testes & Ferramentas

- **Jest** — Configuração do ambiente de testes (`jsdom`), suporte a JSX, CSS Modules e mocks de recursos estáticos (SVGs).
- **React Testing Library** — Testes orientados ao comportamento do usuário e integração de componentes.
- **`renderHook` (`@testing-library/react`)** — Testes isolados de custom hooks.

## 🚀 Como Executar os Testes

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/chiquinelli-bia/bytebank-v2-integration-tests.git](https://github.com/chiquinelli-bia/bytebank-v2-integration-tests.git)
   cd bytebank-v2-integration-tests
   ```
2. **Instale as dependências:**

   ```Bash
   npm install
   ```

3. **Execute a suíte de testes:**

   ```Bash
   npm test
   ```
