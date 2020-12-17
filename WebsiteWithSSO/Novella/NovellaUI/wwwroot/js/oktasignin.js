var oktaSignIn = new OktaSignIn({
        baseUrl: 'https://dev-8780082.okta.com',
        clientId: '0oa2de0zcc3tyVDIE5d6',
        authParams: {
            issuer: 'https://dev-8780082.okta.com/oauth2/default',
            responseType: ['token', 'id_token'],
            redirectUri: 'https://localhost:5001',
            display: 'page'
        }
    });


oktaSignIn.renderEl(
    // Assumes there is an empty element on the page with an id of 'osw-container'
    { el: '#widget-container' },

    function success(res) {
        if (res.status === 'SUCCESS') {
            if (res.type === 'SESSION_STEP_UP') {
                // Session step up response
                // If the widget is not configured for OIDC and the authentication type is SESSION_STEP_UP,
                // the response will contain user metadata and a stepUp object with the url of the resource
                // and a 'finish' function to navigate to that url
                console.log(res.user);
                console.log('Target resource url: ' + res.stepUp.url);
                res.stepUp.finish();
            } else {
                // If the widget is not configured for OIDC, the response will contain
                // user metadata and a sessionToken that can be converted to an Okta
                // session cookie:
                console.log(res.user);
                // BUG: session is undefined so setCookieAndRedirect fails.  
                res.session.setCookieAndRedirect('https://localhost:5001');
            }
            return;
        }

    }
);