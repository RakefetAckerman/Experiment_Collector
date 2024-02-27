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
import { commandObj } from '../../../src/utils/requestStructures/requestCommands.js';
import { researcherObj } from '../../../src/utils/requestStructures/requestObjects.js';
import Roles from '../../../src/utils/UserRole.js';

// Initializing Chai HTTP and setting up assertions
chai.use(chaiHttp);
chai.should();

// A dictionary to store cookies of JWT tokens mapped by user email
let usersCookies = {}

describe('Commands Service Tests', () => {
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
            .delete(`/auth/commands?email=${admin1.email}&platform=${admin1.platform}`)
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



    it('should create and execute a new command', (done) => {
        const otherCommandobj = { ...commandObj };
        otherCommandobj.targetObject = { ...commandObj.targetObject };
        otherCommandobj.targetObject.objectId = { ...commandObj.targetObject.objectId };
        otherCommandobj.commandAttributes = { ...commandObj.commandAttributes };
        const agent = chai.request.agent(app); // Create an agent to manage cookies

        chai.request(app)
            .post('/objects')
            .send(researcherObj)
            .then(async (res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('objectId');
                res.body.objectId.should.have.property('platform');
                res.body.objectId.should.have.property('internalObjectId');
                otherCommandobj.targetObject.objectId.platform = res.body.objectId.platform;
                otherCommandobj.targetObject.objectId.internalObjectId = res.body.objectId.internalObjectId;

                await agent.post(`/auth/commands`)
                    .set('Cookie', usersCookies[researcher.email])
                    .send(otherCommandobj)
                    .then((res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('commandId');
                        res.body.commandId.should.have.property('platform');
                        res.body.commandId.should.have.property('internalCommandId');
                        res.body.should.have.property('command');
                        res.body.command.should.be.equal(otherCommandobj.command);
                        res.body.should.have.property('targetObject');
                        res.body.targetObject.should.have.property('objectId');
                        res.body.targetObject.objectId.should.have.property('platform');
                        res.body.targetObject.objectId.platform.should.be.equal(otherCommandobj.targetObject.objectId.platform);
                        res.body.targetObject.objectId.should.have.property('internalObjectId');
                        res.body.targetObject.objectId.internalObjectId.should.be.equal(otherCommandobj.targetObject.objectId.internalObjectId);
                        res.body.should.have.property('invocationTimestamp');
                        res.body.should.have.property('invokedBy');
                        res.body.invokedBy.should.have.property('userId');
                        res.body.invokedBy.userId.should.have.property('platform');
                        res.body.invokedBy.userId.platform.should.be.equal(otherCommandobj.invokedBy.userId.platform);
                        res.body.invokedBy.userId.should.have.property('email');
                        res.body.invokedBy.userId.email.should.be.equal(otherCommandobj.invokedBy.userId.email);
                        res.body.should.have.property('commandAttributes');
                    }).then(async () => {
                        await agent.get(`/auth/commands?email=${admin1.email}&platform=${admin1.platform}`)
                            .set('Cookie', usersCookies[admin1.email])
                            .send()
                            .then((res) => {
                                res.body.should.be.a('array');
                                res.body.should.have.lengthOf(1);
                                done();
                            })
                    });
            }).catch((error) => {
                // Handle any errors
                done(error);
            });

    });

});