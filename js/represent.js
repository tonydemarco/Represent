/*
Released under the terms of the GNU General Public License version 2.0 (or later)

Copyright: Felipe C. da S. Sanches <juca@members.fsf.org>
           Tony de Marco <tony@garoa.tv>
           Afonso Coutinho <afonso@yack.com.br>
           Tamys Guimarães <tamys.guimaraes@gmail.com>
           Erin Pinheiro Manal <erin.pinheiro@usp.br>
*/

const DELAY = 1000;

var score,
    scorediv,
    game_is_running = false,
    game_mode = 'guess',
    topo,
    intro,
    learn,
    guess,
    buttons,
    icon,
    icon_img,
    result_correct,
    result_incorrect,
    gameover,
    current_icon,
    download,
    tryagain,
    random_icons,
    share_msg,
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
  topo = document.getElementById("topo");
  intro = document.getElementById("intro");
  learn = document.getElementById("learn");
  guess = document.getElementById("guess");
  buttons = document.getElementById("buttons");
  icon = document.getElementById("icon");
  icon_img = document.getElementById("icon_img");
  result_correct = document.getElementById("result_correct");
  result_incorrect = document.getElementById("result_incorrect");
  gameover = document.getElementById("gameover");
  scorediv = document.getElementById("score");
  download = document.getElementById("download");
  tryagain = document.getElementById("tryagain");

  download.setAttribute("style", "display:none");

  guess.onclick = new_game;
  learn.onclick = start_learn;
  var fb = document.getElementById("facebook").onclick = function(){ window.open("http://www.facebook.com/sharer.php?u=http://www.justintype.com/represent&quote=" + share_msg)};
  var tw = document.getElementById("twitter").onclick = function () { window.open("http://twitter.com/share?url=http://www.justintype.com/represent&text=" + share_msg)};
  download.onclick = function () { window.open("http://www.justintype.com.br/free/represent/RepresentSans-Regular.otf.zip")};
  tryagain.onclick = function () {
    gameover.setAttribute("style", "display:none");
    intro.setAttribute("style", "display:block");
    download.setAttribute("style", "display:none");
  };
  window.onresize = keep_aspect_ratio;
  keep_aspect_ratio();
}

// resize body to fit aspect ratio
function keep_aspect_ratio() {
  var body = document.body;
  var original_height = screen.height;
  var original_width = screen.width;
  if(original_width > original_height * (42/53)) {
    var height = original_height;
    var width = height * (42/53);
  } else {
    var width = original_width;
    var height = width * (53/42);
  }
  document.body.setAttribute("style", "width:"+width+";height:"+height);
}

function new_game(){
  intro.setAttribute("style", "display:none");
  icon.setAttribute("style", "display:block");
  buttons.setAttribute("style", "display:block");

  score = 0;
  random_icons = [];
  while (random_icons.length < icon_names.length){
    var n = getRandomInt(0, icon_names.length - 1);
    if (random_icons.indexOf(icon_names[n]) <= -1){
      random_icons.push(icon_names[n]);
    }
  }
  current_icon = -1;

  game_mode = 'guess'
  game_is_running = true;
  display_next_icon();
}

// learn mode, labels simply change icon to corresponding one
function start_learn() {
  // hide intro
  intro.setAttribute("style", "display:none");
  // show icon and buttons
  icon.setAttribute("style", "display:block");
  buttons.setAttribute("style", "display:block");
  // change header to arrow
  topo.setAttribute("src", "images/SVG/topo_learn.svg");
  topo.onclick = return_to_intro;

  game_mode = 'learn'
  game_is_running = true;
}

// end game, return to intro screen
function return_to_intro() {
  // hide intro
  intro.setAttribute("style", "display:block");
  // show icon and buttons
  icon.setAttribute("style", "display:none");
  buttons.setAttribute("style", "display:none");
  // change header to arrow
  topo.setAttribute("src", "images/SVG/topo.svg");
  topo.onclick = null;
  // reset icon
  icon_img.setAttribute("src", "images/SVG/correct.svg");

  game_is_running = false;
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
  var button_id = button.getAttribute("id")
  if(game_mode == 'guess') {
    if (button_id == random_icons[current_icon]){
      correct_answer();
    } else {
      incorrect_answer();
    }
    next_round();
  } else if(game_mode == 'learn') {
    icon_img.setAttribute("src", "images/SVG/" + button_id + ".svg");
  }
}

function game_over(){
  game_is_running = false;
  // message to be shared
  share_msg = "I got " + score + " out of 15! How many symbols can you name?"

  icon.setAttribute("style", "display:none");
  buttons.setAttribute("style", "display:none");
  result_incorrect.setAttribute("style", "display:none");
  result_correct.setAttribute("style", "display:none");
  if (score != 15) {
    scorediv.innerHTML = "<div><img src='images/SVG/result_" + score + ".svg' /></div>";
  } else {
    scorediv.innerHTML = '<div><img src="images/SVG/result_15.svg" />';
    download.setAttribute("style", "display:block");
  }
  gameover.setAttribute("style", "display:block");

  // reset icon
  icon_img.setAttribute("src", "images/SVG/correct.svg");
}

function next_round(){
  if (current_icon == icon_names.length - 1){
    window.setTimeout(game_over, DELAY);
  } else {
    // disabling the game and then re-enabling it prevents breakage due to fast clicking
    game_is_running = false;
    display_next_icon();
    window.setTimeout(function(){
      game_is_running = true;
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
