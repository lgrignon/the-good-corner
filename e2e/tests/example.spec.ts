import { test, expect } from '@playwright/test';

const url = 'http://frontend:3000'

test('has title', async ({ page }) => {
  await page.goto(url);

  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});


test('login test', async ({ page }) => {
  await page.goto(url);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('louis.grignon@gmail.com');
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill('toto');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  
  await expect(page.getByRole('note')).toContainText('Votre email: louis.');
});