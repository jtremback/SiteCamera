exports.black = 'rgba(17,17,17,1)'
exports.brand = 'rgba(252,204,50,1)'

exports.setAlpha = function (color, alpha) {
  return color.replace(/(rgba\(\d*,\d*,\d*,)(.*)(\))/, `$1${alpha}$3`)
}
