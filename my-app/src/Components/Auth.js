class Auth {
    constructor() {
        this.authenticated = false;
    }

    setAuth(x) {
        this.authenticated = x
    }

    login(x) {
        this.authenticated = true;
        x();
    }

    logout(x) {
        this.authenticated = false;
        x();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();