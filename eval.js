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

function getCombinations(arr, length) {
    function helper(start, combo) {
        if (combo.length === length) {
            combinations.push(combo);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            helper(i + 1, combo.concat(arr[i]));
        }
    }

    let combinations = [];
    helper(0, []);
    return combinations;
}

const handElems = [...document.querySelectorAll('div[class^="card "][class$=" up bottom"]')];
const hand = handElems.map(cardElem => cardElem.getAttribute("class").substring(5, 8).trim());
// e.g. hand = [s1, d2, h3, c10]

const handCards = hand.map(card => {
    let c = {
        rank: Number(card.substring(1)), 
        suit: card.substring(0, 1)
    }
    return c;
});

const anyFour = getCombinations(handCards, 4);
console.table(anyFour[0]);

// todo: take into account the turn card and crib

const bestHandToKeep = anyFour.reduce((best, cardHand) => {
    if (!best.cards[0]) {
        return {cards: cardHand, score: checkScore(cardHand)};
    } else {
        return checkScore(cardHand) > best.score ? {cards: cardHand, score: checkScore(cardHand)} : best;
    }
}, {cards: new Array(), score: 0});

console.table(bestHandToKeep.cards);
console.table(bestHandToKeep.score);