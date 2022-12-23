const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { TokenError } = require("./error.js");
const serviceAccount = require("./service-account.json");

initializeApp({
    credential: cert(serviceAccount)
});


function extractUserDetails(token){
    return getAuth()
        .verifyIdToken(token)
        .then((decodedToken)=>{
            return {uid: decodedToken.uid};
        })
        .catch((error) => {
            throw new TokenError(error.message);
        });
}

exports.extractUserDetails = extractUserDetails;