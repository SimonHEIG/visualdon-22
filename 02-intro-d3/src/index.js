import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!
let svg = d3.select('#circles').append('svg').attr('width', '500').attr('height', '500')
svg.append('circle').attr("cx", "50").attr("cy", "50").attr("r", "40")
svg.append('circle').attr("cx", "150").attr("cy", "150").attr("r", "40")
svg.append('circle').attr("cx", "250").attr("cy", "250").attr("r", "40")

d3.selectAll('circle[cx="150"]').attr('fill', 'red')

d3.selectAll('circle[cx="50"]').attr('cx', '100')
d3.selectAll('circle[cx="150"]').attr('cx', '200')

