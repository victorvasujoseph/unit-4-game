console.log("connected !!");

var gameMode = true;
var wins = 0;
var loose = 0;
var health = 100;
var attackPower = 0;
var counterAttackPower = 0;
var battleHeroSelected = false;
var battleVillianSelected = false;

var playerArray = [];

var container1 = $("#container-1");
var container2 = $("#container-2");
var container3 = $("#container-3");
var container4 = $("#container-4");

var battleHero = $("#battleHero");
var battleVillian = $("#battleVillian");

var playerStats = {
        "hero-superman": {
            id:"hero-superman",
            name: "Superman",
            health: 100,
            attackPower:20,
            baseattackPower:2,
            damage: 4
        },
        "hero-deadpool": {
            id:"hero-deadpool",
            name: "Deadpool",
            health: 100,
            attackPower:12,
            baseattackPower:2,
            damage: 6
        },
        "hero-batman": {
            id:"hero-batman",
            name: "Batman",
            health: 100,
            attackPower:33,
            baseattackPower:3,
            damage: 9
        },
        "hero-ironman": {
            id:"hero-ironman",
            name: "Ironman",
            health: 100,
            attackPower:15,
            baseattackPower:2,
            damage: 3
        },
        "villain-darth": {
            id:"villain-darth",
            name: "Darth",
            health: 100,
            attackPower:20,
            damage: 6
        },
        "villain-wolverine": {
            id:"villain-wolverine",
            name: "Wolverine",
            health: 100,
            attackPower:15,
            damage: 6
        },
        "villain-joker": {
            id:"villain-joker",
            name: "Joker",
            health: 100,
            attackPower:35,
            damage: 27
        },
        "villain-hulk": {
            id:"villain-hulk",
            name: "Hulk",
            health: 100,
            attackPower:25,
            damage: 6
        }
}

var clearPlayers = function(){
    container1.empty();
    container2.empty();
    container3.empty();
    container4.empty();
}

var createFighters = function(obj) {
    console.log("battleHeroSelected :  " + battleHeroSelected);
    console.log("battleVillianSelected : " + battleVillianSelected);
    console.log(obj.id);

    if(playerArray.length < 2){
        if(battleHeroSelected && battleVillianSelected){
            console.log("Fighter's are already selected")
        } else if(battleHeroSelected === false && playerArray.length === 0){
            var parent = $("#"+obj.id).parents();
            console.log(parent[1].id); 
            battleHero.append(parent[1]);
            battleHeroSelected = true;
            playerArray.push(obj.id);
        } else if(battleVillianSelected === false && playerArray.length === 1){
            var parent = $("#"+obj.id).parents();
            console.log(parent[1].id); 
            battleVillian.append(parent[1]);
            battleVillianSelected = true;
            playerArray.push(obj.id);
            $('#btn-abt-attack').css("visibility","visible");
        }
    }

}

$(document).ready(function() {
    pushPlayerStats("hero-superman");
    pushPlayerStats("hero-deadpool");
    pushPlayerStats("hero-batman");
    pushPlayerStats("hero-ironman");
    
});

$('#btn-abt-attack').on('click',function(){
    if(gameMode){
        startAttack();
    }
});

$('img').on("click", function(){
    console.log("img clicked");
    if(gameMode){
        createFighters(this);
        clearPlayers();
        if(battleVillianSelected === false){
            createVillian();
        }
    }
});

var checkWin = function(hero,villian){

    var heroStats = getPlayerStats(hero.id);
    var villianStats = getPlayerStats(villian.id);

    console.log(heroStats.health);
    console.log(villianStats.health);

    if(heroStats.health < 0){
        setCommentary(villianStats.name + " Defeated " + heroStats.name + " Better Luck next time");
        return false; 
    } else if(villianStats.health < 0){
        setCommentary(heroStats.name + " Defeated " + villianStats.name + " You Win !!");
        return false;
    }
    return true;
}
var setPalyerStats = function(player){
    console.log(player);
    var playerID = player.id;
    playerStats[playerID].health = player.health; 
    playerStats[playerID].attackPower = player.attackPower; 
}

var getPlayerStats = function (id){
   return playerStats[id];
}

