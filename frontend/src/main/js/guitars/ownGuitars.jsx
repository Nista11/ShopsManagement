import App from "../app";
import GuitarsHome from "./guitarsHome";

class OwnGuitars extends GuitarsHome {
    constructor(props) {
        super(props);
        this.apiAfterPageString = '/' + App.getCurrentUserStatic().getUsername();
    }
}

export default OwnGuitars;