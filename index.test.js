const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
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
});
