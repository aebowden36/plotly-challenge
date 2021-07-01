d3.json("samples.json", function(samples){
    console.log(samples)
})

var trace1 = {
    x: samples.otu_ids,
    y: samples.sample_values,
    type: "bar"
};

var data = [trace1];

var layout = {
    title: "Top 10 OTUs"
}

Plotly.newPlot("plot", data, layout)