Meteor.publish("subscribers", function () {
    if (this.userId) {
        return Subscribers.find({});
    }
});

Meteor.methods({
    subscribe: function (email) {
        var dup = Subscribers.findOne({
            email: email
        });
        if(dup){
          if (dup["isVerified"] == false) {
              sendEmail(dup['_id']);
          }else if(dup["isVerified"] == true){
              throw new Meteor.Error("Email Already Exists!");
          }
        }else{
          var addSub = Meteor.wrapAsync(function (email, cb) {
              Subscribers.insert({
                  email: email,
                  dateSubmitted: new Date(),
                  isVerified: false,
                  vcode: randomString(),
                  ucode: randomString(),
                  sentMail: []
              }, function (error, id) {
                  console.log(id);
                  cb(error, id);
              });
          });
          var id = addSub(email);
          console.log('Received Email ' + email);
          sendEmail(id);
        }
    },
    removeSub: function (id) {
        //Admin remove, only allow when there is user
        if (this.userId) {
            Subscribers.remove({
                _id: id
            });
        }
    },
    verify: function (email, vcode) {
        var sub = Subscribers.findOne({
            email: email
        });

        if (sub) {
            if (sub.isVerified === true) {
                return 'already';
            } else if (sub.vcode === vcode) {
                //verification success
                Subscribers.update({
                    _id: sub._id
                }, {
                    $set: {
                        isVerified: true
                    }
                });
                console.log('Verify ' + sub.email);
                return 'valid';
            } else {
                return 'fail';
            }
        } else {
            throw new Meteor.Error("Email not found");
        }
    },
    unsubscribe: function (email, ucode) {
        var sub = Subscribers.findOne({
            email: email
        });

        if (sub) {
            if (sub.ucode === ucode) {
                Subscribers.remove({
                    _id: sub._id
                });
                return 'done';
            } else {
                return 'fail';
            }
        } else {
            throw new Meteor.Error("Email not found");
        }
    }
});

function sendEmail(id) {
    var sub = Subscribers.findOne({
        _id: id
    });

    SSR.compileTemplate('regEmail', Assets.getText('mail_templates/reg-email.html'));

    var emailData = {
        verifyUrl: Meteor.settings.public.host + "/verify?email=" + sub.email + "&vcode=" + sub.vcode,
        unsubUrl: Meteor.settings.public.host + "/unsub?email=" + sub.email + "&ucode=" + sub.ucode
    };

    Email.send({
        to: sub.email,
        from: Meteor.settings.public.emailFrom,
        subject: "Nookbuzz thanks You for your interest!",
        html: SSR.render('regEmail', emailData)
    });
    console.log('Sent Email ' + sub.email);
}

function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}
