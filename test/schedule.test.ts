import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get Schedule', () => {
    it('today should have schedule', () => {
        return chai.request(app).get('/schedule/2018-02-09')
            .then((res) => {
                expect(res).to.be.json;
                let schedules = res.body
                expect(schedules).to.have.length.above(0);
            });
    });

    it('error date should return error', () => {
        return chai.request(app).get('/schedule/2018-02-29')
            .then(res => {
                expect(res).to.be.json;
                expect(res.body.sqlMessage).to.not.equal('');
            })
    });
});