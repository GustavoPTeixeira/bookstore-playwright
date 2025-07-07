import { test, expect } from '../src/fixtures/test-fixtures';
const bookTitle = 'Understanding ECMAScript 6';
const bookSubtitle = 'The Definitive Guide for JavaScript Developers';
const bookAuthor = 'Nicholas C. Zakas';
const bookPublisher = 'No Starch Press';
const bookTotalPages = 352;
const bookDescription = 'ECMAScript 6 (also known as ES6 or ECMAScript 2015) is a major revision to the JavaScript language that introduces new features and syntax improvements. It is designed to make JavaScript more powerful and easier to work with, especially for large applications.';
const bookWebsite = 'https://www.nostarch.com/understandinges6';

test.describe('Book Details Test', () => {
    test('View book details', async ({ loginPage, bookDetailsPage, profilePage, accountAPI, bookstoreAPI }) => {
        /* Passo 1: Realiza a criação de um novo usuário pela API */
        const cred = { userName: `user_${Date.now()}`, password: `Pwd@${Date.now()}` };
        const { userId } = await accountAPI.createUserViaAPI(cred);
        const { token } = await accountAPI.generateToken(cred);
        

        /* Passo2: realiza a inserção do livro a lista do usuário pela API */
        const [{isbn}] = await bookstoreAPI.listBooks();
        await bookstoreAPI.addListOfBooks(userId, [isbn], token);

        /* Passo 3: Realiza o login do usuário na aplicação exibindo a lista com o livro inserido*/
        await loginPage.open();
        await loginPage.login(cred);

        await profilePage.open();
        await expect(profilePage.bookRow(bookTitle)).toBeVisible();

        /* Passo 4: Clica no livro e valida os detalhes */
        await profilePage.bookRow(bookTitle).click();
        
        await expect(bookDetailsPage.bookTitle).toHaveText(bookTitle);
        await expect(bookDetailsPage.bookSubtitle).toHaveText(bookSubtitle);
        await expect(bookDetailsPage.bookAuthor).toHaveText(bookAuthor);
        await expect(bookDetailsPage.bookPublisher).toHaveText(bookPublisher);
        await expect(bookDetailsPage.bookTotalPages).toHaveText(bookTotalPages.toString());
        await expect(bookDetailsPage.bookDescription).toHaveText(bookDescription);
        await expect(bookDetailsPage.bookWebsite).toHaveAttribute('href', bookWebsite);

        /* Passo 5: Volta para a lista de livros */
        await bookDetailsPage.goBackToBookstore();
    })
})