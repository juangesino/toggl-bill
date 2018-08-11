// Define the template for Iron Router.
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// Create the index route.
Router.map(function() {
  this.route('home', {
    path: '/',
    to: 'main',
    name: 'home',
    template: 'home',
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
