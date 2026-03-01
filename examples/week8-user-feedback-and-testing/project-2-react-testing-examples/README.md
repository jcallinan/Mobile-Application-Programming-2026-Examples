# Project 2: Common React Testing Patterns

This project demonstrates common testing approaches in React:

- **Unit test**: pure function (`calculateAverageRating`) test.
- **Integration/component test**: fill form + assert rendered UI updates.
- **Mock test**: mock an API module with `vi.mock`.
- **Snapshot test**: verify stable UI output.
- **E2E test (Cypress)**: user flow through the browser.

## Run tests

```bash
npm install
npm test
```

## Run e2e test

Start the app in one terminal:

```bash
npm run dev
```

Then run cypress in another terminal:

```bash
npm run e2e
```
