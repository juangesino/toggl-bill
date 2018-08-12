Template.projects.helpers({
  projects: function () {
    return Projects.find({}, {sort: {createdOn: -1}})
  },
  isEmpty: function (obj) {
    return _.isEmpty(obj.fetch());
  },
  totalWork: function () {
    let revenue = '';
    if (this.hourlyRate) {
      let secondlyWage = this.hourlyRate / 3600;
      revenue = '$' + (this.totalSeconds * secondlyWage) + ' - ';
    }
    let duration = moment.duration(this.totalSeconds, 'seconds');
    let hours = duration.hours();
    if (hours.toString().length === 1) {
      hours = '0' + hours;
    }
    let minutes = duration.minutes();
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes;
    }
    return revenue + hours + ':' + minutes;
  },
  billedWork: function () {
    let billed = '';
    if (this.hourlyRate) {
      let secondlyWage = this.hourlyRate / 3600;
      billed = '$' + (this.billedSeconds * secondlyWage) + ' - ';
    }
    let duration = moment.duration(this.billedSeconds, 'seconds');
    let hours = duration.hours();
    if (hours.toString().length === 1) {
      hours = '0' + hours;
    }
    let minutes = duration.minutes();
    if (minutes.toString().length === 1) {
      minutes = '0' + minutes;
    }
    return billed + hours + ':' + minutes;
  },
  pendingWork: function () {
    let pending = '';
    if (this.hourlyRate) {
      let secondlyWage = this.hourlyRate / 3600;
      pending = '$' + ((this.totalSeconds - this.billedSeconds) * secondlyWage) + ' - ';
    }
    if (this.totalSeconds >= this.billedSeconds) {
      let duration = moment.duration((this.totalSeconds - this.billedSeconds), 'seconds');
      let hours = duration.hours();
      if (hours.toString().length === 1) {
        hours = '0' + hours;
      }
      let minutes = duration.minutes();
      if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
      }
      return pending + hours + ':' + minutes;
    } else {
      return '-'
    }
  },
  hourlyRate: function () {
    if (this.hourlyRate) {
      return '$'+ this.hourlyRate
    } else {
      return 'Click to set'
    }
  },
  createdOn: function () {
    if (this.createdOn) {
      return Chronos.moment(this.createdOn).fromNow();
    } else {
      return '-'
    }
  },
  lastActivityOn: function () {
    if (this.lastActivityOn) {
      return Chronos.moment(this.lastActivityOn).fromNow();
    } else {
      return '-'
    }
  }
});

Template.projects.events({
  'click #openProjectRateModal': function () {
    Session.set('hourlyRateProject', this)
    $('#exampleModalLabel').text(this.name);
  }
});