var pushPlayerStats = function (playerID){

    var playerStats = getPlayerStats(playerID);

    var healthDivID = "#"+ playerID +"-health";
    var attackPowerID = "#"+ playerID+"-attackpower";
    var damageID = "#" + playerID+"-damage";

    $(healthDivID).text("Health :" + playerStats["health"]);
    $(attackPowerID).text("Power :" + playerStats["attackPower"]);
    $(damageID).text("Damage :" + playerStats["damage"]);
}

var setCommentary =  function(text){
    $('#game-commentary').text(text);
}

var computeAttackStats = function(hero,villian){
    hero.health = hero.health - (villian.attackPower - hero.damage);
    villian.health = villian.health - hero.attackPower;
    hero.attackPower = hero.attackPower * hero.baseattackPower;
    setPalyerStats(hero);
    setPalyerStats(villian);
}

var startAttack = function(){   
    var hero = getPlayerStats(playerArray[0]);
    var villian = getPlayerStats(playerArray[1]);

    computeAttackStats(hero,villian);
    pushPlayerStats(villian.id);
    pushPlayerStats(hero.id);
    if(!checkWin(hero,villian)){
        gameMode = false;
    }

}

var createVillian = function() {
    container1.append(createJoker);
    container2.append(createWolverine);
    container3.append(createDarth);
    container4.append(createHulk);
}

var createImageDiv = function(src,divID,divClass){
    var img = $("<img/>").attr("src",src);
    img.attr("id",divID);

    img.on('click', function() {
        createFighters(this);
        clearPlayers();
    });
        
    var imgDiv = $("<div/>");
    imgDiv.addClass(divClass);
    imgDiv.append(img);

    return imgDiv;
}

var createStatsDiv = function(id){

    var playerStats = getPlayerStats(id);

    var parentdivClass = "col-12 text-warning";
    var parentdivID = id+"-stats";

    var childDivClass = "col";
    var healthDivID = id+"-health";
    var attackPowerID = id+"-attackpower";
    var damageID = id+"-damage";

    var parentDiv = $("<div/>");
    parentDiv.addClass(parentdivClass);
    parentDiv.attr("id",parentdivID);

    var healthDiv = $("<div/>");
    healthDiv.addClass(childDivClass);
    healthDiv.attr("id",healthDivID);
    healthDiv.text("Health :" + playerStats["health"]);
    
    var attackPowerDiv = $("<div/>");
    attackPowerDiv.addClass(childDivClass);
    attackPowerDiv.attr("id",attackPowerID);
    attackPowerDiv.text("Power :"+ playerStats["attackPower"]);

    var damageDiv = $("<div/>");
    damageDiv.addClass(childDivClass);
    damageDiv.attr("id",damageID);
    damageDiv.text("Damage :"+ playerStats["damage"]);

    parentDiv.append(healthDiv);
    parentDiv.append(attackPowerDiv);
    parentDiv.append(damageDiv);

    return parentDiv;

}

var createHulk = function(){
    var src = "assets/images/hulk-1.png";
    var divID = "villain-hulk";
    var divclass = "col";

    var hulkContainer = $('<div id="hulk-container" class="row"></div>');
    hulkContainer.append(createImageDiv(src,divID,divclass));
    hulkContainer.append(createStatsDiv(divID));

    return hulkContainer;
}

var createJoker = function(){
    var src = "assets/images/joker-2.png";
    var divID = "villain-joker";
    var divclass = "col";

    var jokerContainer = $('<div id="joker-container" class="row"></div>');
    jokerContainer.append(createImageDiv(src,divID,divclass));
    jokerContainer.append(createStatsDiv(divID));

    return jokerContainer;
}

var createWolverine = function(){
    var src = "assets/images/wolverine-1.png";
    var divID = "villain-wolverine";
    var divclass = "col";

    var wolverineContainer = $('<div id="wolverine-container" class="row"></div>');
    wolverineContainer.append(createImageDiv(src,divID,divclass));
    wolverineContainer.append(createStatsDiv(divID));
    
    return wolverineContainer;
}

var createDarth = function(){
    var src = "assets/images/darth-3.png";
    var divID = "villain-darth";
    var divclass = "col";

    var darthContainer = $('<div id="darth-container" class="row"></div>');
    darthContainer.append(createImageDiv(src,divID,divclass));
    darthContainer.append(createStatsDiv(divID));

    return darthContainer;
}




