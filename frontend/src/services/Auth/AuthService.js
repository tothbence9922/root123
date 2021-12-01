
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

const getUsername = () => _kc.tokenParsed?.preferred_username
const getFirstName = () => _kc.tokenParsed?.given_name
const tokenParsed = () => _kc.tokenParsed
const isLoggedIn = () => !!_kc.token
const hasRole = (role) => _kc.tokenParsed.realm_access.roles.includes(role)

const authHeader = () => `Bearer ${getToken()}`

const AuthService = {
    initKeyCloak,
    isLoggedIn,
    authHeader,
    doLogin,
    doLogout,
    getToken,
    getUsername,
    getFirstName,
    hasRole,
    tokenParsed
}

export default AuthService