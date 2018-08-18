Template.dashboard.helpers({
  showRateWarning: function () {
    let projects = Projects.find( { hourlyRate: { $exists: false } } ).fetch()
    return !(_.isEmpty(projects))
  },
  projectsPath: function () {
    return Router.path("projects");
  },
  getTotalWork: function () {
    let projects = Projects.find( { hourlyRate: { $exists: true } } ).fetch()
    if (_.isEmpty(projects)) {
      return '00:00'
    } else {
      let totalSeconds = _.map(projects, function (project) {
        return project.totalSeconds
      })
      let secondsSum = totalSeconds.reduce(function(a, b) { return a + b; });
      let duration = moment.duration(secondsSum, 'seconds');
      let hours = duration.hours();
      if (hours.toString().length === 1) {
        hours = '0' + hours;
      }
      let minutes = duration.minutes();
      if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
      }
      return hours + ':' + minutes;
    }
  },
  getTotalRevenue: function () {
    let projects = Projects.find( { hourlyRate: { $exists: true } } ).fetch()
    if (_.isEmpty(projects)) {
      return '$0'
    } else {
      let totalRevenues = _.map(projects, function (project) {
        let secondlyWage = project.hourlyRate / 3600;
        let revenue = (project.totalSeconds * secondlyWage);
        return revenue
      })
      let revenuesSum = totalRevenues.reduce(function(a, b) { return a + b; });
      return '$' + revenuesSum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
  entries: function () {
    return Entries.find({}, {sort: {createdOn: -1}, limit: 5})
  },
  isEmpty: function (obj) {
    return _.isEmpty(obj.fetch());
  },
  entryRevenue: function () {
    let project = Projects.findOne(this.projectId);
    if (project.hourlyRate) {
      let secondlyWage = project.hourlyRate / 3600;
      return '$' + (this.totalSeconds * secondlyWage).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    } else {
      return 'Set Rate'
    }
  },
  entryTotalTime: function () {
    let duration = moment.duration(this.totalSeconds, 'seconds');
    let hours = duration.hours();
    if (hours.toString().length === 1) {
      hours = '0' + hours;
    }
    let minutes = duration.minutes();
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
  },
  projects: function () {
    return Projects.find( { hourlyRate: { $exists: false } } )
  },
  projectHourlyRate: function () {
    if (this.hourlyRate) {
      return '$'+ this.hourlyRate
    } else {
      return 'Click to set'
    }
  },
});

Template.dashboard.events({
  'click #openProjectRateModal': function () {
    if (this.projectId) {
      let project = Projects.findOne(this.projectId);
      Session.set('hourlyRateProject', project)
      $('#exampleModalLabel').text(project.name);
    } else {
      let project = Projects.findOne(this._id);
      Session.set('hourlyRateProject', project)
      $('#exampleModalLabel').text(project.name);
    }
  }
});
