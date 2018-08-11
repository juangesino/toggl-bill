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
});

Template.transactions.events({

});
