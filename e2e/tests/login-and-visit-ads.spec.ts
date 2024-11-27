import { test, expect } from '@playwright/test';

let FRONT_URL;
if (process.env.CI) {
  FRONT_URL = 'http://front:3000/?CI=true';
} else {
  FRONT_URL = 'http://localhost:3000/';
}

console.log("we will use front URL : " + FRONT_URL)

test('has title', async ({ page }) => {
  await page.goto(FRONT_URL);

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: 'login page title' })).toContainText(/Connexion/);
});

test('can login and access ads', async ({ page }) => {
  page.on('console', message => {
    console.log('browser log: ', message)
  });

  await page.goto(FRONT_URL);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('louis.grignon@gmail.com');
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill('toto');
  await page.getByRole('button', { name: 'Se connecter' }).click();

  console.log("will take screenshot")
  await page.screenshot({ path: './screenshots/after-login.png' })
  console.log("screenshot taken")

  await expect(page.getByLabel('welcome message')).toContainText('Votre email: louis.');

  await page.getByRole('link', { name: 'Ameublement' }).click();

  await expect(page.getByLabel('ad title').nth(0)).toContainText('Armoire normande');
});