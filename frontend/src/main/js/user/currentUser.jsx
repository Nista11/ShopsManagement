import App from "../app";

class CurrentUser {
    static #instance = null;
    static #constructorAccess = false;
    #username = null;
    #accessToken = null;
    #roles = [];

    constructor() {
        if (!CurrentUser.#constructorAccess) {
            throw new TypeError("Construction of object unaccesable");
        }
        else {
            CurrentUser.#constructorAccess = false;
        }
    }

    getUsername() {
        return this.#username;
    }

    setUsername(username) {
        this.#username = username;
    }

    getAccessToken() {
        return this.#accessToken;
    }

    setAccessToken(accessToken) {
        this.#accessToken = accessToken;
    }

    isAuthenticated() {
        return this.#accessToken !== null;
    }

    async getId() {
        return await fetch(App.API_URL + '/api/users/' + this.#username + '/id')
                .then(response => response.json())
                .then(data => data.id);
    }

    setRoles(roles) {
        this.#roles = roles;
    }

    getRoles() {
        return this.#roles;
    }

    hasRole(role) {
        return this.#roles.includes(role);
    }

    hasAddAuthorization() {
        return this.isAuthenticated() && this.hasRole("REGULAR");
    }

    hasEditAuthorization(entityUsername) {
        return this.isAuthenticated() && 
        (this.hasRole("MODERATOR") || 
        (this.hasRole("REGULAR") && this.getUsername() === entityUsername));
    }

    hasSeeRoleAuthorization(username) {
        return this.isAuthenticated() &&
        (this.hasRole("ADMIN") ||
        this.hasRole("MODERATOR") && this.getUsername() === username);
    }

    static getInstance() {
        if (CurrentUser.#instance === null) {
            CurrentUser.#constructorAccess = true;
            CurrentUser.#instance = new CurrentUser();
        }
        return CurrentUser.#instance;
    }
}

export default CurrentUser;