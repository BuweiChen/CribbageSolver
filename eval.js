function sortCards(cardArr) {
    return cardArr.sort((a, b) => a.rank > b.rank ? 1 : a.rank < b.rank ? -1 : a.suit > b.suit ? 1 : -1);
}

function scorePairs(cardArr) {
    let lastRank;
    let score = 0;
    let numSame = 1;
    let scoreGuide = [0, 0, 2, 6, 12];
    for (let i = 0; i < cardArr.length; i++) {
        let currRank = cardArr[i].rank;
        if (!lastRank) {
            lastRank = currRank;
            continue;
        }
        if (currRank == lastRank) {
            numSame++;
        } else {
            score += scoreGuide[numSame];
            numSame = 1;
        }
        lastRank = currRank;
    }
    score += scoreGuide[numSame];
    return score;
}

function countWaysToSum(numbers, targetSum) {
    let dp = new Array(targetSum + 1).fill(0);
    dp[0] = 1;

    for (let number of numbers) {
        for (let sum = targetSum; sum >= number; sum--) {
            dp[sum] += dp[sum - number];
        }
    }

    return dp[targetSum];
}

function scoreFifteens(cardArr) {
    let ranks = cardArr.map(card => card.rank);
    let fifteensCnt = countWaysToSum(ranks, 15);
    return fifteensCnt * 2;
}

function countRunsOfN(numbers, n) {
    if (numbers.length < n) {
        return 0;
    }
    let tally = numbers.reduce((tally, number) => {
        tally[number]++;
        return tally;
    }, new Array(13).fill(0));
    let total = 0;
    for (let i = 0; i <= tally.length - n; i++) {
        let curr = 1;
        for (let j = i; j < i + n; j++) {
            curr *= tally[j];
        }
        total += curr;
    }
    return total;
}

function scoreRuns(cardArr) {
    cardArr = cardArr.map(card => card.rank);
    // we will take advantage of the fact that there is no runs of 6 or more.
    for (let i = 5; i >= 3; i--) {
        let cntRuns = countRunsOfN(cardArr, i);
        if (cntRuns > 0) {
            return cntRuns * i;
        }
    }
    return 0;
}

function scoreFlush(cardArr) {
    cardArr = cardArr.map(card => card.suit);
    console.log(cardArr);
    const suits = ["h", "s", "c", "d"];
    let cntFlush = 0;
    for (let suit of suits) {
        cntFlush = Math.max(cardArr.filter(card => card == suit).length, cntFlush);
    }
    return cntFlush >= 4 ? cntFlush : 0;
}

function checkScore(cardArr) {
    cardArr = sortCards(cardArr);
    let pairScore = scorePairs(cardArr);
    let fifteenScore = scoreFifteens(cardArr);
    let runScore = scoreRuns(cardArr);
    let flushScore = scoreFlush(cardArr);
    return pairScore + fifteenScore + runScore + flushScore;
}

export {
    sortCards, 
    scorePairs, 
    countWaysToSum, 
    scoreFifteens, 
    countRunsOfN, 
    scoreRuns, 
    scoreFlush, 
    checkScore
};