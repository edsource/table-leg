jQuery(document).ready(function($){

	/*    Tabletop code
	 *	  Load content from Google Spreadsheet
	 */

	var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1zebMHnAg70aV108IHhBhW3EQy2VC6H5wcyJkTAl8y7s/pubhtml?gid=822481562&single=true';

	function init() {
	Tabletop.init( { key: publicSpreadsheetUrl,
	                 callback: processInfo,
	                 simpleSheet: true } )
	}


	function chartRender(labelsArray, dataArray) {
        
        var chartData = {
                labels: labelsArray,
		        datasets: [{
		            label: 'Percentage of Votes',
		            data: dataArray,
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.5)',
		                'rgba(54, 162, 235, 0.5)',
		                'rgba(255, 206, 86, 0.5)',
		                'rgba(75, 192, 192, 0.5)',
		                'rgba(153, 102, 255, 0.5)',
		                'rgba(255, 159, 64, 0.5)'
		            ]
		            // borderColor: [
		            //     'rgba(255,99,132,1)',
		            //     'rgba(54, 162, 235, 1)',
		            //     'rgba(255, 206, 86, 1)',
		            //     'rgba(75, 192, 192, 1)',
		            //     'rgba(153, 102, 255, 1)',
		            //     'rgba(255, 159, 64, 1)'
		            // ],
		            // borderWidth: 10
		        }]
        };
        
        var barOptions = {
            legend: {
            position: 'right'
            },
            scales: {
                xAxes:[{
                    gridLines: {
	                color: "rgba(0, 0, 0, 0)"
	            },
	                 display: false,
	                ticks: {
	                    beginAtZero:true
	                 
	                }
	                }],
		            yAxes: [{
	                    stacked: true,
	                    gridLines: {
	                display: false
	            },      
		            ticks: {
		                    beginAtZero:true
		                }
		        }]
	        },
            events: false,
			animation: {

			onComplete: function () {
			    var ctx = this.chart.ctx;
			    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
			    ctx.textAlign = 'left';
			    ctx.textBaseline = 'bottom';
			    
			    this.data.datasets.forEach(function (dataset) {
			        // console.log(dataset);
			        for (var i = 0; i < dataset.data.length; i++) {
			            console.log(dataset._meta[Object.keys(dataset._meta)[0]].data[0]._model);
			            
			            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
			               
			            ctx.fillText(dataset.data[i] + "%", model.x + 5, model.y + 5);
			        }
			    });               
			}
			}
        };
        
        var config = {
            type: 'horizontalBar',
            data: chartData,
            options: barOptions
        };
        
        console.log(config.data.labels);
        
		// render the chart
		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, config);
        
        setInterval(function(){
           
    
		  myChart.update();
		}, 6000);
        
	}

	function processInfo(data, tabletop) {
	 	// uncomment to view your data in the console!
		var results = tabletop.sheets('Form_Results');
	    console.log('results:');
	    console.log(results);

	    var labels = [];
	    var data = [];
		
		// iterate through spreadsheet rows to build our arrays 
		results.elements.forEach( function(result) {
		    console.log('element:')
		    console.log(result)
	    	labels.push(result.question);
	    	data.push(result.percent);
	    });

		// render the chart and send it data
	    chartRender(labels, data);
	}



	window.addEventListener('DOMContentLoaded', init);

	//setInterval(function(){ init(); }, 10000);


});