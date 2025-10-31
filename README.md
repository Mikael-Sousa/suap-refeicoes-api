# 🍽️ API de Automação de Reservas do SUAP (IFPI)

Esta API automatiza o processo de **reserva de refeições no SUAP (IFPI)**, utilizando **Node.js** e **Puppeteer**.
O sistema faz login automaticamente com suas credenciais do SUAP e realiza as reservas desejadas no **Restaurante Institucional**, sem necessidade de interação manual.

---

## 🚀 Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Puppeteer](https://pptr.dev/)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Mikael-Sousa/suap-refeicoes-api
   cd suap-bot-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do SUAP:

   ```
   SUAP_USERNAME=seu_usuario
   SUAP_PASSWORD=sua_senha
   PORT=3000
   ```

---

## ⚙️ Estrutura do Projeto

```
.
├── bot.js           # Lógica principal de automação com Puppeteer
├── server.js        # Configuração da API Express
├── .env             # Variáveis de ambiente
├── package.json     # Dependências e scripts
└── README.md        # Documentação do projeto
```

---

## 🧠 Uso

Inicie a API:

```bash
npm start
```

A aplicação rodará em `http://localhost:3000`.

Envie uma requisição POST para:

```
POST /bot
```

Exemplo usando `curl`:

```bash
curl -X POST http://localhost:3000/bot
```

A resposta indicará o status da automação:

```json
{
  "message": "Bot executado com sucesso",
  "result": "Reservas realizadas com sucesso"
}
```

---

## 🔁 Fluxo da Automação

1. A API recebe uma requisição HTTP.
2. Puppeteer é iniciado e acessa o site do SUAP.
3. Faz login com as credenciais do `.env`.
4. Navega até **Atividades Estudantis → Restaurante Institucional → Reservar Refeições**.
5. Realiza a reserva de acordo com o comportamento definido (ex: última opção disponível).
6. Retorna a resposta à API com o status da execução.

---

## 🧰 Dicas de Depuração

* Use `headless: false` para observar o navegador em tempo real.
* Adicione `await page.waitForTimeout(1000)` entre etapas se notar travamentos.
* Verifique se os **seletores CSS** estão atualizados — o SUAP pode mudar sua estrutura periodicamente.
* Certifique-se de que o login não está exigindo captcha (o bot não resolve captchas).

---

## 🧪 Teste Rápido

1. Adicione suas credenciais reais no `.env`.
2. Execute:

   ```bash
   node server.js
   ```
3. Acesse `http://localhost:3000/bot` via Postman, navegador ou terminal.

---

## ⚠️ Observações

* Este projeto é para **uso pessoal e educacional**.
* Não deve ser usado para automatizar acessos de múltiplos usuários ou violar políticas do SUAP.
* O comportamento do site pode mudar; mantenha os seletores atualizados.

---

## 🪪 Licença

Distribuído sob a licença **MIT**.
Créditos: desenvolvido para automatizar o processo de reserva de refeições do **SUAP/IFPI** de forma simples e eficiente.
