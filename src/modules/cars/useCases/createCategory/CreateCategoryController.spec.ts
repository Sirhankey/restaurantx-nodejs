import { app } from "@shared/infra/http/app";
import request from "supertest";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");
        await connection.runMigrations();
        const password = await hash("admin", 8);
        const id = uuidV4();
        await connection.query(
            `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
          VALUES ('${id}', 'admin', 'admin@teste.com.br', '${password}', true, 'now()', 'xxxxxxxxx' )
          `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@teste.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "teste",
            description: "testando"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(401);
    });

    it("should not be able to create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@teste.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "teste",
            description: "testando"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(401);
    });
});