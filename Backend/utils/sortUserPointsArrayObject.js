async function sortObjectsByPointsDescending(objects) {
      objects.sort(function (a, b) {
            return b.points - a.points;
      });
}

// Create an array of objects
// const objects = [
      // { username: "Alice", points: 50 },
      // { username: "Bob", points: 100 },
      // { username: "Charlie", points: 75 },
// ];

// Sort the array of objects by points in descending order
// sortObjectsByPointsDescending(objects);

// The sorted array of objects
// console.log(objects);
// Output: [{ username: "Bob", points: 100 }, { username: "Charlie", points: 75 }, { username: "Alice", points: 50 }]


module.exports = sortObjectsByPointsDescending;