import axios from "axios";
import { func } from "prop-types";
import { BASE_URL } from "../../utils/constants"

const base_url = BASE_URL;
export async function getQuestion() {
  const url = `${base_url}/21days/getQuestion`;

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error; // Re-throw the error to propagate it further if needed
    });
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
  console.log(binaryString);
  let maxStreak = 0;
  let currentStreak = 0;
  for (let i = 0; i < binaryString?.length; i++) {
    if (binaryString[i] == '1') {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  return maxStreak;
}
export function codeforcesName(url) {
  const parts = url.split("/");
  const username = parts.pop();
  return username;
}
export function progressBar(binaryString) {
  let count = 0;
  for (let i = 0; i < binaryString?.length; i++) {
    if (binaryString[i] === "1") {
      count++;
    }
  }
  return count;
}
