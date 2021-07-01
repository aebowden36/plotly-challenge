var buildChart = function(xData, yData, hoverText, metadata){
    var panel = d3.select("sample-metadata");
    panel.html("");
    Object.entries(metadata).forEach(([key,value])=>{
        panel.append("h6").text(`${key}: ${value}`);
    });
    var trace1 = {
        x:xData,
        y:yData,
        text:hoverText,
        type: "bar",
        orientation: "h"
    }
    var layout = {
        title: "Top 10 OTU IDs"
    }
    var data = [trace1]

    Plotly.newPlot("bar", data, layout)

    var trace2 = {
        x:xData,
        y:yData,
        text:hoverText,
        mode: "markers",
        marker:{
            size:yData,
            colot:xData
        }
    }
    var layout2 = {
        title: "OTU ID Bubble"
    }
    var data2 = [trace2]
    
    Plotly.newPlot("bubble", data2, layout2)
}

var dropdown = function(names){
    var tag = d3.select("#selDataset")
    var options = tag.selectAll("option").data(names)

    options.enter().append("option")
            .attr("value", function(d){
                return d
            })
            .text(function(d){
                return d
            })
}

var changes = function(info){
    d3.json("samples.json").then(function(data){
        sampleData = data["samples"].filter(function(sample){
            return sample.id == info
        })
        
        metadataUpdate = data["metadata"].filter(function(metadata){
            return metadata.id == info
        })
    
        xData = sampleData[0]["otu_ids"]
        yData = sampleData[0]["sample_values"]
        hoverText = sampleData[0]["otu_labels"]
    
        buildPlot(xData, yData, hoverText, metadataUpdate[0])
    })
}

d3.json("samples.json").then(function(data){
    dropdown(data["names"])

    xData = data["samples"][0]["otu_ids"]
    yData = data["samples"][0]["sample_values"]
    hoverText = data["samples"][0]["otu_labels"]
    metadata = data["metadata"][0]

    buildPlot(xData, yData, hoverText, metadata)
})