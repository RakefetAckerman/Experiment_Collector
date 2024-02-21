/**
 * Objects Service Tests
 * 
 * This file contains a suite of tests for the objects' service.
 * These tests cover object creation, retrieval, updates, deletions binding objects and searching objects by different methods,
 * for different user roles and premissions.
 * Please be noted that only the route of /objects is being tested, in production the Researchers and the Admins will send the request through 
 * /auth route, either way the methods are still protected.
 */

// Importing necessary libraries and modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app.js';
import { participant, researcher, admin1 } from '../../../src/utils/requestStructures/requestUsers.js';
import { researcherObj, participantObj } from '../../../src/utils/requestStructures/requestObjects.js';
import Roles from '../../../src/utils/UserRole.js';

// Initializing Chai HTTP and setting up assertions
chai.use(chaiHttp);
chai.should();

// A dictionary to store cookies of JWT tokens mapped by user email
let usersCookies = {}

describe('Objects Service Tests', () => {
    /**
     * Defining hooks beforeEach and afterEach
     */


    /**
     * This function runs before each test, it registers and logs in an admin user.
     * @name beforeEach Registering and logging in as admin
     * @function
     */
    beforeEach('Registering and logging in as admin', (done) => {
        const usersArr = [researcher, participant, admin1];

        // Using Promise.all to wait for all requests to complete
        Promise.all(
            usersArr.map((user) => {
                return new Promise((resolve) => {
                    chai.request(app)
                        .post(`/users/register`)
                        .send(user)
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.should.have.a.property('userId');
                            res.body.userId.should.have.a.property('email');
                            res.body.userId.email.should.be.equal(user.email);
                            resolve(); // Resolve the promise after the request is complete
                        });
                });
            })
        ).then(() => {
            return Promise.all(
                usersArr.map((user) => {
                    return new Promise((resolve) => {
                        chai.request(app)
                            .post(`/users/login`)
                            .send(user)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.a.property('role');
                                if (res.body.role !== Roles.PARTICIPANT) {
                                    res.headers.should.have.property('set-cookie');
                                    usersCookies[user.email] = res.headers['set-cookie']; // Update the JWT token within the users cookie dictionary
                                }
                                resolve(); // Resolve the promise after the request is complete
                            });
                    });
                })
            );
        }).then(() => {
            done(); // Call done after all promises have resolved
        });
    });


    /**
     * This function runs after each test to clear the database.
     * @function
     * @name afterEach
     * @param {function} done - Callback function to signal completion.
     */
    afterEach('Clearing the database', (done) => {
        const agent = chai.request.agent(app); // Create an agent to manage cookies

        // Delete all users after each test
        chai.request(app)
            .delete(`/auth/objects?email=${admin1.email}&platform=${admin1.platform}`)
            .set('Cookie', usersCookies[admin1.email])
            .end((err, res) => {
                res.should.have.status(200);
                chai.request(app)
                    .
                    delete(`/auth/users/${admin1.email}/${admin1.platform}`)
                    .set('Cookie', usersCookies[admin1.email])
                    .end((err, res) => {
                        res.should.have.status(200);
                        usersCookies = {};
                        agent.jar.setCookies([]);
                        agent.close();
                        done();
                    });
            });


    });

    it('should create new object by Resercher', (done) => {
        chai.request(app)
            .post('/objects')
            .send(researcherObj)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('objectId');
                res.body.objectId.should.have.property('internalObjectId');
                res.body.objectId.should.have.property('platform');
                res.body.should.have.property('alias');
                res.body.should.have.property('active');
                res.body.should.have.property('creationTimestamp');
                res.body.should.have.property('modificationTimestamp');
                res.body.should.have.property('location');
                res.body.should.have.property('createdBy');
                res.body.createdBy.should.have.property('userId');
                res.body.createdBy.userId.should.have.property('email');
                res.body.createdBy.userId.should.have.property('platform');
                res.body.createdBy.userId.email.should.equal(researcher.email);
                const createdObj = res.body;

                //getting all objects
                chai.request(app)
                    .get(`/objects?email=${admin1.email}&platform=${admin1.platform}`)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(1);
                        const obj = res.body[0];
                        obj.should.have.property('objectId');
                        obj.objectId.should.have.property('internalObjectId');
                        obj.objectId.internalObjectId.should.be.equal(createdObj.objectId.internalObjectId);
                        done();
                    });
            });
    });

    it('should not create new object by Resercher, the object properties are invalid', (done) => {
        chai.request(app)
            .post('/objects')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                chai.request(app)
                    .get(`/objects?email=${admin1.email}&platform=${admin1.platform}`)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(0);
                        done();
                    });
            });
    });


    it('should not create new object by Particpant, the object is set to inactive', (done) => {
        const otherObj = { ...participantObj };
        otherObj.createdBy = { ...participantObj.createdBy };
        otherObj.active = false;
        chai.request(app)
            .post('/objects')
            .send(otherObj)
            .end((err, res) => {
                res.should.have.status(403);
                chai.request(app)
                    .get(`/objects?email=${admin1.email}&platform=${admin1.platform}`)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(0);
                        done();
                    });
            });
    });

    it('should not create new object by the user, the user does not exist', (done) => {
        const otherObj = { ...participantObj };
        otherObj.createdBy = { ...participantObj.createdBy };
        otherObj.createdBy.userId = { ...participantObj.createdBy.userId };
        otherObj.createdBy.userId.email = 'someotheremail@test.org';
        otherObj.createdBy.userId.platform = 'Builder';
        chai.request(app)
            .post('/objects')
            .send(otherObj)
            .end((err, res) => {
                res.should.have.status(404);
                chai.request(app)
                    .get(`/objects?email=${admin1.email}&platform=${admin1.platform}`)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(0);
                        done();
                    });
            });
    });

    it('should not create new object by the user, the participant is not allowed to create inactive objects', (done) => {
        const otherObj = { ...participantObj };
        otherObj.active = false;
        chai.request(app)
            .post('/objects')
            .send(otherObj)
            .end((err, res) => {
                res.should.have.status(403);
                chai.request(app)
                    .get(`/objects?email=${admin1.email}&platform=${admin1.platform}`)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(0);
                        done();
                    });
            });
    });

    it('should update an object', (done) => {
        const otherObj = { ...researcherObj };
        otherObj.objectDetails = { ...researcherObj.objectDetails}
        let objID;
    
        chai.request(app)
            .post('/objects')
            .send(researcherObj)
            .then((res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('objectId');
                res.body.objectId.should.have.property('internalObjectId');
                objID = res.body.objectId.internalObjectId;
    
                otherObj.type = 'newType';
                otherObj.alias = 'newAlias';
                otherObj.active = false;
                otherObj.objectDetails.key1 = 0
    
                return chai.request(app)
                    .put(`/objects/${objID}?email=${researcher.email}&platform=${researcher.platform}`)
                    .send(otherObj);
            })
            .then((putRes) => {
                putRes.should.have.status(200);
                putRes.body.should.be.empty;
            
                // Make the GET request inside the .then() block
                return chai.request(app)
                    .get(`/objects/${objID}?email=${researcher.email}&platform=${researcher.platform}`);
            })            
            .then((getRes) => {
                getRes.should.have.status(200);
                getRes.body.should.not.be.empty;
                getRes.body.should.have.a.property('objectId');
                getRes.body.objectId.should.have.property('internalObjectId');
                getRes.body.objectId.internalObjectId.should.be.equal(objID);
                getRes.body.should.have.a.property('type');
                getRes.body.type.should.be.equal(otherObj.type);
                getRes.body.should.have.a.property('alias');
                getRes.body.alias.should.be.equal(otherObj.alias);
                getRes.body.should.have.a.property('active');
                getRes.body.active.should.be.equal(otherObj.active);
                getRes.body.should.have.a.property('objectDetails');
                getRes.body.objectDetails.should.have.a.property('key1');
                getRes.body.objectDetails.key1.should.be.equal(otherObj.objectDetails.key1);
                
                // Call done() after all assertions have been made
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
    
});