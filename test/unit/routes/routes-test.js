const request = require('supertest');
const assert = require('assert');
const expect = require('chai').expect;

import memberCtrl from '../../../app/controllers/member';
import app from '../../../app/index';

describe("Routes", function () {

    it('should return 200 status', function () {
        return request(app)
            .get('/')
            .then(function (response) {
                assert.equal(response.status, 200);
                expect(response.text).to.equal('OK');
            });
    });
    it('should return 404 status', function () {
        return request(app)
            .get('/nopath')
            .then(function (response) {
                assert.equal(response.status, 404);
            });
    });

});