Meteor.publish("mailer", function () {
    if (this.userId) {
        return Mailer.find({});
    }
});

Meteor.methods({
    createMail: function (subject, htmlBody) {
        if (this.userId) {
            Mailer.insert({
                subject: subject,
                htmlBody: htmlBody,
                authorId: this.userId,
                dateCreated: new Date(),
                lastMailed: null
            });
        }
    },
    saveMail: function (mailId, newSubject, newHtmlBody) {
        if (this.userId) {
            Mailer.update({
                _id: mailId
            }, {
                $set: {
                    subject: newSubject,
                    htmlBody: newHtmlBody
                }
            });
        }
    },
    sendMailer: function (mailId) {
        var mail = Mailer.findOne({
            _id: mailId
        });

        var subs = Subscribers.find({
            isVerified: true
        }).fetch();

        if (mail) {

            //gather receipients
            var sendList = [];
            for (var s in subs) {
                sendList.push(subs[s].email);
            }

            //Render email
            SSR.compileTemplate('custEmail', mail.htmlBody);

            //Send out!
            Email.send({
                from: Meteor.settings.public.emailFrom,
                bcc: sendList,
                subject: mail.subject,
                html: SSR.render('custEmail')
            });

            //Update Records
            Mailer.update({
                _id: mail._id
            }, {
                $set: {
                    lastMailed: new Date()
                }
            });

            Subscribers.update({
                isVerified: true
            }, {
                $push: {
                    sentMail: {
                        mailId: mail._id,
                        sentDate: new Date()
                    }
                }
            }, {
                multi: true
            });

            console.log("Mass Mail " + mail.subject);
        } else {
            throw new Meteor.Error("No such mail found. ID:" + mailId);
        }
    }
});