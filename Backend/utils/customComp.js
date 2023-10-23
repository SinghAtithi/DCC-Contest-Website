function streak(binaryString) {
  // console.log(binaryString);
  let maxStreak = 0;
  let currentStreak = 0;
  for (let i = 0; i < binaryString?.length; i++) {
    if (binaryString[i] == "1") {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  return maxStreak;
}

const customComp = (data1, data2) => 
{
    if (data1?.totalScore!==data2?.totalScore)
    {
        return data2?.totalScore-data1?.totalScore;
    }
    const streak1=streak(data1?.heatMap);
    const streak2=streak(data2?.heatMap);
    if (streak1!==streak2)
    {
        return streak2-streak1;
    }
    return data1?.thisDaySubmitTimeStamp-data2?.thisDaySubmitTimeStamp;
};
module.exports=customComp;
