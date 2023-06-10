import App from "../app";
import ShopsHome from "./shopsHome";

class OwnShops extends ShopsHome {
    constructor(props) {
        super(props);
        this.apiAfterPageString = '/' + App.getCurrentUserStatic().getUsername();
    }
}

export default OwnShops;