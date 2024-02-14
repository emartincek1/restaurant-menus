const { Restaurant } = require("./Restaurant");
const { Menu } = require("./Menu");
const { Item } = require("./Item");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Item.belongsToMany(Menu, { through: "item_menu" });
Menu.belongsToMany(Item, { through: "item_menu" });

module.exports = { Restaurant, Menu, Item };
