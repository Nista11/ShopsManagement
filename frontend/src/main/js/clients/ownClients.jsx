import App from "../app";
import ClientsHome from "./clientsHome";

class OwnClients extends ClientsHome {
    constructor(props) {
        super(props);
        this.apiAfterPageString = '/' + App.getCurrentUserStatic().getUsername();
    }
}

export default OwnClients;