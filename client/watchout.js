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
var score = 0, collisions = 0;
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

  return arr; 
};

var liveEnemyLocations = function () {
  var all = [];
  var enemies = d3.selectAll('circle')[0];
  // console.log(enemies); 
  for (var i = 0; i < enemies.length; i++) {
    var xlocation = enemies[i].cx.animVal.value;
    var ylocation = enemies[i].cy.animVal.value;
    all.push([xlocation, ylocation]);
  };
  return all;
};

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


var player = d3.select('svg').append('rect')
              //.data([0])
              //.enter()
              .attr('x', 400) //function (d) { return d.x; })
              .attr('y', 200) //function (d) { return d.y; })
              .attr('width', 25)
              .attr('height', 25)
              .attr('fill', 'purple');

var playerLocation = function() {
  var location = [];
  var xlocation = d3.selectAll('rect')[0][0].x.animVal.value;
  var ylocation = d3.selectAll('rect')[0][0].y.animVal.value;
  location.push(xlocation, ylocation);
  return location;
};

var collisionDetector = function () {
  var enemyLocs = liveEnemyLocations();
  var playerLoc = playerLocation();
  for (var i = 0; i < enemyLocs.length; i++) {
    //console.log(Math.floor(enemyLocs[i][0])); 
    var enemyX = Math.floor(enemyLocs[i][0]);
    var enemyY = Math.floor(enemyLocs[i][1]);
    var playerX = Math.floor(playerLoc[0]);
    var playerY = Math.floor(playerLoc[1]);  

    if ((playerX < enemyX + 50 && playerX > enemyX - 50)&&(playerY < enemyY + 50 && playerY > enemyY - 50)){
      console.log("COLLISION!!!");
      var current = d3.select('#currentscore'); 
      collisions++;
      d3.select('#collisions').text(collisions);
      //d3.select('#highscore').text(current.text()); 
      d3.select('#currentscore').text('0'); 
    }
  };
};

setInterval(function() {
  collisionDetector();
}, 500);

//DRAG STUFF 
var drag = d3.behavior.drag();

drag.on('dragstart', function(){
  d3.event.sourceEvent.stopPropagation(); 
  d3.event.sourceEvent.preventDefault(); 
}); 

drag.on('drag', function(d){
  var x = d3.event.x; 
  var y = d3.event.y; 
  d3.select(this).attr('x', x).attr('y', y);
  score++;
  d3.select('#currentscore').text(score);
});

player.call(drag);

// placeEnemies(enemyLocation());
// var locs = enemyLocation();
// moveEnemies(locs);

placeEnemies(enemyLocation());
setInterval(function () {
  var locs = enemyLocation();
  //console.log(locs); 
  moveEnemies(locs);
}, 1000);



// Enter / append placed before attribute definition works for one call, but not for multiple. Why?
// data bind function needed? function (d) return d?

 
