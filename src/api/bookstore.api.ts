import { APIRequestContext, expect } from "@playwright/test";
import * as dotenv from 'dotenv';
export interface Book { isbn: string; userId: string; }
dotenv.config({ path: './env/.env' });

export class BookstoreAPI {
    constructor(private request: APIRequestContext, private base = process.env.BASE_URL_API!){}

    async listBooks() {
        const response = await this.request.get(`${this.base}/Bookstore/v1/Books`)
        expect(response.ok()).toBeTruthy();
        return (await response.json()).books as Book[];
    }

    async addListOfBooks(userId: string, isbns: string[], token: string){
        return this.request.post(`${this.base}/Bookstore/v1/Books`, {
            headers: { Authroization: `Bearer ${token}` },
            data: { userId, collectionOfIsbns: isbns.map(i => ({isbn: i})) }
    })
    }

    async deleteAll(userId: string, token: string){
        return this.request.delete(`${this.base}/Bookstore/v1/Books`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { userId }
        });
    }
}