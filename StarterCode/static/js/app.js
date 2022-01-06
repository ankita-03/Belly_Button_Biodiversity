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
    })  
}
function optionChanged() {
    displayCharts();
    // d3.json('samples.json').then(( )
}

// add hovertext 
function barChart() {
    let index = d3.select('select').node.value; 
    d3.json('sample.json').then((data) => {
        let values = data.samples;
        let graph = values.filter(obj => obj.id == index);
        let chart1 = graph[0]; 
        let xaxis = chart1.sample_values.slice(0, 10);  
        let yaxis = chart1.otu_ids.slice(0,10); 
        let hoverText = chart1.otu_labels;
        // console.log()
        let axisTitles = {
            x:xaxis,
            y:yaxis,
            type: "bar",
            orientation: "h",
            text:hoverText
        }

        let display = {
            title: "Belly Button Bacteria"
        };

        Plotly.newPlot('bar', [axisTitles], display);

    });

}

function bubbleChart() {
    let index1 = d3.select('select'); 
    d3.json('samples.json').then((data2) => {
        let sets = data2.samples; 
        let bubbles = sets.filter(obj => obj.id == index1)
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

        Plotly.newPlot('bubble', axis, layout)
    })
    
}

function finalDisplay () {
    
}


