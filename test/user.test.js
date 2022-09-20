const request = require('supertest');
const app = require('../app');

const baseURL = "http://localhost:5000/api";
let newResponse = {}; 
let newShiftResponse = {};

describe("GET-POST /User", () => {
    const newUser = {
        "firstName": "buddhika",
        "lastName":"Senevirathna",
        "email":"bu5@gmail.com",
        "password":"12345462155",
        "phoneNumber":"123344556665",
        "role":"admin"
    }

    const newShift = {
        "shiftName":"Evening Shif",
        "shiftDate" : "3003-10-01",
        "department":"Transport",
        "startTime":"00:00",
        "endTime":"08:00",
        "duration": 8,
        "assignedUsers": []
    }

    beforeAll(async () => {
        newResponse = await request(baseURL).post("/user/register").send(newUser);
        expect(newResponse.statusCode).toBe(200);
    });

    afterAll(async () => {
        await request(baseURL).delete(`/shift/${newShiftResponse.body.message.upsertedId}`).set('x-access-token', `${newResponse.body.token}`);
        await request(baseURL).delete(`/user/${newResponse.body.data._id}`).set('x-access-token', `${newResponse.body.token}`);
    });

    it("should return 200 with user details", async () => {
        const response = await request(baseURL).get(`/user/${newResponse.body.data._id}`).set('x-access-token', `${newResponse.body.token}`);;
        expect(response.statusCode).toBe(200);
        expect(response.body.data.firstName).toBe("buddhika");
        expect(response.body.data.lastName).toBe("Senevirathna");
        expect(response.body.data.email).toBe("bu5@gmail.com")
        expect(response.body.data.phoneNumber).toBe("123344556665")
        expect(response.body.data.role).toBe("admin")
    });
   
    it("should return 200 with list of users", async () => {
        const response = await request(baseURL).get("/user/").set('x-access-token', `${newResponse.body.token}`);
        expect(response.statusCode).toBe(200);
    });

    it("should return 200 with newly created shift details", async () => {
        newShiftResponse = await request(baseURL)
        .post(`/shift`)
        .send(newShift)
        .set('x-access-token', `${newResponse.body.token}`);
        expect(newShiftResponse.statusCode).toBe(200);

    });
});
