Template.clients.helpers({
  clients: function () {
    return Clients.find({}, {sort: {createdOn: -1}})
  },
  isEmpty: function (obj) {
    return _.isEmpty(obj.fetch());
  },
  totalWork: function () {
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
  billedWork: function () {
    let duration = moment.duration(this.billedSeconds, 'seconds');
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
  pendingWork: function () {
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
      return hours + ':' + minutes;
    } else {
      return '-'
    }
  },
  createdOn: function () {
    if (this.createdOn) {
      return Chronos.moment(this.createdOn).fromNow();
    } else {
      return '-'
    }
  },
});

Template.clients.events({

});
