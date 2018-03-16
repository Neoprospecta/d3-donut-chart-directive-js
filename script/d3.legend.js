(function () {
    d3.legend = function (g) {
        g.each(function () {
            var g = d3.select(this),
                items = {},
                svg = d3.select(g.property("nearestViewportElement")),
                legendPadding = g.attr("data-style-padding") || 5,
                lb = g.selectAll(".legend-box").data([true])

            lb.enter().append("rect").style("fill", "rgba(255, 255, 255, 0)").classed("legend-box", true)
            var licreate = g.selectAll(".legend-items")
                .data(["g"])
                .enter()
                .append("g")
                .attr("class", "legend-items");
            var li = g.selectAll(".legend-items");

            svg.selectAll("[data-legend]").each(function (dado) {

                var self = d3.select(this)
                items[self.attr("data-legend")] = {
                    pos: self.attr("data-legend-pos") || this.getBBox().y,
                    color: self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
                }
            })

            items = d3.entries(items).sort(function (a, b) { return a.value.pos - b.value.pos })

            li.selectAll("text")
                .data(items, function (d) { return d.key })
                .call(function (d) { d.enter().append("text") })
                .call(function (d) { d.exit().remove() })
                .attr("y", function (d, i) { return i + "em" })
                .attr("x", "1em")
                .text(function (d) {
                    return d.key
                })

            li.selectAll("circle")
                .data(items, function (d) { return d.key })
                .call(function (d) { d.enter().append("circle") })
                .call(function (d) { d.exit().remove() })
                .attr("cy", function (d, i) { return i - 0.25 + "em" })
                .attr("cx", 0)
                .attr("r", "0.4em")
                .style("fill", function (d) { return d.value.color })

            // Reposition and resize the box
            var lbbox = li.node().getBBox()
            lb.attr("x", (lbbox.x - legendPadding))
                .attr("y", (lbbox.y - legendPadding))
                .attr("height", (lbbox.height + 2 * legendPadding))
                .attr("width", (lbbox.width + 2 * legendPadding))
        })
        return g
    }
})()