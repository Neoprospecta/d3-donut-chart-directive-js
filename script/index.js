var data = [];

var text = "";

var width = 260;
var height = 260;
var thickness = 40;
var duration = 750;

var radius = Math.min(width, height) / 2;

d3.selectAll(".donut-chart")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height)
    .each(function (d, i) {
        var svg = d3.select(this);
        var parentNode = svg._groups[0][0].parentElement;
        var g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .cornerRadius(3)
            .padAngle(0.015);

        var pie = d3.pie()
            .value(function (d) { return d.value; })
            .sort(null);

        var color = parentNode.getAttribute('colorScheme') ?
            d3.scaleOrdinal(d3[parentNode.getAttribute('colorScheme')]) ?
                d3.scaleOrdinal(d3[parentNode.getAttribute('colorScheme')]) :
                d3.scaleOrdinal(d3.schemeCategory20) :
            d3.scaleOrdinal(d3.schemeCategory20);

        var path = undefined;

        d3.json(parentNode.getAttribute('url'), function (res) {
            data = res;
            /* console.log('data = ',data) */
            path = g.selectAll('path')
                .data(pie(data))
                .enter()
                .append("g")
                .on("mouseover", function (d) {
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", "black")
                        .append("g")
                        .attr("class", "text-group");

                    g.append("text")
                        .attr("class", "name-text")
                        .text(`${d.data.name}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '-1.2em');

                    g.append("text")
                        .attr("class", "value-text")
                        .text(`${d.data.value}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '.6em');
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("fill", color(this._current))
                        .select(".text-group").remove();
                })
                .append('path')
                .attr('d', arc)
                .attr('fill', (d, i) => color(i))
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", "black");
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("fill", color(this._current));
                })
                .each(function (d, i) { this._current = i; });
        });

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(text);
    });

