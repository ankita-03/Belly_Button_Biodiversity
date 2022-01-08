d3.json('samples.json').then(({names})=>{
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    init();

});

function init() {
    let sel = d3.select('select').node().value; 

    d3.json('samples.json').then(({metadata, samples})=>{
        let meta = metadata.filter(obj => obj.id == sel)[0];
        let sample = samples.filter(obj => obj.id == sel)[0];
        const panel = d3.select('.panel-body');

        panel.html('');
        Object.entries(meta).forEach(([key,val])=>{
            panel.append('h5').text(`${key.toUpperCase()}: ${val}`)
        })

        let { otu_ids, sample_values, otu_labels } = sample;

        console.log(otu_ids,sample_values,otu_labels);
        var data = [
            {
              x: sample_values.slice(0,10).reverse(),
              y: otu_ids.slice(0,10).reverse().map(otu_ids => `OTU ${otu_ids}`),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation: 'h'
            }
          ];

          let display = {
            title: "Belly Button Bacteria"
        };
          
          Plotly.newPlot('bar', data, display);
        
          
          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "Washing Freq" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 9] } }
            }
          ];
          
          var layout = {width:500};
          Plotly.newPlot('gauge', data, layout);

          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {size:sample_values, color:otu_ids, colorscale:'Earth'} 
          };
          
          var data = [trace1];
          
          Plotly.newPlot('bubble', data);
          
    });

}
function optionChanged() {
    init();
};