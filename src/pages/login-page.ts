import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    page: Page;
    userName: Locator;
    password: Locator;
    btnLogin: Locator;
    userNameInfo: Locator;

    constructor(page: Page){
        this.page = page;
        this.userName = page.locator('#userName');
        this.password = page.locator('#password');
        this.btnLogin = page.locator('#login');
        this.userNameInfo = page.locator('#userName-value');
    }

    async open(){
        await this.page.goto('login');
        await expect(this.page).toHaveURL(/.*login/);
    }

    async login(user: {userName: string; password: string}) {
        await this.userName.fill(user.userName);
        await this.password.fill(user.password);
        await this.btnLogin.click();
        await this.userNameInfo.waitFor({ state: 'visible' });
    }

    async loginFail(user: {userName: string; password: string}) {
        await this.userName.fill(user.userName);
        await this.password.fill(user.password);
        await this.btnLogin.click();
        const errorMessage = this.page.locator('#name');
        await errorMessage.waitFor({ state: 'visible' });
        await expect(errorMessage).toHaveText('Invalid username or password!');
    }

    async logout() {
        const btnLogout = this.page.locator('button:has-text("Log out")');
        await btnLogout.click();
        await expect(this.page).toHaveURL(/.*login/);
    }
}
