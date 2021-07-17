import { app } from "@shared/infra/http/app";
import request from "supertest";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("List Category Controller", () => {
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

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@teste.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories").send({
            name: "teste",
            description: "testando"
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });
});