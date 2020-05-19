import House from "../Models/House.js";
import store from "../store.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/houses",
  timeout: 15000,
});

class HouseService {
  constructor() {
    this.getHouses();
  }

  getHouses() {
    _api
      .get()
      .then((res) => {
        let newHouses = res.data.data.map((houseData) => new House(houseData));
        store.commit("houses", newHouses);
        console.log(store.State.houses);
      })
      .catch((err) => console.error(err));
  }

  create(newHouseObj) {
    _api
      .post("", newHouseObj)
      .then((res) => {
        console.log(res);
        this.getHouses();
      })
      .catch((err) => console.error(err));
  }

  delete(houseId) {
    _api
      .delete(houseId)
      .then((res) => {
        console.log(res.data);
        this.getHouses();
      })
      .catch((err) => console.error(err));
  }
}

const HOUSESERVICE = new HouseService();
export default HOUSESERVICE;
