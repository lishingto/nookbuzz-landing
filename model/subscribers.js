Subscribers = new Mongo.Collection('subscribers');

Subscribers.allow({
    insert: function () {
        return true;
    }
});