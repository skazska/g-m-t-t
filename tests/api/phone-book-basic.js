require('mocha');
const {expect, use}  = require('chai');
const query = require('superkoa');

const server = require('../../api/app');

describe('phone-book-api basic test', () => {
    let agent;
    let res;
    before(() => {
        agent = query(server);
    });

    it('1. GET /phone-book should return empty list and 200', async () => {
        res = await agent.get('/phone-book').expect(200);
        expect(res.body).eql([]);
    });

    it('2. POST /phone-book a data should return that data and 201', async () => {
        res = await agent.post('/phone-book').expect(201).send({name: 'a', phone: 'b'});
        expect(res.body).eql({name: 'a', phone: 'b'});
    });

    it('3. GET /phone-book/a should return data posted before and 200', async () => {
        res = await agent.get('/phone-book/a').expect(200);
        expect(res.body).eql({name: 'a', phone: 'b'});
    });

    it('4. PUT /phone-book/a another data should return that data 200', async () => {
        res = await agent.put('/phone-book/a').expect(200).send({name: 'a', phone: 'c'});
        expect(res.body).eql({name: 'a', phone: 'c'});
    });

    it('5. GET /phone-book should return empty new list and 200', async () => {
        res = await agent.get('/phone-book').expect(200);
        expect(res.body).eql([{name: 'a', phone: 'c'}]);
    });

    it('6. POST /phone-book another data should return that data and 201', async () => {
        res = await agent.post('/phone-book').expect(201).send({name: 'b', phone: 'b'});
        expect(res.body).eql({name: 'b', phone: 'b'});
    });

    it('7. GET /phone-book should return empty new list and 200', async () => {
        res = await agent.get('/phone-book').expect(200);
        expect(res.body).eql([{name: 'a', phone: 'c'}, {name: 'b', phone: 'b'}]);
    });



    it('20. POST /phone-book with repeated name  should return 400 "record exists"', async () => {
        res = await agent.post('/phone-book').expect(400).send({name: 'a', phone: 'b'});
        expect(res.body).eql({message: 'record exists'});
    });

    it('21. GET /phone-book/x a should return 404 "record exists"', async () => {
        res = await agent.get('/phone-book/x').expect(404);
        expect(res.body).eql({message: 'not found'});
    });

});
