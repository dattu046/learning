const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { AuthenticationError, SignUpError, LoginError, TokenError } = require("./error.js");

/* TODO: Move this to environment variables and load this from the machine environment directly, 
alternatively store the secrets in the database and dynamically retrieve it using a secure store service*/

// Initialize Firebase Application and Auth service, since this is a nodejs module the object by defualt is singleton
const firebaseApplication = initializeApp(firebaseConfig);
const firebaseAuthenticationService = getAuth(firebaseApplication);

function createNewUser(email, password) {
    // Call the firebaseAPI to create a new user
    return createUserWithEmailAndPassword(firebaseAuthenticationService, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { user: user };
        })
        .catch((error) => {
            throw new SignUpError(error.message);
        });
}

function login(email, password) {
    // Call firebaseAPI to login
    return signInWithEmailAndPassword(firebaseAuthenticationService, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { user: user };
        })
        .catch((error) => {
            throw new LoginError(error.message);
        })
}

exports.createNewUser = createNewUser;
exports.login = login;