Mailer = new Mongo.Collection('mailer');

Mailer.allow({
    insert: function () {
        return (this.userId ? true : false);
}
});