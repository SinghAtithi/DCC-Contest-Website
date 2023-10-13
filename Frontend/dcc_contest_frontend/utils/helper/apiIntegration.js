const base_url = "http://localhost:5000";
export async function getQuestion() {
  const res = await fetch(`${base_url}/21days/getQuestion`);
  try {
    if (!res.ok) {
      throw new Error("Failed getting Question");
    }

    const response = await res.json();

    if (response.message === "OKAY") {
      return response.questions;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.log(error.message);
  }
}
export async function getHeatMapPoints(userName, name) {
  const res = await fetch(`${base_url}/userDetails`, {
    method: "POST",
    body: JSON.stringify({ name, userName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    if (!res.ok) {
      throw new Error("Failed to fetch points");
    }
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getLeaderboardData() {
  try {
    const res = await fetch(`${base_url}/leaderBoard`);
    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export function streak(binaryString) {
  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[i] === "1") {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }

    return maxStreak;
  }
}
export function codeforcesName(url) {
  const parts = url.split("/");
  const username = parts.pop();
  return username;
}
