import { JSDOM } from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

// EXERCICE 1 : SCREENSHOT
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales)');
//     await page.screenshot({ path: 'wiki.png' });

//     await browser.close();
// })();

// EXERCICE 2 : RECUPERATION DE DONNEES
// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales)');

// const datas = await page.$$eval('table tr', rangs => {
//     return Array.from(rangs, rang => {
//         const colonnes = rang.querySelectorAll('td');
//         return Array.from(colonnes, colonne => colonne.innerText);
//     });
// });

// // console.log(datas);

// let table = [];
// for (let i = 2; i < 28; i++) {
//     table.push([datas[i][0], datas[i][3]]);
// }

// // console.log(table);

// for (let i = 0; i < 26; i++) {
//     let nom = table[i][0];
//     if (nom.includes('\n')) {
//         nom = nom.replace('\n', ' – ')
//         nom = nom.replace('(', '');
//         nom = nom.replace(')', '');
//         if (nom.includes(',')) {
//             nom = nom.replace(',', ' -')
//             if (nom.includes(',')) {
//                 nom = nom.replace(',', ' –')
//             }
//         }
//     }

//     table[i][0] = nom;
//     table[i][1] = table[i][1].replace(/\s/g, ''); // Supprime les espaces des nombres
//     table[i][1] = parseInt(table[i][1]) // Transforme en integer
// }

// console.log('Voici tous les noms de cantons et les populations respectives :');
// console.log(table); // ou console.table(table)


// EXERCICE 2 - ECOMMERCE
(async () => {

    const star = String.fromCharCode(9733);
    const url = 'https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops';
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto(url);

        let productList = [];
        let div = await page.$$('div.thumbnail')

        for (let elem of div) {
            let product = await elem.$eval('.title', elem => elem.textContent);
            let price = await elem.$eval('.price', elem => elem.textContent);
            let nbStars = await elem.$eval('.ratings :nth-child(2)', elem => elem.getAttribute('data-rating'));
            nbStars = parseInt(nbStars);

            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < 4 && i < nbStars && i > 0) {
                    stars += ' ';
                }
                if (i < nbStars) {
                    stars += star;
                } else {
                    stars += String.fromCharCode(32) + String.fromCharCode(32);
                }
            }
            let productComplete = {
                produit: product,
                prix: price,
                etoiles: stars
            }
            productList.push(productComplete);
        }
        console.table(productList);
    } catch (error) {
        console.log('error', error);
    }
})();