Template.leftNav.helpers({
  getClass: function (route_path) {
    if (route_path == Iron.Location.get().path) {
      return 'active';
    } else {
      return '';
    }
  },
  dashboardPath: function () {
    return Router.path("dashboard");
  },
  projectsPath: function () {
    return Router.path("projects");
  },
  clientsPath: function () {
    return Router.path("clients");
  },
  entriesPath: function () {
    return Router.path("entries");
  },
  transactionsPath: function () {
    return Router.path("transactions");
  },
});
