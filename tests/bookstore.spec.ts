import { AccountAPI } from '../src/api/account.api';
import { test, expect } from '../src/fixtures/test-fixtures';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Bookstore Test', () => {
    test("Add books to the new user's list", async ({ loginPage, bookstorePage, bookDetailsPage, profilePage, accountAPI, bookstoreAPI, page}) => {

        /*Passo 1: Realiza a criação de um novo usuário pela API*/
        const cred = { userName: `user_${Date.now()}`, password: process.env.USER_PASSWORD_DEFAULT! };
        const { userId } = await accountAPI.createUserViaAPI(cred);
        const { token } = await accountAPI.generateToken(cred);
        const bookName = 'Understanding ECMAScript 6';

        /* Passo2: realiza a inserção do livro a lista do usuário pela API */
        const [{isbn}] = await bookstoreAPI.listBooks();
        await bookstoreAPI.addListOfBooks(userId, [isbn], token);

        /* Passo 3: Realiza o login do usuário na aplicação exibindo a lista com o livro inserido*/
        await loginPage.open();
        await loginPage.login(cred);

        await profilePage.open();
        await expect(profilePage.bookRow(bookName)).toBeVisible();

        /* Passo 4: Valida pela API se o livro pertence a aquele usuário */
        const user = await accountAPI.getUser(userId, token);
        await expect(user.books.map(b => b.title)).toContain(bookName);

        /* Passo 5: Remove o usuário criado */
        await accountAPI.deleteUser(userId, token);

    })

    test("Books research", async ({ loginPage, bookstorePage, bookDetailsPage, profilePage, accountAPI, bookstoreAPI }) => {    
        /*Passo 1: informa o livro a ser buscado no campo de pesquisa*/
        const researchInfo = 'JavaScript';
        await bookstorePage.open();
        await bookstorePage.searchBook(researchInfo);
        const rows = profilePage.bookRow(researchInfo);

        await expect(rows.first()).toBeVisible();

        await expect(await rows.count()).toBeGreaterThan(1);
    })


})