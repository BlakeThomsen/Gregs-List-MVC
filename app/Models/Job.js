export default class Job {
  constructor(data) {
    this.id = data._id;
    this.company = data.company;
    this.jobTitle = data.jobTitle;
    this.description = data.description || "No Description Provided";
    this.hours = data.hours;
    this.rate = data.rate;
  }

  get Template() {
    return /*html*/ `
      <div class="col-4">
                  <div class="card mb-2">
                      <div class="card-body">
                          <h4 class="card-title">Company: ${this.company} | Job Title: ${this.jobTitle} </h4>
                          <h5>Hours: ${this.hours}| Rate: ${this.rate} </h5>
                          <p class="card-text">${this.description}</p>
                          <button class="btn btn-danger" onclick="app.jobsController.delete('${this.id}')">
                                 Delete
                          </button>
                      </div>
                  </div>
              </div>`;
  }
}
