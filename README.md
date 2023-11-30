This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Disclaimer

This project is part of a workshop held at Netlight Berlin.

## Getting Started

This project represents a full-stack quiz app. Running this project requires a database connection defined in a .env file in the root of the project. 

To get started with the project after adding a database, run the development server:

```bash
npm install
npm run dev
```

## Workshop

- Create a .env file in the root of the repo and paste contents

### Implementation

The TODOs for the workshop are listed here: 
- Creating a title component: `src/app/components/FancyHeading.tsx`
- Fetching question data (done together): `src/app/components/Forms/QuestionForm.tsx`
- Posting answer and handling response: `src/app/components/Forms/QuestionForm.tsx`
- Fixing ranking table implementation: `src/app/components/RankingTable.tsx`

All todos can be found by searching for `TODO` in the project.


### Deployment

- Navigate to the [Vercel homepage](https://vercel.com)
- Sign in with GitHub
- Authorize Vercel to use GitHub
- Import this project from your repositories
- Deploy the project (it won't work yet)
- Create a Postgres database
- Connect it with your project
- Redeploy your application

