console.log("connected !!");

var gameMode = true;
var wins = 0;
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
            name: "Superman",
            health: 100,
            attackPower:20,
            damage: 5
        },
        "hero-deadpool": {
            name: "Deadpool",
            health: 100,
            attackPower:12,
            damage: 7
        },
        "hero-batman": {
            name: "Batman",
            health: 100,
            attackPower:33,
            damage: 2
        },
        "hero-ironman": {
            name: "Iron Man",
            health: 100,
            attackPower:15,
            damage: 6
        },
        "villain-darth": {
            name: "Darth",
            health: 100,
            attackPower:15,
            damage: 6
        },
        "villain-wolverine": {
            name: "Wolverine",
            health: 100,
            attackPower:15,
            damage: 6
        },
        "villain-joker": {
            name: "Joker",
            health: 100,
            attackPower:35,
            damage: 27
        },
        "villain-hulk": {
            name: "Hulk",
            health: 100,
            attackPower:15,
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

var setPlayerHealth = function(name,value){
    playerStats[name].health = value; 
}

var setAttackePower = function(name,value){
    playerStats[name].attackPower = value; 
}

var getPlayerStats = function (name){
   return playerStats[name];
}

var startAttack = function (){
    $('#game-commentary').text('You Hit Him');
    console.log(playerArray[0]);
    console.log(playerArray[1]);

    var hero = getPlayerStats(playerArray[0]);
    var villian = getPlayerStats(playerArray[1]);
    console.log(hero);
    console.log(villian);
}

$('#btn-abt-attack').on('click',function(){
    startAttack();
});

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

var createHulk = function(){
    var src = "assets/images/hulk-1.png";
    var divID = "villain-hulk";
    var divclass = "col";

    var hulkContainer = $('<div id="hulk-container" class="row"></div>');
    hulkContainer.append(createImageDiv(src,divID,divclass));

    return hulkContainer;
}

var createJoker = function(){
    var src = "assets/images/joker-2.png";
    var divID = "villain-joker";
    var divclass = "col";

    var jokerContainer = $('<div id="joker-container" class="row"></div>');
    jokerContainer.append(createImageDiv(src,divID,divclass));

    return jokerContainer;
}

var createWolverine = function(){
    var src = "assets/images/wolverine-1.png";
    var divID = "villain-wolverine";
    var divclass = "col";

    var wolverineContainer = $('<div id="wolverine-container" class="row"></div>');
    wolverineContainer.append(createImageDiv(src,divID,divclass));

    return wolverineContainer;
}

var createDarth = function(){
    var src = "assets/images/darth-3.png";
    var divID = "villain-darth";
    var divclass = "col";

    var darthContainer = $('<div id="darth-container" class="row"></div>');
    darthContainer.append(createImageDiv(src,divID,divclass));

    return darthContainer;
}


