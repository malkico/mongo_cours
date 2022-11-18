const request = require("supertest")
require('dotenv').config()
const mongoose = require("mongoose")


describe("GET /user", () => {

    const email = "Azerty@gmail.comjlbbss"
    const baseURL = `${process.env.HOST}:${process.env.PORT}`
    const newUser = {
        email: email,
        lastname: "malki",
        firstname: "hicham",
        phone: "0613830131",
        password: "shwNaNEMKjBjdUXshwNaNEMKjBjdUX",
        confirmPassword: "shwNaNEMKjBjdUXshwNaNEMKjBjdUX"
    }
    beforeEach((done) => {
        mongoose.connect(
            "mongodb://0.0.0.0:27017/test",
            { useNewUrlParser: true },
            () => done()
        )
    })
    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done())
        })
    })

    beforeAll(async () => {
        // set up the user
         await request(`${baseURL}`).post(`/api/auth/register`).send(newUser); 
    })
    afterAll(async () => {
         await request(baseURL).delete(`/api/user/delete/email/${email}`)
    })
    it("should return 201", async () => {
        const response = await request(baseURL).get(`/api/user/profile/${email}`);
        expect(response.statusCode).toBe(201);
    });
});
