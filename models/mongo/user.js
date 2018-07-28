var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function () {
    var userSchema = new Schema({
        first_name: String,
        last_name: String,
        email: String,
        facebook_id: String,
        twitter_id: String,
        google_id: String,
        profile_img: String,
        phone: String,
        birthday: String,
        gender: String,
        country: String,
        zip_code: Number,
        pwd: String,
        slt: String,
        account_type: String,
        active_date: Date,
        send_mail: String
    });
    userSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    userSchema.methods.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.pwd);
    };
    mongoose.model('user', userSchema);
};