import { csrfSync } from 'csrf-sync'

const csrf = csrfSync({
    getTokenFromRequest: (req) => {
        // If the incoming request is a urlencoded content type
        // then get the token from the body. (Express views)
        if (req.is('application/x-www-form-urlencoded')) {
            console.warn('FORM REQUEST')
            return req.body['_csrf']
        }
        // Otherwise use the header for all other requests (React app)
        console.warn('NOT FORM REQUEST USE')
        return req.headers['x-csrf-token']
    },
})
const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to generate, store, and get a CSRF token.
    getTokenFromRequest, // use this to retrieve the token submitted by a user
    getTokenFromState, // The default method for retrieving a token from state.
    storeTokenInState, // The default method for storing a token in state.
    revokeToken, // Revokes/deletes a token by calling storeTokenInState(undefined)
    csrfSynchronisedProtection, // This is the default CSRF protection middleware.,
} = csrf

export { csrf }
