async function calculateElo(rankings, kFactor = 70) {
      const n = rankings.length;
      const expectedScores = new Array(n).fill(0);
      const newRankings = [];

      for (let i = 0; i < n; i++) {
            const rating = rankings[i].rating;
            let expectedScore = 0;
            for (let j = 0; j < n; j++) {
                  if (i !== j) {
                        const opponentRating = rankings[j].rating;
                        expectedScore += await _calculateExpectedScore(rating, opponentRating) / (n - 1);
                  }
            }
            expectedScores[i] = expectedScore;

            let actualScore = (n - rankings[i].standing) / (n - 1);
            const newRating = rating + kFactor * (actualScore - expectedScore);

            newRankings.push({
                  username: rankings[i].username,
                  rating: Math.round(newRating)
            });
      }

      return newRankings;
}

async function _calculateExpectedScore(playerRating, opponentRating) {
      return 1 / (1 + 10 ** ((opponentRating - playerRating) / 400));
}



module.exports = calculateElo;