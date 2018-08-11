Router.route('/api/entries', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let rawEntry = this.request.body;
  let incomingEntry = {
    startDate: new Date(rawEntry.startDate),
    externalProjectId: rawEntry.externalProjectId,
    endDate: new Date(rawEntry.endDate),
    totalHours: parseFloat(rawEntry.totalHours),
    projectName: rawEntry.projectName,
    totalMinutes: parseFloat(rawEntry.totalMinutes),
    externalEntryId: rawEntry.externalEntryId,
    externalClientId: rawEntry.externalClientId,
    totalSeconds: parseFloat(rawEntry.duration),
    clientName: rawEntry.clientName,
    importedOn: new Date()
  };

  let project = Projects.findOne({externalProjectId: incomingEntry.externalProjectId});
  let client = Clients.findOne({externalClientId: incomingEntry.externalClientId});

  let clientId;
  let projectId;
  if (!client) {
    clientId = Clients.insert({
      name: incomingEntry.clientName,
      externalClientId: incomingEntry.externalClientId,
      createdOn: new Date(),
      totalSeconds: 0,
      billedSeconds: 0,
    });
    client = Clients.findOne(clientId);
  }
  if (!project) {
    projectId = Projects.insert({
      name: incomingEntry.projectName,
      externalProjectId: incomingEntry.externalProjectId,
      clientId,
      clientName: client.name,
      externalClientId: client.externalClientId,
      createdOn: new Date(),
      totalSeconds: 0,
      billedSeconds: 0
    });
    project = Projects.findOne(projectId);
  }

  _.extend(incomingEntry, {
    projectId: project._id,
    clientId: client._id,
  });
  let entry = Entries.insert(incomingEntry);

  Clients.update(client._id, {$inc: {
    totalSeconds: incomingEntry.totalSeconds,
  }, $set: {
    lastActivityOn: incomingEntry.endDate
  }})

  Projects.update(project._id, {$inc: {
    totalSeconds: incomingEntry.totalSeconds,
  }, $set: {
    lastActivityOn: incomingEntry.endDate
  }})


  this.response.end('');
}, {where: 'server'});
