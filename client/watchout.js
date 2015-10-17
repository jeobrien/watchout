var score = 0, collisions = 0, numEnemies = 15, highScore = 0; 

// SVG =====================
var svg = d3.select('body').append('svg')
            .attr("width", 960)
            .attr("height", 600)
            .style('background-color', "teal");

var player = d3.select('svg').append('rect')
              .attr('x', 400)
              .attr('y', 200)
              .attr('width', 25)
              .attr('height', 25)
              .attr('class', 'player'); 

// CREATE LOCATIONS =====================
var enemyLocation = function(){
  var arr = []; 

  for (var i = 0; i < numEnemies; i++) {
    var enemy = new Enemy();
    enemy.x = Math.random() * 960; 
    enemy.y = Math.random() * 600; 
    arr.push(enemy); 
  };

  return arr; 
};

var placeEnemies = function (locations) {
  svg.selectAll('circle')
    .data(locations)
    .enter().append('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', 25)
    .attr('class', 'cir'); 
};

var moveEnemies = function (locations) {
    svg.selectAll('circle')
        .data(locations)
        .transition()
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; })
          .duration(1500);
};

// LOCATE ENEMIES AND PLAYER =====================
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

var playerLocation = function() {
  var location = [];
  var xlocation = d3.selectAll('rect')[0][0].x.animVal.value;
  var ylocation = d3.selectAll('rect')[0][0].y.animVal.value;
  location.push(xlocation, ylocation);
  return location;
};

// COLLISION DETECTION =====================
var collisionDetector = function () {
  var enemyLocs = liveEnemyLocations();
  var playerLoc = playerLocation();
  for (var i = 0; i < enemyLocs.length; i++) {
    //console.log(Math.floor(enemyLocs[i][0])); 
    var enemyX = Math.floor(enemyLocs[i][0]);
    var enemyY = Math.floor(enemyLocs[i][1]);
    var playerX = Math.floor(playerLoc[0]);
    var playerY = Math.floor(playerLoc[1]);  

    if ((playerX < enemyX + 27 && playerX > enemyX - 50)&&(playerY-25 < enemyY && playerY+48 > enemyY)){
      var current = d3.select('#currentscore'); 
      collisions++;
      d3.select('#collisions').text(collisions);
      if (score > highScore) {
        highScore = score;
        d3.select('#highscore').text(highScore);
      }
      score = 0; 
      d3.select('#currentscore').text(score);
    }
  };
};


 
