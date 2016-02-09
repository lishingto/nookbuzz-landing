angular.module('nblanding').directive('mailerForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/mailerForm/mailer-form.html',
        controllerAs: 'mailerForm',
        controller: mailerFormCtrl
    }
});

function mailerFormCtrl($scope, $reactive, $state, $stateParams, $q) {
    $reactive(this).attach($scope);

    this.mailerId = $stateParams.mailerId;

    if (this.mailerId) {
        this.subscribe("mailer");

        //Edit Mode
        this.helpers({
            mailObj: () => {
                return Mailer.findOne({
                    _id: this.mailerId
                });
            }
        });

        this.save = function () {
            Meteor.call('saveMail', this.mailObj._id, this.mailObj.subject, this.mailObj.htmlBody, function (error, result) {
                bootbox.alert("Mail Updated", function () {
                    $state.go('admin.mailer');
                });
            });
        }
    } else {
        //Create mode
        this.mailObj = {
            subject: "",
            htmlBody: ""
        }

        this.save = function () {
            Meteor.call('createMail', this.mailObj.subject, this.mailObj.htmlBody, function (error, result) {
                $state.go('admin.mailer');
            });
        }
    }
    //Template selection
    this.subscribe("mail_templates");
    this.helpers({
      templates : ()=>{
        return Templates.find({});
      }
    });

    this.changeTemplate = ()=>{
      var templateFind = Templates.findOne({fileName : this.templateSelection});
      this.mailObj.htmlBody = templateFind['content'];
      $(window).trigger('resize');
    };

    this.send = function () {
        var mailToSend = this.mailObj;

        if (!mailToSend || mailToSend.subject.length < 1 || mailToSend.htmlBody.length < 1) {
            bootbox.alert("No Mail to Send, please add a subject and body!");
            return;
        }

        bootbox.confirm("Are you sure you wish to send this mail?", function (isOk) {
            if (isOk) {
                Meteor.call('sendMailer', mailToSend._id, function (error, result) {
                    if (!error) {
                        bootbox.alert("Mail Sent");
                    } else {
                        bootbox.alert(error);
                    }
                });
            }
        });
    }
}
