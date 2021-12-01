
import KeyCloak from "keycloak-js"
import keyCloakConfig from "constants/keycloak.json"

const _kc = new KeyCloak(keyCloakConfig)

const initKeyCloak = (onInitCallback) => {
    _kc.init({
        onLoad: 'login-required',
        pkceMethod: 'S256'
    })
        .then((authenticated) => {
            onInitCallback();
        })
};

const doLogin = _kc.login

const doLogout = _kc.logout

const getToken = () => _kc.token

const updateToken = (successCb) => {
    _kc.updateToken(5)
        .then(successCb)
        .catch(doLogin)
}

const getUsername = () => _kc.tokenParsed?.preferred_username
const getFirstName = () => _kc.tokenParsed?.given_name
const isLoggedIn = () => !!_kc.token
const hasRole = (roles) => roles.some(role => _kc.hasRealmRole(role))

const authHeader = () => `Bearer ${getToken()}`

const AuthService = {
    initKeyCloak,
    isLoggedIn,
    authHeader,
    doLogin,
    doLogout,
    getToken,
    updateToken,
    getUsername,
    getFirstName,
    hasRole,
}

export default AuthService