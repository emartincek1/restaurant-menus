const { sequelize } = require("./db");
const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Restaurant", async () => {
    // TODO - write test
    const resturant1 = await Restaurant.create({
      name: "QuikTrip",
      location: "Tulsa",
      cuisine: "Snackle",
    });
    expect(resturant1).toEqual(
      expect.objectContaining({
        name: "QuikTrip",
        location: "Tulsa",
        cuisine: "Snackle",
      })
    );
  });

  test("can create a Menu", async () => {
    await sequelize.sync({ force: true });
    const menu1 = await Menu.create({ title: "Snackles" });
    expect(menu1).toEqual(expect.objectContaining({ title: "Snackles" }));
  });

  test("can find Restaurants", async () => {
    const resturant1 = await Restaurant.create({
      name: "QuikTrip",
      location: "Tulsa",
      cuisine: "Snackle",
    });
    const foundResturant = await Restaurant.findOne({
      where: { name: "QuikTrip" },
    });
    expect(foundResturant).toEqual(
      expect.objectContaining({
        name: "QuikTrip",
        location: "Tulsa",
        cuisine: "Snackle",
      })
    );
  });

  test("can find Menus", async () => {
    await sequelize.sync({ force: true });
    const menu1 = await Menu.create({ title: "Snackles" });
    const foundMenu = await Menu.findOne({ where: { title: "Snackles" } });
    expect(foundMenu).toEqual(expect.objectContaining({ title: "Snackles" }));
  });

  test("can delete Restaurants", async () => {
    const resturant1 = await Restaurant.create({
      name: "QuikTrip",
      location: "Tulsa",
      cuisine: "Snackle",
    });
    const foundResturant = await Restaurant.findOne({
      where: { name: "QuikTrip" },
    });
    const deletedMenu = await foundResturant.destroy();
    expect(deletedMenu).toEqual(
      expect.objectContaining({
        name: "QuikTrip",
        location: "Tulsa",
        cuisine: "Snackle",
      })
    );
  });

  test("can create a Item", async () => {
    // TODO - write test
    const item1 = await Item.create({
      name: "Pizza",
      image: "pizza.jpg",
      price: 2.99,
      vegetarian: false,
    });
    expect(item1).toEqual(
      expect.objectContaining({
        name: "Pizza",
        image: "pizza.jpg",
        price: 2.99,
        vegetarian: false,
      })
    );
  });

  test("Restaurant and Menu association", async () => {
    const resturant1 = await Restaurant.create({
      name: "QuikTrip",
      location: "Tulsa",
      cuisine: "Snackle",
    });
    const menu1 = await Menu.create({ title: "Snackles" });
    const menu2 = await Menu.create({ title: "GNGS" });
    await resturant1.addMenus([menu1, menu2]);
    const test = await resturant1.getMenus();
    expect(test.length).toBe(2);
    expect(test[0] instanceof Menu).toBe(true);
  });

  test("Menu and Item association", async () => {
    const item1 = await Item.create({
      name: "Pizza",
      image: "pizza.jpg",
      price: 2.99,
      vegetarian: false,
    });
    const item2 = await Item.create({
      name: "Hotdog",
      image: "Hotdog.jpg",
      price: 1.99,
      vegetarian: false,
    });
    const menu1 = await Menu.create({ title: "Snackles" });
    const menu2 = await Menu.create({ title: "GNGS" });
    await item1.addMenus([menu1, menu2]);
    const test = await item1.getMenus();
    expect(test.length).toBe(2);
    expect(test[0] instanceof Menu).toBe(true);
    await menu1.addItems([item1, item2]);
    const test2 = await menu1.getItems();
    expect(test2.length).toBe(2);
    expect(test2[0] instanceof Item).toBe(true);
  });

  test("Item Eager Loading", async () => {
    const item1 = await Item.create({
      name: "Pizza",
      image: "pizza.jpg",
      price: 2.99,
      vegetarian: false,
    });
    const menu1 = await Menu.create({ title: "Snackles" });
    const menu2 = await Menu.create({ title: "GNGS" });
    await item1.addMenus([menu1, menu2]);
    const items = await Item.findByPk(4, { include: Menu });
    console.log(items.Menus[0].title);
    expect(items.Menus[[0]].title).toBe("Snackles");
  });
});
