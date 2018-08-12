// Define the template for Iron Router.
Router.configure({
  layoutTemplate: 'ApplicationLayout',
  onAfterAction: function(){
    $('.modal').modal('hide');
    $('.modal-backdrop').hide()
    $("#wrapper").removeClass("toggled");
  }
});
// Create the index route.
Router.map(function() {
  this.route('dashboard', {
    path: '/',
    to: 'main',
    name: 'dashboard',
    template: 'dashboard',
    onBeforeAction: function () {
      this.next();
    }
  });
  this.route('projects', {
    path: '/projects',
    to: 'main',
    name: 'projects',
    template: 'projects',
    onBeforeAction: function () {
      this.next();
    }
  });
  this.route('clients', {
    path: '/clients',
    to: 'main',
    name: 'clients',
    template: 'clients',
    onBeforeAction: function () {
      this.next();
    }
  });
  this.route('transactions', {
    path: '/transactions',
    to: 'main',
    name: 'transactions',
    template: 'transactions',
    onBeforeAction: function () {
      this.next();
    }
  });
  this.route('entries', {
    path: '/entries',
    to: 'main',
    name: 'entries',
    template: 'entries',
    onBeforeAction: function () {
      this.next();
    }
  });
});
