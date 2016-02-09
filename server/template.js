Meteor.publish("mail_templates",function(){
  return Templates.find({});
});
Meteor.methods({
  loadTemplate : (fileName)=>{
    return Assets.getText("mail_templates/"+fileName);
  }
});
