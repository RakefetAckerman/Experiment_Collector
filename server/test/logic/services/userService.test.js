import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { participant, researcher, admin1, admin2 } from '../../../src/utils/requestStructures/requestUsers.js'
import UserBoundary from '../../../src/boundaries/user/UserBoundary.js';
import UserIdBoundary from '../../../src/boundaries/user/UserIdBoundary.js';
import Roles from '../../../src/utils/UserRole.js';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

let usersCookies = {} //An object that stores the value of the jwt tokens of the users mapped by their email

describe('User Service Tests', () => {
    beforeEach('Registering and logining in ad admin', (done) => {
        // Register and login admin before each test
        chai.request(server)
            .post('/users/register')
            .send(admin1)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');

                // Login in the admin
                chai.request(server)
                    .post('/users/login')
                    .send(admin1)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.headers.should.have.property('set-cookie')
                        usersCookies[admin1.email] = res.headers['set-cookie']; // Update the JWT token
                        done();
                    });
            });
    });

    afterEach('Clearing the database', (done) => {
        // Delete all users after each test
        chai.request(server)
            .delete(`/auth/users/${admin1.email}/${admin1.platform}`)
            .set('Cookie', usersCookies[admin1.email])
            .end((err, res) => {
                res.should.have.status(200);
                usersCookies = {};
                done();
            });
    });


    it('should register a new Resercher', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.userId.email.should.equal(researcher.email);
                done();
            });
    });

    it('should register a new Participant', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(participant)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.userId.email.should.equal(participant.email);
                done();
            });
    });

    it('should sucsseful login a Reseacher after registration', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                chai.request(server)
                    .post('/users/login')
                    .send(researcher)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.a.property('userDetails');
                        res.body.userDetails.should.not.have.a.property('password');
                        res.headers.should.have.property('set-cookie');
                        done();
                    });
            });
    });

    it('should prevent Participant to use auth route', (done) => {

        chai.request(server)
            .post('/users/register')
            .send(participant)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            });

        chai.request(server)
            .get(`/auth/users/${participant.email}/${participant.platform}`)
            .send()
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    // it('should update user information', (done) => {
    //     const userEmail = 'test@example.com';
    //     const userPlatform = 'platform';
    //     const updatedUserData = {
    //         platform: 'newPlatform',
    //         email: 'newemail@example.com',
    //         role: 'newRole',
    //         username: 'newUsername',
    //         userDetails: {
    //             password: 'newpassword'
    //         }
    //     };

    //     chai.request(server)
    //         .put(`/users/${userEmail}/${userPlatform}`)
    //         .send(updatedUserData)
    //         .end((err, res) => {
    //             expect(res.status).to.equal(200);
    //             expect(res.body).to.be.an('object');
    //             done();
    //         });
    // });

    // it('should get user information', (done) => {
    //     const userEmail = 'test@example.com';
    //     const userPlatform = 'platform';

    //     chai.request(server)
    //         .get(`/users/${userEmail}/${userPlatform}`)
    //         .end((err, res) => {
    //             expect(res.status).to.equal(200);
    //             expect(res.body).to.be.an('array');
    //             done();
    //         });
    // });

    // it('should delete all users', (done) => {
    //     const userEmail = 'test@example.com';
    //     const userPlatform = 'platform';

    //     chai.request(server)
    //         .delete(`/users/${userEmail}/${userPlatform}`)
    //         .end((err, res) => {
    //             expect(res.status).to.equal(200);
    //             expect(res.body).to.be.an('object');
    //             done();
    //         });
    // });
});
