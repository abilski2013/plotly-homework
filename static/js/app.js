d3.json("./././samples.json").then((data) => {
    console.log(data);
    
    var names1 = data.names;
    var samplesData = data.samples;
    var metadata = data.metadata;
    var select = document.getElementById("selDataset"); 
     

        for(var i = 0; i < names1.length; i++) {
            var opt = names1[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }   
    
    console.log(names1);
    console.log(samplesData);
    console.log(d3.select("#selDataset").property("value"));
    
    function init() {
        var starter = d3.select("#selDataset").property("value");
        function firstFilter(data) {
            return data.id == starter;
        }
        filtered_init = samplesData.filter(firstFilter);
        console.log(filtered_init);
        
        
        var all_values = filtered_init[0]["sample_values"];
        console.log(all_values);
        
        var labels = [];
        var all_otu = filtered_init[0]["otu_ids"].forEach(id => labels.push(`OTU: ${id}`));
        console.log(labels);
        
        var all_otu_labels = filtered_init[0]["otu_labels"];
        
        var top10labels = labels.slice(0,10);
        var top10samples = all_values.slice(0,10);
        var top_otu_labels = all_otu_labels.slice(0,10);
        console.log(top10labels);
        console.log(top10samples);
        console.log(top_otu_labels);
        
        var trace1 = {
            x: top10samples.reverse(),
            y: top10labels.reverse(),
            text: top_otu_labels.reverse(),
            type: "bar",
            orientation: "h"
        };
        var chartData = [trace1];
        var layout = {
            title: "Top Operational Taxonomic Units",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            },
        };
        Plotly.newPlot("bar", chartData, layout);
        
        var trace2 = {
            x: filtered_init[0]["otu_ids"],
            y: all_values,
            text: filtered_init[0]["otu_labels"],
            mode: 'markers',
            marker: {
                size: all_values,
                color: filtered_init[0]["otu_ids"]
            }
        };

        var data = [trace2];

        var layout = {
                title: 'Sample Values Bubble Chart',
                showlegend: false,
                xaxis: {
                    title: "OTU ID's"}
        };

        Plotly.newPlot('bubble', data, layout);
        
        
        var filtered_init_meta = metadata.filter(firstFilter);
        console.log(filtered_init_meta);
        var object = filtered_init_meta[0];
        var object1 = Object.entries(object);
        
        var demotable = document.getElementById("sample-metadata"); 
     

        for(var i = 0; i < object1.length; i++) {
            var info = object1[i];
            var el = document.createElement("p");
            el.textContent = `${info[0]}: ${info[1]}`;
            el.value = `${info[0]}: ${info[1]}`;
            demotable.appendChild(el);
        }   
    
        
        var data = [
	       {
		      domain: { x: [0, 9], y: [0, 9] },
		      value: object1[6][1],
		      title: { text: "Washing Frequency, scrubs/week" },
		      type: "indicator",
		      mode: "gauge+number",
              gauge: {
                  axis: {range : [0, 9]}
              }
	       }
        ];

        var layout = { margin: { 
                           t: 0,                 
                           b: 0 } };
        
        Plotly.newPlot('gauge', data, layout);
        
}
        
    
    
    
    
        
    d3.selectAll("#selDataset").on("change", updatePlotly);
    
    
    function updatePlotly() {
        var dropdownMenu = d3.select("#selDataset");

        var dataset = dropdownMenu.property("value");
    
        function filterSamplesData(data) {
            return data.id == dataset;
        }
        
        filtered = samplesData.filter(filterSamplesData);
        console.log(filtered);    

        var all_values = filtered[0]["sample_values"];
        console.log(all_values);
        
        var labels = [];
        var all_otu = filtered[0]["otu_ids"].forEach(id => labels.push(`OTU: ${id}`));
        console.log(labels);
        
        var all_otu_labels = filtered[0]["otu_labels"];

        
        var top10labels = labels.slice(0,10);
        var top10samples = all_values.slice(0,10);
        var top_otu_labels = all_otu_labels.slice(0,10);
        console.log(top10labels);
        console.log(top10samples);
        console.log(top_otu_labels);
        
        var trace1 = {
            x: top10samples.reverse(),
            y: top10labels.reverse(),
            text: top_otu_labels.reverse(),
            type: "bar",
            orientation: "h"
        };
        var chartData = [trace1];
        var layout = {
            title: "Top Operational Taxonomic Units",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        Plotly.newPlot("bar", chartData, layout);             
       
        var trace2 = {
            x: filtered[0]["otu_ids"],
            y: all_values,
            text: filtered[0]["otu_labels"],
            mode: 'markers',
            marker: {
                size: all_values,
                color: filtered[0]["otu_ids"]
            }
        };

        var data = [trace2];

        var layout = {
                title: 'Sample Values Bubble Chart',
                showlegend: false,
                xaxis: {
                    title: "OTU ID's"}
        };

        Plotly.newPlot('bubble', data, layout);
        
        var filtered_meta = metadata.filter(filterSamplesData);
        console.log(filtered_meta);
        var object = filtered_meta[0];
        var object1 = Object.entries(object);
        var demotable = document.getElementById("sample-metadata").innerHTML = ""; 
        var demotable = document.getElementById("sample-metadata"); 
     

        for(var i = 0; i < object1.length; i++) {
            var info = object1[i];
            var el = document.createElement("p");
            el.textContent = `${info[0]}: ${info[1]}`;
            el.value = `${info[0]}: ${info[1]}`;
            demotable.appendChild(el);
        }           
        
        var data = [
	       {
		      domain: { x: [0, 9], y: [0, 9] },
		      value: object1[6][1],
		      title: { text: "Washing Frequency, scrubs/week" },
		      type: "indicator",
		      mode: "gauge+number",
              gauge: {
                  axis: {range : [0, 9]}
              } 
	       }
        ];

        var layout = { margin: { 
                           t: 0,                 
                           b: 0 } };
        
        Plotly.newPlot('gauge', data, layout);
                
        
    }

    init();
});

