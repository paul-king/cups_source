var coins;
var cupRaised = false;
var roundsPlayed;
var winningCup;

function determineWinner(raisedCup){
	if(raisedCup == winningCup){
		playSound("woohoo.wav");
		updateCoins("win");
	} else {
		playSound("doh.wav");
		updateCoins("lose");
	}
	setTimeout(function(){
			showReplayBtn();
			if(coins == 0){
				showGameOver();	
			}
			switch(raisedCup){
				case 1:
					raiseCup(2);
					raiseCup(3);
					break;
				case 2:
					raiseCup(1);
					raiseCup(3);
					break;
				case 3:
					raiseCup(1);
					raiseCup(2);
					break;
			}
	},1000);
}

// hides the button when a new round starts to keep the user from pressing it twice in a row
function hideReplayBtn(){
	$('#replayLink').addClass("hide");
}

function lowerCups(){
	for(i = 1; i <= 3; i++)
	{
		var cur = "#cup" + i.toString();
		$(cur).animate({"top": "+=110px"}, "fast");
	}
	cupRaised = false;
}

// start game for the first time (pageLoad)
function playGame(){
	coins = 5;
	roundsPlayed = 1;
	showCoins();
	showRoundsPlayed();
	setWinningCup();
}

function playSound(soundfile){
	$("#soundSpan").html("<embed src=\"files/"+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" volume=\"5\" />");	
}

// animation call to move the cup
function raiseCup(num){
	var cur = "#cup" + num.toString();
	$(cur).animate({"top": "-=110px"}, "slow");
}

// clear exsiting winner/loser classes from #pos[number] divs
function removeClasses(){
	for(i = 1; i<=3; i++){
		var current = "#pos" + i.toString();
		$(current).removeClass("winner");
		$(current).removeClass("loser");
	}
}

function resetGame(){
	roundsPlayed++;
	hideReplayBtn();
	lowerCups();
	showRoundsPlayed();
	winningCup = null;
	setTimeout(function(){
		removeClasses();
		setWinningCup();
	}, 400);
}

// show the user's selection
function revealSelection(pick){
	if(!cupRaised){
		raiseCup(pick)
		cupRaised = true;
		determineWinner(pick);
	}
}

// loop through the cup div's, change id's accordingly
function setWinningCup(){
	winningCup = Math.floor(Math.random()*3)+1;
	for(i = 1; i<=3; i++){
		var current = "#pos" + i.toString();
		if(i == winningCup){
			$(current).addClass("winner");
		} else {
			$(current).addClass("loser");
		}
	}
}

function showCoins(){
	$('#coinWrapper').html("<img src='images/coin.png' width='50' height='50' /> : " + coins.toString());
}

function showGameOver(){
	hideReplayBtn();
	alert("GAME OVER" + '\n' + "You lasted " + roundsPlayed + " rounds!" + '\n' + "Refresh the browser to start over.");
}

//replay button only appears after the user has made a selection and the round has ended
function showReplayBtn(){
	$('#replayLink').removeClass("hide");	
}

function showRoundsPlayed(){
	$('#roundCounter').html("Rounds : " + roundsPlayed.toString());
}

function updateCoins(result){
	if(result == "win"){
		coins++;
	} else if (result == "lose"){
		coins--;
	}
	showCoins();
}