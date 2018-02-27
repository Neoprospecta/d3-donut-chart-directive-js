var data = [];

var text = "";

const DEFAULT_SIZE = 260;
var thickness = 40;
var duration = 750;


d3.selectAll(".donut-chart")
    .append('svg')
    .attr('class', 'pie')
    .each(function (d, i) {
        var svg = d3.select(this);
        var parentNode = svg._groups[0][0].parentElement;
        var width = height = parentNode.getAttribute('size') ? parentNode.getAttribute('size') : DEFAULT_SIZE;
        var radius = Math.min(width, height) / 2;

        svg.style('width', width);
        svg.style('height', height);

        var g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .cornerRadius(3)
            .padAngle(0.015);

        var label = parentNode.getAttribute('label') ? parentNode.getAttribute('label') : 'name';
        var slice = parentNode.getAttribute('slice') ? parentNode.getAttribute('slice') : 'value';

        var pie = d3.pie()
            .value(function (d) { return d[slice]; })
            .sort(null);

        var color = parentNode.getAttribute('colorScheme') ?
            d3.scaleOrdinal(d3[parentNode.getAttribute('colorScheme')]) :
            d3.scaleOrdinal(d3.schemeCategory20);

        d3.json(parentNode.getAttribute('url'), function (res) {
            data = res;
            /* console.log('data = ',data) */
            var path = g.selectAll('path')
                .data(pie(data))
                .enter()
                .append("g")
                .attr('class', 'labels')
                .on("mouseover", function (d) {
                    let g = d3.select(this)
                        .style("cursor", "pointer")
                        .style("fill", "black")
                        .append("g")
                        .attr("class", "text-group");

                    g.append("text")
                        .attr("class", "name-text")
                        .text(`${d.data[label]}`)
                        .attr('text-anchor', 'middle')
                        .attr('dy', '-1.2em');

                    g.append("text")
                        .attr("class", "value-text")
                        .text(`${d.data[slice]}`)
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
                .attr('class', 'slices')
                .attr('d', arc)
                .attr('fill', (d, i) => color(i))
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .style("opacity", "0.5");
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .style("fill", color(this._current))
                        .style("opacity", "1");
                })
                .each(function (d, i) { this._current = i; });
        });

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(text);
    });

