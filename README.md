# Testing – Cypress end-to-end tests for a movie search app

A school assignment in testing. We were given a small movie search app in TypeScript and Vite, and my task was to write tests for it and implement a sort function.

## What I did

- **End-to-end tests with Cypress** (`cypress/e2e/spec.cy.ts`) covering:
  - The search form renders with its input, search button and sort button
  - A search shows results
  - A movie is presented with the right title and image
  - An empty result shows the "Inga sökresultat" message
  - The sort button orders the results alphabetically
- **Mock data:** most tests use `cy.intercept` to replace the API response with fixed data, so they don't depend on what the live API returns.
- **Sort function:** implemented `productSort` in `src/ts/functions.ts` (ascending or descending by name).

## Run locally

```bash
npm install
npm run dev        # starts the app on http://localhost:5173
npx cypress open   # in a second terminal
```

## What I would improve today

- The "should show movies" test still calls the real API and expects exactly two results, so it breaks if the API changes. It should use mock data like the others.
- Add unit tests for `productSort`, including the descending order and equal names.
- Run the tests automatically on every push with GitHub Actions.

_The original assignment description is kept below._

---
