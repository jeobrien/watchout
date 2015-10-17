// start slingin' some d3 here.

var svg = d3.select('body').append('svg')
            .attr("width", 960)
            .attr("height", 600)
            .style('background-color', "teal");

var Enemy = function(){
  this.x = 0; 
  this.y = 0; 
  this.r = 0; 
}

var Player = function () {
  this.x = 0;
  this.y = 0;
  this.r = 0;
}

// Array of enemies

var enemyLocation = function(){
  var arr = []; 
  var numEnemies = 20; 

  for (var i = 0; i < numEnemies; i++) {
    var enemy = new Enemy();
    enemy.x = Math.random() * 960; 
    enemy.y = Math.random() * 600; 
    arr.push(enemy); 
  };

  console.log(arr); 
  return arr; 
};

///[10,20,30,40,50,60,70,80,90]; 

var placeEnemies = function (locations) {

  var circles = svg.selectAll('circle')
                  .data(locations)
                  .enter().append('circle')
                  .attr('cx', function (d) { return d.x; })
                  .attr('cy', function (d) { return d.y; })
                  .attr('r', 25)
                  .attr('fill', 'blue');
};
var moveEnemies = function (locations) {
    svg.selectAll('circle')
        .data(locations)
        .transition()
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; })
          .duration(1200);
};

var drag = d3.behavior.drag();
var player = d3.select('svg').append('rect')
              //.data([0])
              //.enter()
              .attr('x', 400) //function (d) { return d.x; })
              .attr('y', 200) //function (d) { return d.y; })
              .attr('width', 25)
              .attr('height', 25)
              .attr('fill', 'pink')
              .call(drag);


placeEnemies(enemyLocation());
setInterval(function () {
  var locs = enemyLocation();
  console.log(locs); 
  moveEnemies(locs);
}, 1000);

// Enter / append placed before attribute definition works for one call, but not for multiple. Why?
// data bind function needed? function (d) return d?

 
