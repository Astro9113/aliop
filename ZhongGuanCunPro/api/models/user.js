import mongoose from 'mongoose';
import bCrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true
  },

  password: {
    type: String
  },

  username: {
    type: String,
    unique: true
  },

  userType: {
    type:String,
    enum: ['customer', 'admin']
  },

  ethAddress: {
    type: String,
    lowercase:true
  },

  ethPrK: {
    type: String
  },

  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'transaction'
  }]
});

userSchema.pre('save', function hashPassword(next) {
  const user = this;

  bCrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bCrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePass(canditatePassword, callback) {
  bCrypt.compare(canditatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

export default mongoose.model('user', userSchema);
