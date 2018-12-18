import app from '../../app/index';
import request from 'supertest';
import mongoose from 'mongoose';
import Member from '../../app/models/memberModel.js';

describe('members CRUD function', () => {
    let testmember = {
        _id: "54759eb3c090d83494e2d804",
        name: "test user",
        age: "10",
        email: "test.user@email.com"
    };
    let invalidId = '54759eb3c090d83494e2d809';

    beforeEach(() => {

    });

    it('should get all members', async () => {
        await request(app)
            .get('/members')
            .expect(200);
    });
    //Create
    it('should creates a member', async() => {
        //make request
        await request(app)
            .post('/members')
            .send(testmember)
            .expect(200);
    });
    it('should not creates a member', async() => {
        //make request
        await request(app)
            .post('/members')
            .send({})
            .expect(500);
    });
    //Retrieve
    it('should get a member', async () => {
        await request(app)
            .get('/members/' + testmember._id)
            .expect(200);
    });
    it('should not get a member', async () => {
        await request(app)
            .get('/members/' + invalidId)
            .expect(404);
    });
    //Update
    it('should update a member', async () => {
        await request(app)
            .put('/members/'+ testmember._id)
            .send({
                age:"11"
            })
            .expect(200);
    });
    it('should not update a member', async () => {
        await request(app)
            .put('/members/' + invalidId)
            .send({
                age: "12"
            })
            .expect(404);
    });
    //Delete
    it('should delete a member', async() => {
        //make request
        await request(app)
            .delete('/members/'+testmember._id)
            .expect(200);
    });
    it('should delete a member', async () => {
        //make request
        await request(app)
            .delete('/members/' + invalidId)
            .expect(404);
    });

    after(async () => {
        await Member.remove({});
    });
});
