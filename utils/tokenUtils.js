const crypto = require('crypto')

exports.createResetToken = function(){
  const resetToken = crypto
    .randomBytes(32)
    .toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}
