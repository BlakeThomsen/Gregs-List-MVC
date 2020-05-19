import _carService from "../Services/CarsService.js";
import _jobService from "../Services/JobsService.js";
import _store from "../store.js";

function _drawJobs() {
  let template = "";
  let jobs = _store.State.jobs;
  jobs.forEach((job) => (template += job.Template));
  document.getElementById("jobs").innerHTML = template;
}

export default class JobsController {
  constructor() {
    _store.subscribe("jobs", _drawJobs);
  }

  addJob(event) {
    event.preventDefault();
    let formData = event.target;
    let newJobObj = {
      company: formData.company.value,
      jobTitle: formData.jobTitle.value,
      hours: formData.hours.value,
      rate: formData.rate.value,
      description: formData.description.value,
    };
    _jobService.create(newJobObj);
    formData.reset();
  }

  delete(jobId) {
    _jobService.delete(jobId);
  }
}
