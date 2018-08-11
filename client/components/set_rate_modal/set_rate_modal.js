Template.setRateModal.helpers({
  getValue: function () {
    if (Session.get('hourlyRateProject') && Session.get('hourlyRateProject').hourlyRate) {
      return Session.get('hourlyRateProject').hourlyRate
    }
  }
});

Template.setRateModal.events({
  'submit #setRateForm': function () {
    event.preventDefault();
    let hourlyRate = event.target.hourlyRate.value;
    if (Session.get('hourlyRateProject')) {
      let project = Session.get('hourlyRateProject');
      Projects.update(project._id, {$set: {
        hourlyRate
      }})
      $('#setProjectRate').modal('hide')
      event.target.reset();
      sAlert.success('Hourly rate set successfully.');
    } else {
      $('#setProjectRate').modal('hide')
      event.target.reset();
      sAlert.error('Unexpected error. Try again.');
    }
    return false
  }
});
