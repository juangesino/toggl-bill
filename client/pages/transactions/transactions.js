Template.transactions.helpers({
  transactions: function () {
    return Transactions.find({}, {sort: {createdOn: -1}})
  },
  isEmpty: function (obj) {
    return _.isEmpty(obj.fetch());
  },
  createdOn: function () {
    if (this.createdOn) {
      return Chronos.moment(this.createdOn).fromNow();
    } else {
      return '-'
    }
  },
  projects: function () {
    return Projects.find({ hourlyRate: { $exists: true } })
  },
  projectsPath: function () {
    return Router.path("projects");
  }
});

Template.transactions.events({
  'submit #addTransactionForm': function (event) {
    event.preventDefault();
    let projectId = event.target.projectId.value;
    let project = Projects.findOne(projectId);
    if (project && project.hourlyRate) {
      let amount = event.target.amount.value;
      let secondlyWage = project.hourlyRate / 3600;
      let billedSeconds = amount / secondlyWage
      let transactionId = Transactions.insert({
        projectId,
        projectName: project.name,
        clientName: project.clientName,
        clientId: project.clientId,
        amount,
        billedSeconds,
        createdOn: new Date()
      })
      Clients.update(project.clientId, {$inc: {
        billedSeconds: billedSeconds,
      }})
      Projects.update(project._id, {$inc: {
        billedSeconds: billedSeconds,
      }})
      sAlert.success('New payment added.');
    } else {
      sAlert.error('Error adding payment. Please try again.');
    }
    $('#addTransactionModal').modal('hide');
    // event.target.reset();
    return false
  },
});
