const handElems = [...document.querySelectorAll('div[class^="card "][class$=" up bottom"]')];
const hand = handElems.map(cardElem => cardElem.getAttribute("class").substr(5, 3).trim());
// e.g. hand = [s1, d2, h3, c10]