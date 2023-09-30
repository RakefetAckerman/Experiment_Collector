/* 
 * This module exports different user objects used in requests.
 */

// Participant object representing user details for a participant
const Participant = {
    platform: 'Experiment',
    email: 'bob@test.com',
    role: 'Participant',
    username: 'Bob Mcflury',
    userDetails: {}
};

// Researcher object representing user details for a researcher
const Researcher = {
    platform: 'Builder',
    email: 'jill@test.org',
    role: 'Researcher',
    username: 'Jill Smith',
    userDetails: {
        password: 'Ss123456'
    }
};

// Admin1 object representing user details for an admin (1)
const Admin1 = {
    platform: 'Builder',
    email: 'admin1@test.org',
    role: 'Researcher',
    username: 'admin1',
    userDetails: {
        password: 'MyAdmin123'
    }
};

// Admin2 object representing user details for an admin (2)
const Admin2 = {
    platform: 'Builder',
    email: 'admin2@test.org',
    role: 'Researcher',
    username: 'admin2',
    userDetails: {
        password: 'MyAdmin123'
    }
};

// Exporting the user objects for use in other modules
export { Participant, Researcher, Admin1, Admin2 };
