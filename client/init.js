// RUN COLLISION DETECTION =====================

var start = setInterval(function() {
  collisionDetector();
}, 100);

// ENEMY PLACEMENT=====================
placeEnemies(enemyLocation());
setInterval(function () {
  var locs = enemyLocation();
  moveEnemies(locs);
}, 1000);

// SCOREKEEPING=========================
setInterval(function(){
  score++;
  d3.select('#currentscore').text(score);  
},200);

// DRAG FUNCTIONALITY=====================
var drag = d3.behavior.drag();

drag.on('dragstart', function(){
  d3.event.sourceEvent.stopPropagation(); 
  d3.event.sourceEvent.preventDefault(); 
}); 

drag.on('drag', function(d){
  var x = d3.event.x; 
  var y = d3.event.y; 
  d3.select(this).attr('x', x).attr('y', y);
});

player.call(drag);
