import memberController from '../../../app/controllers/member';
import Member from '../../../app/models/memberModel';
import sinon from 'sinon';

describe('Member Controller', function () {
    // req contains unchanged body and id parameters
    // required for all tests
    let req = {
        body: { // for testing create member
            name: "fname lname",
            email: "fname.lname@x.com",
            age: "7"
        },
        params: {
            id: "5aa06bb80738152cfd536fdc" 
        }
    },
    // server error
    error = new Error({ error: "blah blah" }),
    res = {},
    expectedResult;
    
    let memberStub;

    describe('create', function () {
        beforeEach( ()=> {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() }) 
            };
        });
        afterEach(() => {
            memberStub.restore();
        });

        it('should return created Member obj', async()=> {
            expectedResult = req.body;
            memberStub= sinon.stub(Member, 'create').yields(null, expectedResult);
            await memberController.create(req, res);
            sinon.assert.calledWith(Member.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ email: req.body.email }));
        });
        it('should return status 500 on server error', async()=> {
            memberStub= sinon.stub(Member, 'create').yields(error);
            await memberController.create(req, res);
            sinon.assert.calledWith(Member.create, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('get all', function () {
        beforeEach(()=> {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = [{}, {}, {}];
        });
        afterEach(() => {
            memberStub.restore();
        });

        it('should return array of members or empty array', async()=> {
            memberStub = sinon.stub(Member, 'find').yields(null, expectedResult);
            await memberController.retieveAll(req, res);
            sinon.assert.calledWith(Member.find, {});
            sinon.assert.calledWith(res.json, sinon.match.array);
        });
        it('should return status 500 on server error', async()=> {
            memberStub = sinon.stub(Member, 'find').yields(error);
            await memberController.retieveAll(req, res);
            sinon.assert.calledWith(Member.find, {});
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('retrive', function () {
        beforeEach(()=> {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body;
        });
        afterEach(() => {
            memberStub.restore();
        });

        it('should return member obj', () => {
            memberStub = sinon.stub(Member, 'findById').yields(null, expectedResult);
            memberController.retrieve(req, res);
            sinon.assert.calledWith(Member.findById, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ email: req.body.email }));
        });
        it('should return status 404 for non existing member id', () => {
            memberStub = sinon.stub(Member, 'findById').yields(null, null);
            memberController.retrieve(req, res);
            sinon.assert.calledWith(Member.findById, req.params.id);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });
        it('should return status 500 on server error', () => {
            memberStub = sinon.stub(Member, 'findById').yields(error);
            memberController.retrieve(req, res);
            sinon.assert.calledWith(Member.findById, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', function () {
        beforeEach(()=> {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body;
        });
        afterEach(() => {
            memberStub.restore();
        });
        it('should return updated member obj', ()=> {
            memberStub = sinon.stub(Member, 'findOneAndUpdate').yields(null, expectedResult);
            memberController.update(req, res);
            sinon.assert.calledWith(Member.findOneAndUpdate, { "_id": req.params.id }, req.body, { new: true });
            sinon.assert.calledWith(res.json, sinon.match({ name: req.body.name }));
            sinon.assert.calledWith(res.json, sinon.match({ email: req.body.email }));
        });
        it('should return 404 for non-existing member id',()=> {
            memberStub = sinon.stub(Member, 'findOneAndUpdate').yields(null, null);
            memberController.update(req, res);
            sinon.assert.calledWith(Member.findOneAndUpdate, { "_id": req.params.id }, req.body, { new: true });
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });
        it('should return status 500 on server error',()=> {
            memberStub = sinon.stub(Member, 'findOneAndUpdate').yields(error);
            memberController.update(req, res);
            sinon.assert.calledWith(Member.findOneAndUpdate, { "_id": req.params.id }, req.body, { new: true });
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });


    describe('delete', function () {
        beforeEach(()=> {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
        afterEach(() => {
            memberStub.restore();
        });

        it('should return successful deletion message', ()=> {
            memberStub = sinon.stub(Member, 'findOneAndDelete').yields(null, {});
            memberController.delete(req, res);
            sinon.assert.calledWith(Member.findOneAndDelete, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ "message": "Member deleted successfully!" }));
        });
        it('should return 404 for non-existing member id', ()=> {
            memberStub = sinon.stub(Member, 'findOneAndDelete').yields(null, null);
            memberController.delete(req, res);
            sinon.assert.calledWith(Member.findOneAndDelete, req.params.id);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });
        it('should return status 500 on server error', ()=> {
            memberStub = sinon.stub(Member, 'findOneAndDelete').yields(error);
            memberController.delete(req, res);
            sinon.assert.calledWith(Member.findOneAndDelete, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });


});
