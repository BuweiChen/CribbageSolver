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

function checkScore(cardArr) {
    cardArr = sortCards(cardArr);
    pairScore = scorePairs(cardArr);
    
}