import * as d3 from 'd3'

Promise.all([
    d3.json('https://jsonplaceholder.typicode.com/posts'),
    d3.json('https://jsonplaceholder.typicode.com/users')
]).then(([posts, users]) => {
    console.log(posts)
    console.log(users)

    // MANIPULTION DE DONNÉES
    let tableau = users.map((user, index) => {
        let titres_posts = [];
        for (const post of posts) {
            if (post.userId == user.id) {
                titres_posts.push(post.title)
            }
        }
        return {
            'nom_utilisateur': user.username,
            'ville': user.address.street,
            'nom_companie': user.company.name,
            'titres_posts': titres_posts
        }
    })

    console.log(tableau)

    let userPosts = []

    let table = document.querySelector('table');
    for (const user of tableau) {
        let counter = 0
        for (const post of user.titres_posts) {
            counter++
        }



        let newRow = document.getElementById("tr-template").cloneNode(true)
        newRow.querySelector('.userName').innerHTML = user.nom_utilisateur
        newRow.querySelector('.nbPosts').innerHTML = counter

        newRow.classList.remove("hidden")
        newRow.removeAttribute('id')

        table.append(newRow)

    }

    // DESSINER AVEC LES DONNÉES

    let nbPostUser = []

    for (const user of tableau) {
        let counter = 0
        for (const post of user.titres_posts) {
            counter++
        }
        nbPostUser.push({ 'nom': user.nom_utilisateur, 'posts': counter })
    }

    console.log(nbPostUser)

    // Set graph margins and dimensions
    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Set ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select("#graphique").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    x.domain(nbPostUser.map(function (d) { return d.nom; }));
    y.domain([0, d3.max(nbPostUser, function (d) { return d.posts; })]);

    // Append rectangles for bar chart
    svg.selectAll(".bar")
        .data(nbPostUser)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.nom); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.amounts); })
        .attr("height", function (d) { return height - y(d.posts); });

    // Add x axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add y axis
    svg.append("g")
        .call(d3.axisLeft(y));

})