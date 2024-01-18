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