/**
 * User Service Tests
 * 
 * This file contains a suite of tests for the users' service.
 * These tests cover user registration, login, information retrieval, updates,
 * and deletions for different user roles.
 */

// Importing necessary libraries and modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { participant, researcher, admin1, admin2 } from '../../../src/utils/requestStructures/requestUsers.js';
import bcrypt from "bcrypt";

// Initializing Chai HTTP and setting up assertions
chai.use(chaiHttp);
chai.should();

// A dictionary to store cookies of JWT tokens mapped by user email
let usersCookies = {}

describe('User Service Tests', () => {
    /**
     * Defining hooks beforeEach and afterEach
     */


    /**
     * This function runs before each test, it registers and logs in an admin user.
     * @name beforeEach Registering and logining in ad admin
     * @function
     */
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
                        usersCookies[admin1.email] = res.headers['set-cookie']; // Update the JWT token within the users cookie dictionary
                        done();
                    });
            });
    });

    /**
     * This function runs after each test to clear the database.
     * @function
     * @name afterEach
     * @param {function} done - Callback function to signal completion.
     */
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

    /**
     * Registers a new researcher and checks if the registration was successful.
     * @note This test case apply also to an Admin role.
     * @function
     * @name it
     */
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

    /**
     * Attempts to register a Researcher without a password, and checks if the server returns a 400 error.
     * @note This test case apply also to an Admin role.
     * @function
     * @name it
     */
    it('should prevent registration of a Researcher because of missing password property in userDetails', (done) => {
        const newReseacher = { ...researcher };
        newReseacher.userDetails = { ...researcher.userDetails };
        delete newReseacher.userDetails.password;
        chai.request(server)
            .post('/users/register')
            .send(newReseacher)
            .end((err, res) => {
                res.should.have.status(400);
                chai.request(server)
                    .get(`/auth/users/${admin1.email}/${admin1.platform}`)
                    .set('Cookie', usersCookies[admin1.email])
                    .send()
                    .end((err, res) => {
                        res.body.should.be.a('array');
                        const userArr = res.body;
                        userArr.should.have.lengthOf(1);
                        done();
                    });
            });
    });

    /**
     * Registers a researcher twice and checks if the second registration assigns a JWT token without recreating the user.
     * @note This test case apply also to an Admin role.
     * @function
     * @name it
     */
    it('should register a Researcher, and in the second registration it should assign a JWT token to it and not recreate it', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .then(res => {
                res.should.have.status(201);
                return chai.request(server)
                    .post('/users/register')
                    .send(researcher);
            }).then((res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.headers.should.have.property('set-cookie');
                return chai.request(server)
                    .get(`/auth/users/${admin1.email}/${admin1.platform}`)
                    .set('Cookie', usersCookies[admin1.email])
                    .send();
            }).then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                const userArr = res.body;
                userArr.should.have.lengthOf(2);
                done();
            });
    });

    /**
     * Registers a new participant and checks if the registration was successful.
     * @function
     * @name it
     */
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

    /**
     * Attempts to register a participant twice and checks if the server returns an existing participant.
     * @function
     * @name it
     */
    it('should not recreate a new Participant, should return an existing Participant', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(participant)
            .then(res => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.userId.email.should.equal(participant.email);
                return res;
            })
            .then((res) => {
                return chai.request(server)
                    .post('/users/register')
                    .send(participant)
                    .end((err, anotherRes) => {
                        anotherRes.should.have.status(201);
                        anotherRes.body.should.be.a('object');
                        anotherRes.body.should.have.property('userId');
                        anotherRes.body.userId.email.should.equal(res.body.userId.email);
                    });
            })
            .then(() => {
                chai.request(server)
                    .get(`/auth/users/${admin1.email}/${admin1.platform}`)
                    .set('Cookie', usersCookies[admin1.email])
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        const userArr = res.body;
                        userArr.should.have.lengthOf(2);
                        done();
                    });
            });
    });

    /**
     * Attempts to register a user with missing email and platform and checks if the server returns a 400 error.
     * @note This test case apply also to all roles.
     * @function
     * @name it
     */
    it('should not register a user, missing name of platform and email or some of them', (done) => {
        const newReseacher = { ...researcher };
        newReseacher.email = '';
        newReseacher.platform = '';
        chai.request(server)
            .post('/users/register')
            .send(newReseacher)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    /**
     * Registers a researcher, then attempts to log in and checks if the password is encrypted.
     * @note This test case apply also to an Admin role.
     * @function
     * @name it
     */
    it('should successful login a Reseacher after registration', (done) => {
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
                        res.body.userDetails.should.have.a.property('password');
                        res.body.userDetails.password.should.not.be.equal(researcher.userDetails.password);
                        done();
                    });
            });
    });

    /**
     * Registers a researcher, then attempts to log in twice and checks if the JWT token has cahnged.
     * @note This test case apply also to an Admin role.
     * @function
     * @name it
     */
    it('should not change JWT token when Participant login twice', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .then((res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                return new Promise((resolve) => {
                    chai.request(server)
                        .post('/users/login')
                        .send(researcher)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.a.property('userDetails');
                            res.body.userDetails.should.have.a.property('password');
                            res.body.userDetails.password.should.not.be.equal(researcher.userDetails.password);
                            res.headers.should.have.property('set-cookie')
                            usersCookies[researcher.email] = res.headers['set-cookie']; // Update the JWT token within the users cookie dictionary
                            resolve();
                        });
                });
            })
            .then(() => {
                chai.request(server)
                    .post('/users/login')
                    .send(researcher)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.a.property('userId');
                        res.body.userId.should.have.a.property('email');
                        res.body.userId.email.should.be.equal(researcher.email);
                        res.headers.should.have.property('set-cookie')
                        const responseCookieArr = res.headers['set-cookie'];
                        responseCookieArr.should.have.lengthOf(1);
                        responseCookieArr[0].should.be.equal(usersCookies[researcher.email][0]);
                        done();
                    });
            });
    });

    /**
     * This test case checks if a researcher cannot successfully log in after registration due to a missing password.
     * @note This test case apply also to an Admin role.
     * @function
     * @name it
     */
    it('should not make successful login to a Reseacher after registration (missing password)', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                const newReseacher = { ...researcher };
                newReseacher.userDetails = { ...researcher.userDetails };
                delete newReseacher.userDetails.password;
                chai.request(server)
                    .post('/users/login')
                    .send(newReseacher)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
    });

    /**
     * This test case checks if a researcher cannot successfully log in after registration due to an incorrect password.
     * @function
     * @name it
     */
    it('should not make successful login to a Reseacher after registration (incorrect password)', (done) => {
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                const newReseacher = { ...researcher };
                newReseacher.userDetails = { ...researcher.userDetails };
                newReseacher.userDetails.password = 'sS654321';
                chai.request(server)
                    .post('/users/login')
                    .send(newReseacher)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
    });

    /**
     * This test case checks if a user cannot successfully log in after registration because the user does not exist.
     * @function
     * @name it
     */
    it('should not make successful login to a user after registration (user does not exist)', (done) => {
        const newReseacher = { ...researcher };
        newReseacher.userDetails = { ...researcher.userDetails };
        newReseacher.email = 'someotheremail@test.org';
        chai.request(server)
            .post('/users/login')
            .send(newReseacher)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    /**
     * This test case checks if a user cannot successfully log in after registration because of incorrect credentials.
     * @function
     * @name it
     */
    it('should not make successful login to a user after registration (user credentials are wrong)', (done) => {
        const newReseacher = { ...researcher };
        newReseacher.userDetails = { ...researcher.userDetails };
        newReseacher.email = '';
        newReseacher.email = '';
        chai.request(server)
            .post('/users/login')
            .send(newReseacher)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    /**
     * This test case checks if a participant is prevented from using the auth route.
     * @function
     * @name it
     */
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

    /**
    * This test case checks if a user (including all roles) can update their username and user details, but not email, platform, or roles.
    * @note It applies to all users, users annot update email address, kind of their platform, or roles only userDetails and username.
    * @function
    * @name it
    */
    it('should update user information', (done) => {
        const updatedUserData = {
            username: 'newUsername',
            userDetails: {
                password: 'newpassword',
                additionalKey: 9.90
            }
        };
        chai.request(server)
            .post('/users/register')
            .send(researcher)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                const updatedReseacher = {
                    ...researcher,
                    ...updatedUserData
                };
                updatedReseacher.userDetails = {
                    ...researcher.userDetails,
                    ...updatedUserData.userDetails
                };
                chai.request(server)
                    .put(`/users/${updatedReseacher.email}/${updatedReseacher.platform}`)
                    .send(updatedReseacher)
                    .then(res => {
                        res.should.have.status(200);
                    })
                    .then(() => {
                        chai.request(server)
                            .post('/users/login')
                            .send(updatedReseacher)
                            .end(async (err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.userId.email.should.be.equal(researcher.email);
                                res.body.userId.platform.should.be.equal(researcher.platform);
                                const isMatch = await bcrypt.compare(updatedReseacher.userDetails.password, res.body.userDetails.password); // Decrypting the password for comparison
                                isMatch.should.be.equal(true);
                                res.body.username.should.be.equal(updatedReseacher.username);
                                done();
                            });
                    });
            });
    });

    /**
     * This test case checks if user information cannot be updated if the user is not found.
     * @function
     * @name it
     */
    it('should not update user information (user does not found)', (done) => {
        const updatedReseacher = {
            ...researcher,
        }
        updatedReseacher.email = 'otheremail@test.org';
        updatedReseacher.platform = 'Experiment';

        chai.request(server)
            .put('/users/register')
            .send(researcher)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    /**
     * This test case verifies that only admins are allowed to retrieve information for all users.
     * @note This test case apply only to Admin role.
     * @function
     * @name it
     */
    it('should get all users information', (done) => {
        const usersArr = [researcher, participant, admin2];

        // Using Promise.all to wait for all requests to complete
        Promise.all(usersArr.map((user) => {
            return new Promise((resolve) => {
                chai.request(server)
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
        }))
            .then(() => {
                chai.request(server)
                    .get(`/users/${admin1.email}/${admin1.platform}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.should.have.lengthOf(4);
                        done();
                    });
            })
            .catch((error) => {
                done(error);
            });
    });


    /**
     * This test case verifies that non-admin users (including participants) cannot retrieve information for all users.
     * @note This test case applies also to Participant
     * @function
     * @name it
     */
    it('should fail to get all users information because of user role', (done) => {
        const usersArr = [researcher, participant, admin2];

        // Using Promise.all to wait for all requests to complete
        Promise.all(usersArr.map((user) => {
            return new Promise((resolve) => {
                chai.request(server)
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
        }))
            .then(() => {
                chai.request(server)
                    .get(`/users/${researcher.email}/${researcher.platform}`)
                    .end((err, res) => {
                        res.should.have.status(403);
                        done();
                    });
            })
            .catch((error) => {
                done(error);
            });
    });

    /**
     * This test case verifies that an admin can delete all users.
     * @function
     * @name it
     */
    it('should delete all users', (done) => {
        const usersArr = [researcher, participant, admin2];

        Promise.all(usersArr.map((user) => {
            return new Promise((resolve) => {
                chai.request(server)
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
            })
        }))
            .then(() => {
                const res = chai.request(server)
                    .delete(`/users/${admin2.email}/${admin2.platform}`);
                res.should.have.status(200);
                res.should.have.property('text');
                res.text.should.have.property('deletedCount');
                res.text.deletedCount.should.be.equal(usersArr.length + 1);
                usersCookies = {}; // Deleting cookies in case there are some
            });

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

    /**
     * This test case verifies that non-admin users (including participants) cannot delete all users.
     * @function
     * @name it
     */
    it('should not delete all users (user role is not Admin)', (done) => {
        const usersArr = [researcher, participant, admin2];

        Promise.all(usersArr.map((user) => {
            return new Promise((resolve) => {
                chai.request(server)
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
            })
        }))
            .then(() => {
                chai.request(server)
                    .delete(`/users/${researcher.email}/${researcher.platform}`)
                    .end((err, res) => {
                        res.should.have.status(403);
                        done();
                    });
            });
    });

});
