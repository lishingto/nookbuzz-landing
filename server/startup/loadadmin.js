Meteor.startup(function () {
    
    //TODO: Please move to conf
    process.env.MAIL_URL = "smtp://postmaster%40sandbox8920ab3fec81462ebb68fbd58e9ad354.mailgun.org:" + encodeURIComponent("2fe837b05c76c589477933c45e69466f") + "@smtp.mailgun.org:587";
    if(Meteor.users.find().count() === 0){
      Accounts.createUser({
        'username':'admin-root',
          'password': 'NB L5 Access'
      });  
    } 
});
