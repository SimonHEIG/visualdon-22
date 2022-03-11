import * as d3 from 'd3';

let circles = d3.select('#circles').append('svg').attr('height', 500).attr('width', 500);
circles.append('svg').attr('id', 'cercle1').append('circle').attr("cx", "50").attr("cy", "50").attr("r", "40")
circles.append('svg').attr('id', 'cercle2').append('circle').attr("cx", "150").attr("cy", "150").attr("r", "40")
circles.append('svg').attr('id', 'cercle3').append('circle').attr("cx", "250").attr("cy", "250").attr("r", "40")

d3.selectAll('#cercle2 circle').attr('fill', 'red')

d3.selectAll('#cercle1').attr('cx', '100')
d3.selectAll('#cercle2').attr('cx', '200')

// Texte
d3.selectAll('circle').each(function () {
    d3.select(this.parentNode).append("text")
        .text('Circle')
        .attr("x", d3.select(this.parentNode).node().getBBox().width - 60)
        .attr("y", d3.select(this.parentNode).node().getBBox().height)
})

// translate
d3.selectAll('#cercle3').on("click", () => {
    d3.selectAll('#cercle1').attr("transform", "translate (50,0)");
    d3.selectAll('#cercle2').attr("transform", "translate (150,0)");
    console.log("test");
})


//Graphique
const data = [20, 5, 25, 8, 15]

d3.select("body")
    .append("div")
    .attr("class", "div-rect")

const svgRect = d3.select(".div-rect")
    .append("svg")
    .attr("class", "svg-rect")
    .attr("width", 300)
    .attr("height", 100)

svgRect.selectAll(".svg-rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "rects")
    .attr("x", (d, i) => i * 30)
    .attr("y", (d, i) => parseInt(svgRect.attr("height")) - d)
    .attr("width", 20)
    .attr("height", (d => d))