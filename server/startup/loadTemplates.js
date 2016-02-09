Meteor.startup(function () {
  if(Templates.find().count() == 0){
    var fs = Meteor.npmRequire("fs");
    var readFile = Meteor.wrapAsync(function(cb){
      fs.readdir("./assets/app/mail_templates/", function(err, files){
        cb(err, files);
      });
    });
    var files = readFile();
    files.forEach(function(file){
      var fileContent = Assets.getText("mail_templates/"+file);
      Templates.insert({fileName : file, content : fileContent});
    });
  }
});
