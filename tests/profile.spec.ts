import { test, expect } from '../src/fixtures/test-fixtures';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Profile Test', ()=>{
    test('Validate user profile', async ({ loginPage, profilePage, accountAPI, bookstoreAPI, page }) => {
        /* Passo 1: Realiza a criação de um novo usuário pela API */
        const cred = { userName: process.env.LOGIN_USERNAME_DEFAULT!, password: process.env.LOGIN_PASSWORD_DEFAULT! };
        const userId = process.env.USER_UUID!
        const token = process.env.USER_TOKEN!
        const bookName = 'Understanding ECMAScript 6';

        
        /* Passo 2: realiza a inserção do livro a lista do usuário pela API */
        const [{isbn}] = await bookstoreAPI.listBooks();
        await bookstoreAPI.addListOfBooks(userId, [isbn], token);

        /* Passo 3: Realiza o login do usuário na aplicação exibindo a lista com o livro inserido*/
        await loginPage.open();
        await loginPage.login(cred);
        

        await page.waitForSelector('#userName-value')
        await expect(profilePage.bookRow(bookName)).toBeVisible();
        await expect(profilePage.userName).toHaveText(cred.userName);

        await loginPage.logout();
    })
})
