import App from "../app";
import CourierHome from "./couriersHome";

class OwnCouriers extends CourierHome {
    constructor(props) {
        super(props);
        this.apiAfterPageString = '/' + App.getCurrentUserStatic().getUsername();
    }
}

export default OwnCouriers;