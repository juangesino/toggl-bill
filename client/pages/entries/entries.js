Template.entries.helpers({
  entries: function () {
    return Entries.find({}, {sort: {createdOn: -1}})
  },
  isEmpty: function (obj) {
    return _.isEmpty(obj.fetch());
  },
  startDate: function () {
    return moment(this.startDate).format('dddd, MMMM Do, hh:mm a');
  },
  endDate: function () {
    return moment(this.endDate).format('dddd, MMMM Do, hh:mm a');
  },
  totalTime: function () {
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
  createdOn: function () {
    if (this.createdOn) {
      return Chronos.moment(this.createdOn).fromNow();
    } else {
      return '-'
    }
  },
  revenue: function () {
    let project = Projects.findOne(this.projectId);
    if (project.hourlyRate) {
      let secondlyWage = project.hourlyRate / 3600;
      return '$' + (this.totalSeconds * secondlyWage).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    } else {
      return 'Set Rate'
    }
  }
});

Template.entries.events({
  'click #openProjectRateModal': function () {
    if (this.projectId) {
      let project = Projects.findOne(this.projectId);
      Session.set('hourlyRateProject', project)
      $('#exampleModalLabel').text(project.name);
    } else {
      sAlert.error('Unexpected error. Try again.');
      $('#setProjectRate').modal('hide')
    }
  }
});
