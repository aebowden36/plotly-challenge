// var buildChart = function(xData, yData, hoverText, metadata){
//     var panel = d3.select("sample-metadata");
//     panel.html("");
//     Object.entries(metadata).forEach(([key,value])=>{
//         panel.append("p").text(`${key}: ${value}`);
//     });
//     var trace1 = {
//         x:xData,
//         y:yData,
//         text:hoverText,
//         type: "bar",
//         orientation: "h"
//     }
//     var layout = {
//         title: "Top 10 OTU IDs"
//     }
//     var data = [trace1]

//     Plotly.newPlot("bar", data, layout)

//     var trace2 = {
//         x:xData,
//         y:yData,
//         text:hoverText,
//         mode: "markers",
//         marker:{
//             size:yData,
//             colot:xData
//         }
//     }
//     var layout2 = {
//         title: "OTU ID Bubble"
//     }
//     var data2 = [trace2]
    
//     Plotly.newPlot("bubble", data2, layout2)
// }
// buildChart()

// var dropdown = function(names){
//     var tag = d3.select("#selDataset")
//     var options = tag.selectAll("option").data(names)

//     options.enter().append("option")
//             .attr("value", function(d){
//                 return d
//             })
//             .text(function(d){
//                 return d
//             })
// }

// var changes = function(info){
//     d3.json("samples.json").then(function(data){
//         sampleData = data["samples"].filter(function(sample){
//             return sample.id == info
//         })
        
//         metadataUpdate = data["metadata"].filter(function(metadata){
//             return metadata.id == info
//         })
    
//         xData = sampleData[0]["otu_ids"]
//         yData = sampleData[0]["sample_values"]
//         hoverText = sampleData[0]["otu_labels"]
    
//         buildPlot(xData, yData, hoverText, metadataUpdate[0])
//     })
// }

// d3.json("samples.json").then(function(data){
//     dropdown(data["names"])

//     xData = data["samples"][0]["otu_ids"]
//     yData = data["samples"][0]["sample_values"]
//     hoverText = data["samples"][0]["otu_labels"]
//     metadata = data["metadata"][0]

//     buildPlot(xData, yData, hoverText, metadata)
// })
// buildPlot(xData, yData, hoverText, metadata)

d3.json("samples.json").then((data) => {
    console.log(data);
});

function buildMeta(sample){
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var infoArray = metadata.filter(item => item.id == sample);
        var info = infoArray[0]
        var panel = d3.select("#sample-metadata")
        
        panel.html("");

        Object.entries(info).forEach(([key, value]) => {
            panel.append("p").text(`${key}: ${value}`);
        });
    });
};

function buildPlot(sample) {
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        var infoArray = samples.filter(item => item.id ==sample);
        var info = infoArray[0]

        var ids = info.otu_ids;
        var labels = info.otu_labels;
        var values = info.sample_values;

        var barTrace = [
            {
                x: values.slice(0,10).reverse(),
                y: ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                text: labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        var barLayout = {
            title: "Top 10 OTU"
        }

        Plotly.newPlot("bar", barTrace, barLayout)

        var bubbleTrace = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids,
                    size: values
                }
            }
        ];

        var bubbleLayout = {
            hovermode: "closest"
        }

        Plotly.newPlot("bubble", bubbleTrace, bubbleLayout)
    })
}

function init(){
    var selector = d3.select("#selDataset");
    
    d3.json("samples.json").then(function(data){
        var sampleNames = data.names;
        sampleNames.forEach(function(sample){
            selector.append("option")
                    .text(sample)
                    .property("value", sample);
        });

        const initSample = sampleNames[0]
        buildPlot(initSample);
        buildMeta(initSample);
    })
}

function optionChange(newSample){
    buildPlot(newSample);
    buildMeta(newSample);
}
init();