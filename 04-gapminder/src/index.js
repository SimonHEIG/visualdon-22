import * as d3 from 'd3'
import { max } from 'd3'

// Pour importer les données
// import file from '../data/data.csv'
import incomeData from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeData from '../data/life_expectancy_years.csv'
import populationData from '../data/population_total.csv'


// Récupère toutes les années
const annees = Object.keys(populationData[0])
// console.log(annees)

let converterSI = (array, variable, variableName) => {

    let convertedVariable = array.map(d => {
        // Trouver le format SI (M, B, k)
        let SI = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? d[variable.toString()].slice(-1) : d[variable.toString()];
        // Extraire la partie numérique
        let number = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? parseFloat(d[variable.toString()].slice(0, -1)) : d[variable.toString()];
        // Selon la valeur SI, multiplier par la puissance
        switch (SI) {
            case 'M': {
                return { "country": d.country, [variableName]: Math.pow(10, 6) * number };
                break;
            }
            case 'B': {
                return { "country": d.country, [variableName]: Math.pow(10, 9) * number };
                break;
            }
            case 'k': {
                return { "country": d.country, [variableName]: Math.pow(10, 3) * number };
                break;
            }
            default: {
                return { "country": d.country, [variableName]: number };
                break;
            }
        }
    })
    return convertedVariable;
};


let pop = [],
    income = [],
    life = [],
    dataCombined = [];

// Merge data
const mergeByCountry = (a1, a2, a3) => {
    let data = [];
    a1.map(itm => {
        let newObject = {
            ...a2.find((item) => (item.country === itm.country) && item),
            ...a3.find((item) => (item.country === itm.country) && item),
            ...itm
        }
        data.push(newObject);
    })
    return data;
}

annees.forEach(annee => {
    pop.push({ "annee": annee, "data": converterSI(populationData, annee, "pop") })
    income.push({ "annee": annee, "data": converterSI(incomeData, annee, "income") })
    life.push({ "annee": annee, "data": converterSI(lifeData, annee, "life") })
    const popAnnee = pop.filter(d => d.annee == annee).map(d => d.data)[0];
    const incomeAnnee = income.filter(d => d.annee == annee).map(d => d.data)[0];
    const lifeAnnee = life.filter(d => d.annee == annee).map(d => d.data)[0];
    dataCombined.push({ "annee": annee, "data": mergeByCountry(popAnnee, incomeAnnee, lifeAnnee) })
});
// console.log(dataCombined)

let allIcome2021 = []
dataCombined.forEach(annee => {
    if (annee.annee == '2021') {
        annee.data.forEach(pays => {
            allIcome2021.push({ 'country': pays.country, 'income': pays.income })
        })
    }
})
console.log(allIcome2021);
let allLife2021 = []
dataCombined.forEach(annee => {
    if (annee.annee == '2021') {
        annee.data.forEach(pays => {
            allLife2021.push({ 'country': pays.country, 'life': pays.life })
        })
    }
})
console.log(allLife2021);
let allPopulation2021 = []
dataCombined.forEach(annee => {
    if (annee.annee == '2021') {
        annee.data.forEach(pays => {
            allPopulation2021.push({ 'country': pays.country, 'pop': pays.pop })
        })
    }
})
console.log(allPopulation2021);

let maxIcome = 0
allIcome2021.forEach(pays => {
    if (pays.income > maxIcome) {
        maxIcome = pays.income
    }
})
console.log('max income : ' + maxIcome);

let maxLife = 0
allLife2021.forEach(pays => {
    if (pays.life > maxLife) {
        maxLife = pays.life
    }
})
console.log('max life : ' + maxLife);

let minPop = 1000000000000000
allPopulation2021.forEach(pays => {
    if (pays.pop < minPop) {
        minPop = pays.pop
    }
})
console.log('min pop : ' + minPop);

let maxPop = 0
allPopulation2021.forEach(pays => {
    if (pays.pop > maxPop) {
        maxPop = pays.pop
    }
})
console.log('max pop : ' + maxPop);




// Dimension du graph
let margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Echelles
let x = d3.scaleLinear()
    .domain([0, maxIcome])
    .range([0, width])
    .nice()

let y = d3.scalePow()
    .exponent(1.7)
    .domain([0, maxLife])
    .range([height, 0])
    .nice()

let ronds = d3.scaleSqrt()
    .domain([minPop, maxPop])
    .range([5, 20]);


// Affichage grille
let svg = d3.select("#graphique")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//Ajouter les cercles
svg.append('g')
    .selectAll("dot")
    .data(allIcome2021)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.income) })
    .data(allLife2021)
    .join()
    .attr("cy", function (d) { return y(d.life)})
    .data(allPopulation2021)
    .join()
    .attr("r", function (d) { return ronds(d.pop) })
    .style("fill", "red")
    .attr("opacity", "0.7")
    .attr("stroke", "black")


// Add x axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add y axis
svg.append("g")
    .call(d3.axisLeft(y));


