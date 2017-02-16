/*
Released under the terms of the GNU General Public License version 2.0 (or later)

Copyright: Felipe C. da S. Sanches <juca@members.fsf.org>
           Tony de Marco <tony@garoa.tv>
           Afonso Coutinho <afonso@yack.com.br>
           Tamys Guimarães <tamys.guimaraes@gmail.com>
*/

const DELAY = 1000;

var score,
    scorediv,
    game_is_running = false,
    intro,
    icon,
    icon_img,
    result_correct,
    result_incorrect,
    gameover,
    current_icon,
    download,
    tryagain,
    random_icons,
    icon_names = [
  "agender",
  "androgynous",
  "bisexual_female",
  "bisexual_male",
  "gay",
  "heterosexual",
  "intersex",
  "lesbian",
  "male",
  "neutrois",
  "non_binary",
  "other_gender",
  "questioning",
  "transgender",
  "female"
];

function init(){
  intro = document.getElementById("intro");
  icon = document.getElementById("icon");
  icon_img = document.getElementById("icon_img");
  result_correct = document.getElementById("result_correct");
  result_incorrect = document.getElementById("result_incorrect");
  gameover = document.getElementById("gameover");
  scorediv = document.getElementById("score");
  download = document.getElementById("download");
  tryagain = document.getElementById("tryagain");

  download.setAttribute("style", "display:none");
  tryagain.setAttribute("style", "display:none");

  intro.onclick = new_game;
  scorediv.onclick = function(){
    gameover.setAttribute("style", "display:none");
    intro.setAttribute("style", "display:block");
    download.setAttribute("style", "display:none");
    tryagain.setAttribute("style", "display:none");
  }
  var fb = document.getElementById("facebook").onclick = function(){ window.open("http://www.facebook.com/sharer.php?u=http://www.justintype.com/represent")};
  var tw = document.getElementById("twitter").onclick = function () { window.open("http://www.facebook.com/sharer.php?u=http://www.justintype.com/represent")};
  download.onclick = function () { window.open("http://www.justintype.com/free/represent/RepresentSans-Regular.otf.zip")};
  tryagain.onclick = function () {
    gameover.setAttribute("style", "display:none");
    intro.setAttribute("style", "display:block");
    download.setAttribute("style", "display:none");
    tryagain.setAttribute("style", "display:none");
  };
}

function new_game(){
  intro.setAttribute("style", "display:none");
  icon.setAttribute("style", "display:block");

  score = 0;
  random_icons = [];
  while (random_icons.length < icon_names.length){
    var n = getRandomInt(0, icon_names.length - 1);
    if (random_icons.indexOf(icon_names[n]) <= -1){
      random_icons.push(icon_names[n]);
    }
  }
  current_icon = -1;

  game_is_running = true;
  display_next_icon();
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function display_next_icon(){
  current_icon++;
  var icon_name = random_icons[current_icon];
  icon_img.setAttribute("src", "images/SVG/" + icon_name + ".svg");
}

function answer(button){
  if (!game_is_running) return;

  if (button.getAttribute("id") == random_icons[current_icon]){
    correct_answer();
  } else {
    incorrect_answer();
  }

  next_round();
}

function game_over(){
  game_is_running = false;
  icon.setAttribute("style", "display:none");
  result_incorrect.setAttribute("style", "display:none");
  result_correct.setAttribute("style", "display:none");
  if (score != 15) {
    scorediv.innerHTML = "<div><img src='images/SVG/result_" + score + ".svg' /></div>";
  } else {
    scorediv.innerHTML = '<div><img src="images/SVG/result_15.svg" />';
    download.setAttribute("style", "display:block");
    tryagain.setAttribute("style", "display:block");
  }
  gameover.setAttribute("style", "display:block");
}

function next_round(){
  if (current_icon == icon_names.length - 1){
    window.setTimeout(game_over, DELAY);
  } else {
    display_next_icon();
    window.setTimeout(function(){
      result_correct.setAttribute("style", "display:none");
      result_incorrect.setAttribute("style", "display:none");
      icon.setAttribute("style", "display:block")
    }, DELAY);
  }
}

function correct_answer(){
  score++;
  icon.setAttribute("style", "display:none");
  result_correct.setAttribute("style", "display:block");
}


function incorrect_answer(){
  icon.setAttribute("style", "display:none");
  result_incorrect.setAttribute("style", "display:block");
}
