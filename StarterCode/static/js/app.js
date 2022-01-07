d3.json('samples.json').then(({names})=>{
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    displayCharts();

})
displayCharts();

function displayCharts() {
    let sel = d3.select('select').node().value; 

    d3.json('samples.json').then(({metadata, samples})=>{
        let meta = metadata.filter(obj => obj.id == sel)[0];
        let sample = samples.filter(obj => obj.id == sel)[0];
        console.log(meta, sample);

        // names.forEach(name => {
            // d3.select('select').append('option').text(name);
        // });
    });



}
function optionChanged() {
    displayCharts();
    // d3.json('samples.json').then(( )
}

// add hovertext 
function barChart(index) {
    // let index = d3.select('select').node.value; 
    d3.json('sample.json').then((data) => {
        let values = data.samples;
        let graph = values.filter(indexobj => indexobj.id == index);
        let chart1 = graph[0]; 
        let xaxis = chart1.sample_values.slice(0, 10).reverse();  
        let yaxis = chart1.otu_ids.slice(0,10).reverse(); 
        let hoverText = chart1.otu_labels;
        // console.log()
        let axisTitles = [{
            x:xaxis,
            y:yaxis,
            type: "bar",
            orientation: "h",
            text:hoverText
        }]

        let display = {
            title: "Belly Button Bacteria"
        };

        Plotly.newPlot('bar', axisTitles, display);

    });

}

function bubbleChart(index1) {
    // let index1 = d3.select('select'); 
    d3.json('samples.json').then((data2) => {
        let sets = data2.samples; 
        let bubbles = sets.filter(index1obj => index1obj.id == index1)
        let chart2 = bubbles[0];
        let axis = [{
            x: chart2.otu_ids, 
            y: chart2.sample_values, 
            mode: 'markers', 
            marker: {size:chart2.sample_values, 
                color:chart2.otu_ids
            },
            text: chart2.otu_labels
        }];

        let layout = {
            title: 'Belly Button Bubble Chart'
        };

        Plotly.newPlot('bubble', axis, layout);
    });
    
}

function init() {
    let set = d3.select("#selDataset");
    d3.json("sample.json").then((data3) => {
        let samp = data3.names;
        samp.forEach((sample) => {
            set.append("option").text(sample).property("value", sample);
        });
            let display = samp[0];
            barChart(display);
            bubbleChart(display);
    });
}
function optionChanged(newSample) {
    barChart(newSample);
    bubbleChart(newSample);
}
init();