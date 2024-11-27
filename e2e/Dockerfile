FROM mcr.microsoft.com/playwright:v1.49.0-noble

RUN mkdir /app
WORKDIR /app 

COPY . .
RUN npm i

CMD npx playwright test --project chromium