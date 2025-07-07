import { APIRequestContext, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
export interface Credentials {  userName: string; password: string; }
export interface TokenResponse { token: string; }
export interface User { userId: string; username: string; books: any[]}

dotenv.config({ path: './env/.env' });

export class AccountAPI {
    constructor(private request: APIRequestContext, private base = process.env.BASE_URL_API!){}

    async createUserViaAPI(c: Credentials): Promise<User> {
        const response = await this.request.post(`${this.base}/Account/v1/User`, { data: c });
        expect(response).toBeOK();
        return response.json() as Promise<User>;
    }

    async generateToken(c: Credentials): Promise<TokenResponse> {
        const response = await this.request.post(`${this.base}/Account/v1/GenerateToken`, { data: c });
        expect(response.ok()).toBeTruthy();
        return response.json();
    }

    async getUser(id: string, token: string): Promise<User> {
        const response = await this.request.get(`${this.base}/Account/v1/User/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        expect(response.ok()).toBeTruthy();
        return response.json();
    }

    async deleteUser(id: string, token: string) {
        return this.request.delete(`${this.base}/Account/v1/User/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}
