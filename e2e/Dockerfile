# must match package json version
FROM mcr.microsoft.com/playwright:v1.49.0-noble

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY playwright.config.ts /app/playwright.config.ts

COPY tests/ /app/tests/

CMD npx playwright test