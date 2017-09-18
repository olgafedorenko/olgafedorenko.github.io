//d3.select('.item').text('text modified');
//d3.selectAll('.item:nth-child(2)').text('text modified only this')
//d3.selectAll('.item:nth-child(3n)').html('<strong>being selected</strong>');
//d3.select('#chart').insert('span', ':nth-child(3)')
 //.html('<strong>being selected</strong>')

/*
d3.selectAll('.item:nth-child(3)')
  .classed(' attn bigger', true)
  .classed('item', false);

var color = d3.scaleOrdinal(d3.schemeCategory10);

d3.selectAll('.item:nth-child(2)')
.style('background', '#2635D2') .style('padding', '10px') .style('margin', '5px') .style('color', 'white') .style('font-weight', 'bold');
d3.scaleOrdinal(d2.schemeCategory10)
*/
/*
var xyz=[{ width: 230, color: '#2635D2'}, { width: 250, color: '#8F290E'}, { width: 200, color: 'yellow'}, { width: 300, color: '#E28DB7'}, { width: 240, color: 'cyan'},
{ width: 260, color: '#C7C521'}]
d3.selectAll('.item')
    .data(xyz) 
     .style('color', 'white')
.style('background', function(d) {return d.color;}) .style('width', function(d) {return d.width + 'px'});
*/
/*
var xyz = [
{ width: 200, course: 'CNIT 131H', color: '#2635D2'}, { width: 200, course: 'CNIT 132', color: '#8F290E'}, { width: 200, course: 'CNIT 133', color: 'yellow'},
{ width: 200, course: 'CNIT 134', color: '#E28DB7'}, { width: 200, course: 'CNIT 131A', color: 'cyan'},
{ width: 200, course: 'CNIT 129', color: '#C7C521'} ];


d3.selectAll('#chart').selectAll('div')
    .data(xyz)
.enter().append('div')
.classed('item', true) .text(function(d) { return d.course;
})
.style('color', 'white')
.style('background', function(d) {return d.color;}) .style('width', function(d) {return d.width + 'px'});


*/
/*
d3.select('#chart')
    .append('svg')
    .attr('width', 520) 
    .attr('height', 380) 
    .style('background', "#BCC5C5")
    .append('rect')
    .attr('y', 90)
    .attr('x', 150)
    .attr('height', 100)
    .attr('width', 100)
    .style('fill', '#983812')

d3.select('svg')
    .append('circle')
    .attr('cy', 210)
    .attr('cx', 320) 
    .attr('r', 35)
    .style('fill', '#B7005D')
*/

var grades = [];

for (var i=0; i<40; i++){
     grades.push(Math.floor(Math.random()*60)) 
};

grades.sort(function compN(a,b) { return a -b; });
var tooltip = d3.select('body').append('div')
    .style('position', 'absolute') 
    .style('padding', '0 10px') 
    .style('background', 'white') 
    .style('opacity', 0);
var margin = { top: 20, right:20, bottom: 30, left: 40};
var height = 200 - margin.top - margin.bottom,
    width = 500 - margin.left - margin.right,
    barW = 40,
    barSpace = 5;

var tColor;
var verticalGuide = d3.scaleLinear()
    .domain([0, d3.max(grades)])    
    .range([height, 0]);
var mycolors = d3.scaleLinear() 
    .domain([0, grades.length])
    .range(['#E59500','#CB327D']);
var yS = d3.scaleLinear() 
    .domain([0, d3.max(grades)]) 
    .range([0, height]);
var xS = d3.scaleBand() 
    .domain(d3.range(0, grades.length)) 
    .range([0, width])
    .padding(0.1);

var graph = d3.select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right) 
    .attr('height', height + margin.top + margin.bottom) 
    .style('background', '#788180')
    .append('g')
    .attr('transform', 'translate('+ margin.left+', '+ margin.top+')')
graph.selectAll('rect')
    .data(grades)
    .enter()
    .append('rect')
    .style('fill', function(d,i) { return mycolors(i) })

    .attr('width', xS.bandwidth())
    .attr('height', function(d) { return yS(d); })

   .attr('x', function(d, i) { return xS(i); })
    .attr('y', function(d) { return height - yS(d); })


.on('mouseover', function(d) { 
    d3.select(this)
        .style('opacity', .4) })
.on('mouseout', function(d) { 
    d3.select(this)
        .style('opacity', 1)
})
.on('mouseover', function(d) {
    tooltip.transition() 
        .style('opacity', .8)
     tooltip.html(d)
        .style('left', (d3.event.pageX - 35) + 'px') .style('top', (d3.event.pageY - 30) + 'px')
    tColor = this.style.fill; 
    d3.select(this)
        .transition()
        .style('opacity', .4)
        .style('fill', '#FFFF32')
})
.on('mouseout', function(d) {
    d3.select(this)
        .transition().delay(500).duration(2000)
        .style('opacity', 1) 
        .style('fill', tColor)
});

graph.append('g') 
    .call(d3.axisLeft(yS).scale(verticalGuide))
    

graph.append('g')
.call(d3.axisBottom(xS))
.attr('transform', 'translate(0, '+ height +')');





