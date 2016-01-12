Meteor.startup(function () {
    
    //TODO: Please move to conf
    process.env.MAIL_URL = Meteor.settings.private.smtp;
    if(Meteor.users.find().count() === 0){
      Accounts.createUser({
        'username':'admin-root',
          'password': 'NB L5 Access'
      });  
    } 
});
