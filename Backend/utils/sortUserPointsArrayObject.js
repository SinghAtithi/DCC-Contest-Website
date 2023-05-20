async function sortObjectsByPointsDescending(objects) {
      objects.sort(function (a, b) {
            return b.points - a.points;
      });
}

module.exports = sortObjectsByPointsDescending;