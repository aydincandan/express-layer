const gereken = "v18.20.4"

// if (process.version != gereken) {
//     console.log("Yanlis versiyon " + process.version + " devrede", 'Lütfen nvm use', gereken, "yap")
//     process.exit(0) // Daha esnek sürüm kontrolü için https://chatgpt.com/share/67751b55-a924-8011-8472-9473b722fb18
//   }

const ExpressLayer = require('./express-layer')

module.exports.parametre = ExpressLayer
