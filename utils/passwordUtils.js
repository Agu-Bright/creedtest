const bcrypt = require('bcryptjs')
exports.comparePassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}
exports.PasswordChangedAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
       const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
       return JWTTimestamp<changedTimeStamp
  }
  return false;
};
