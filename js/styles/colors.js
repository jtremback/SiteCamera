exports.setAlpha = function (color, alpha) {
  return color.replace(/(rgba\(\d*,\d*,\d*,)(.*)(\))/, `$1${alpha}$3`)
}

exports.black = 'rgba(17,17,17,1)'
exports.brand = 'rgba(252,204,50,1)'
exports.softBlack = exports.setAlpha(exports.black, 0.85)
exports.gray = 'rgba(193,193,193,1)'
exports.button = 'rgba(0,122,255,1)'
