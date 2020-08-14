const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test ("creates a new zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {name: "Susan", id: "ksdfowen23l"},
        zookeepers
    );
        expect(zookeeper.name).toBe("Susan");
        expect(zookeeper.id).toBe("ksdfowen23l");
        });

test ("filters by query", () => {
    const startingZookeepers = [
        {
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
          },
          {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
          },
          {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
          },
    ];

    const updatedZookeepers = filterByQuery({ name: "Isabella"}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
          },
          {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
          },
          {
            "id": "2",
            "name": "Isabella",
            "age": 67,
            "favoriteAnimal": "bear"
          }
    ];

    const result = findById("1", startingZookeepers);

    expect(result.name).toBe("Raksha");
});

test("Validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear"
    };

    const invalidZookeeper = {
        id: "2",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});