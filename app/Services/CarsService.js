import Car from "../Models/Car.js";
import store from "../store.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/cars",
  timeout: 15000,
});

class CarService {
  constructor() {
    console.log("hello from carService");
    this.getCars();
  }

  getCars() {
    _api
      .get()
      .then((res) => {
        let newCars = res.data.data.map((carData) => new Car(carData));
        store.commit("cars", newCars);
        console.log(store.State.cars);
      })
      .catch((err) => console.error(err));
  }

  create(newCarObj) {
    _api
      .post("", newCarObj)
      .then((res) => {
        console.log(res);
        this.getCars();
      })
      .catch((err) => console.error(err));
  }

  bid(carId) {
    let foundCar = store.State.cars.find((car) => car.id == carId);
    if (foundCar) {
      foundCar.price += 100;
      _api
        .put(carId, foundCar)
        .then((res) => {
          console.log(res);
          this.getCars();
        })
        .catch((err) => console.error(err));
    }
  }

  delete(carId) {
    _api
      .delete(carId)
      .then((res) => {
        console.log(res.data);
        this.getCars();
      })
      .catch((err) => console.error(err));
  }
}

const CARSERVICE = new CarService();
export default CARSERVICE;
