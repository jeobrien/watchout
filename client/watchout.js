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

var enemyLocation = function(){
  var arr = []; 
  var numEnemies = 20; 

  for (var i = 0; i < numEnemies; i++) {
    var enemy = new Enemy();
    enemy.x = Math.random() * 960; 
    enemy.y = Math.random() * 600; 
    arr.push(enemy); 
  };

  //console.log(arr); 
  return arr; 
};

///[10,20,30,40,50,60,70,80,90]; 

var placeEnemies = function (locations) {

  var circles = svg.selectAll('circle')
                  .data(locations)
                  .attr('cx', function (d) { return d.x; })
                  .attr('cy', function (d) { return d.y; })
                  .attr('r', 25)
                  .attr('fill', 'blue')
                  .enter().append('circle');

      //circles.exit().remove();
};

//placeEnemies(enemyLocation());
setInterval(function () {
  var locs = enemyLocation();
  console.log(locs); 
  placeEnemies(locs);
}, 1000);


 
