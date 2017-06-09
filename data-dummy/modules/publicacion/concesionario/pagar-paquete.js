var faker = require("faker")
var fn    = require(process.cwd() + "/data-dummy/functions")

module.exports = {
    namePackage : ["Premiun", "Destacado", "Simple"][fn.randomNumberMinMax(0,2)],
    duration    : fn.randomNumberMinMax(1, 30) + " días",
    sheetModel  : "ilimitado",
    printedNews : faker.random.number(),
    onlineShop  : ["Incluido", ""][fn.randomNumberMinMax(0,1)],
    additional  : [
        "Texto Promocional",
        "Destaque en ficha 0KM",
        "2 post en facebook",
        "2 notas en el blog",
        "Destaque de concesionario.",
    ]
}
