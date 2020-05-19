import Job from "../Models/Job.js";
import store from "../store.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "http://bcw-sandbox.herokuapp.com/api/jobs",
  timeout: 15000,
});

class JobService {
  constructor() {
    this.getJobs();
  }

  getJobs() {
    _api
      .get()
      .then((res) => {
        // console.log(res.data.data);
        let newJobs = res.data.data.map((jobData) => new Job(jobData));
        // console.log(newCars)
        store.commit("jobs", newJobs);
        console.log(store.State.jobs);
      })
      .catch((err) => console.error(err));
  }

  create(newJobObj) {
    _api
      .post("", newJobObj)
      .then((res) => {
        console.log(res);
        this.getJobs();
      })
      .catch((err) => console.error(err));
  }

  delete(jobId) {
    _api
      .delete(jobId)
      .then((res) => {
        console.log(res.data);
        this.getJobs();
      })
      .catch((err) => console.error(err));
  }
}

const JOBSERVICE = new JobService();
export default JOBSERVICE;
