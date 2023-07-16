## Introdução

Este é um teste para a IN8, o foco era realizar uma aplicação financeira com objetivos de:
- Registrar objetivos
- Registrar saldo
- Observar transações
- Realizar transações
- Gerar gráficos
  
## Tecnologias

- Next.js
- Typescript
- Zustand
- MUI (MaterialUI)
- Firebase
- React-toastify
- Swiper
- Jest ( Em construção )

## Como usar

Modifique o .env no root do aplicativo. 
```js
  NEXT_PUBLIC_FIREBASE_API_KEY="<api-key>"
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="<api-key>"
  NEXT_PUBLIC_FIREBASE_PROJECT_ID="<api-key>"
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="<api-key>"
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="<api-key>"
  NEXT_PUBLIC_FIREBASE_APP_ID="<api-key>"
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="<api-key>"
```
Como achar essas informações?
* Adicione o Firestore ao projeto
* Adicione um app do tipo web
* Configure o SDK com NPM
* Copie o arquivo gerado e atualize os dados

-> npm run dev

## Próximos passos

- Fazer teste unitários com JEST (Em construção)

## Tempo de realização

- Total de 12 horas para realização do projeto.

## Rotas

- /login
- /register
- /dashboard (Precisa estar autenticado)
