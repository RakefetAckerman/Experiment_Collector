import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/index.js';
import {Participant, Researcher, Admin1, Admin2} from '../../../src/utils/requestStructures/requestUsers.js'
import UserBoundary from '../../../src/boundaries/user/UserBoundary.js';
import UserIdBoundary from '../../../src/boundaries/user/UserIdBoundary.js';
import Roles from '../../../src/utils/UserRole.js';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('User Service Tests', () => {
    it('should register a new Participant', (done) => {
        console.log(Researcher);
        chai.request(server)
            .post('/users/register')
            .send(Researcher)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                console.log(res.body);
                res.body.should.have.property('userBoundary');
                res.body.userBoundary.userId.email.should.equal(Researcher.email);
                done();
            });
    });

    it('should login a user', (done) => {
        const userData = {
            platform: 'platform',
            email: 'test@example.com',
            role: 'role',
            username: 'username',
            userDetails: {
                password: 'password'
            }
        };

        chai.request(server)
            .post('/users/login')
            .send(userData)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should update user information', (done) => {
        const userEmail = 'test@example.com';
        const userPlatform = 'platform';
        const updatedUserData = {
            platform: 'newPlatform',
            email: 'newemail@example.com',
            role: 'newRole',
            username: 'newUsername',
            userDetails: {
                password: 'newpassword'
            }
        };

        chai.request(server)
            .put(`/users/${userEmail}/${userPlatform}`)
            .send(updatedUserData)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should get user information', (done) => {
        const userEmail = 'test@example.com';
        const userPlatform = 'platform';

        chai.request(server)
            .get(`/users/${userEmail}/${userPlatform}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should delete all users', (done) => {
        const userEmail = 'test@example.com';
        const userPlatform = 'platform';

        chai.request(server)
            .delete(`/users/${userEmail}/${userPlatform}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
