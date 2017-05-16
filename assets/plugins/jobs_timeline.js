// Create data - this will have to become dynamic
var dates = ["09/01/2013", "03/01/2014", "01/01/2015", "10/01/2015", "05/01/2017"];
var roles = ["Junior Data Analyst", "Data Scientist", "Senior Data Scientist", "Data Science Consultant", "Principal Data Scientist"];
var colors = ["#1E6262", "#1DBA90", "#4CD3CC", "#A2BCE0", "6C92A3"];

// Reshape data into one object
var labelColorTestData = [];
for(i = dates.length - 1; i >= 0; i--){
	if(i == dates.length - 1){
		labelColorTestData.push({
			"label": roles[i],
			times: [{
				"color": colors[i],
				"starting_time": Date.parse(dates[i]),
				"ending_time": Date.now()
			}]
		})
	}else{
		labelColorTestData.push({
			"label": roles[i],
			times: [{
				"color": colors[i],
				"starting_time": Date.parse(dates[i]),
				"ending_time": Date.parse(dates[i + 1])
			}]
		})
	}
}

// Function to draw the timeline
function timelineLabelColor() {
	// Dynamic width based on main wrapper size
	var width = $('.main-wrapper').width();
	var chart = d3.timeline()
		.tickFormat(
			{
				format: d3.time.format("%b %Y"), 
				tickTime: d3.time.months,
				tickInterval: 6, 
				tickSize: 6 
			})
			.stack()
			.margin(
				{
					left:135, 
					right:30, 
					top:0, 
					bottom:0
			})
	var svg = d3.select("#timeline")
		.append("svg")
		.attr("width", width)
		.datum(labelColorTestData)
		.call(chart);

	// Adding here the on-hover events for the plot
	$('#timeline').find('rect').css('opacity', 0.4);
	$('#timeline').find('rect').on({
		mouseenter: function () {
			var index = $(this).attr('id').replace('timelineItem_', '').replace('_0', '');
			var color = $(this).css('fill').replace(')', ', 0.2)').replace('rgb', 'rgba');
			$(this).css('opacity', 1);
			$($('.jobs').get(index)).css({'background-color' : color})
		},
		mouseout: function () {
			var index = $(this).attr('id').replace('timelineItem_', '').replace('_0', '');
			$(this).css('opacity', 0.4);
			$($('.jobs').get(index)).css('background-color', 'white')
		}
	});

	// And here the on-hover events for the descriptions
	$('.jobs').on({
		mouseenter: function () {
			var index = $(this).attr('id');
			var color = $($('#timeline').find('rect').get(index)).css('fill').replace(')', ', 0.2)').replace('rgb', 'rgba');
			$($('#timeline').find('rect').get(index)).css('opacity', 1)
			$(this).css('background-color', color)
		},
		mouseleave: function () {
			var index = $(this).attr('id').replace('timelineItem_', '').replace('_0', '');
			$($('#timeline').find('rect').get(index)).css('opacity', 0.4)
			$(this).css('background-color', 'white')
		}
	});
}

// Draw it onload and onresize
window.onload = function() {
	timelineLabelColor();
}
window.onresize = function(event) {
	$("#timeline").children("svg").remove();
	timelineLabelColor();
};
