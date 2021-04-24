var availableMoves = 50; //zmienna przechowująca liczbę dostępnych ruchów
var moves = 0;
var score = 0;
var whichPlayer = 1;
var playerOneScore = 0;
var playerTwoScore = 0;
var computerScore = 0;
var player;
var opg;
var tpg;
var cg;
var imgs = [];
var gameImgs = [];
var selectedImgs = [];
var table = document.getElementById('game_table');
var scoreElement = document.getElementById("score");



let again = document.getElementById('newgame');
again.addEventListener('click', newGame);

function clean(){
	table.innerHTML = "";
	selectedImgs = [];
	gameImgs = [];
	imgs = [];
	score = 0;
	playerOneScore = 0;
	playerTwoScore = 0;
	computerScore = 0;
	onePlayer.className = "hiddenelement";
	twoPlayers.className = "hiddenelement";
	computer.className = "hiddenelement";
	scoreElement.textContent = "";
	scoreElement.className = "hiddenelement";
	whichPlayer = 1;
}

function newGame(){
	clean();
	choosePlayer()
}

function launchGame(){
	generateImgs();
	generateTable();
	setTimeout(HideImgs, 2000);
	player = true;
	scoreElement.className = 'element';

}


function choosePlayer(){
	let onePlayer = document.getElementById('onePlayer');
	onePlayer.className = "element2";
	onePlayer.addEventListener('click', onePlayerGame);

	let twoPlayers = document.getElementById('twoPlayers');
	twoPlayers.className = "element2";
	twoPlayers.addEventListener('click', twoPlayersGame);

	let computer = document.getElementById('computer');
	computer.className = "element2";
	computer.addEventListener('click', computerGame);
}

function onePlayerGame(){
	clean();
	launchGame();
	opg = true;
}
	

function twoPlayersGame(){
	clean();
	launchGame();
	tpg = true;
}

function computerGame(){
	clean();
	launchGame();
	cg = true;
}




function HideImgs() {
	var imgsToHide = document.getElementsByClassName('scored');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "hidden";
		}
	}
}

function update(){
	if(opg){
		document.getElementById('score').innerHTML = "Liczba odgadniętych: " + score + "/8";

	}

	if(tpg){
		document.getElementById('score').innerHTML = "Gracz 1: " + playerOneScore + " odgadniętych, gracz drugi: " 
		+ playerTwoScore + " odgadniętych. Tura gracza nr " + whichPlayer + ".";

		}


	if(cg){
		document.getElementById('score').textContent = "Gracz 1: " + playerOneScore + " odgadniętych, komputer: " 
		+ computerScore + " odgadniętych";

	}
}


function updateMove() {
	document.getElementById('moves')
	.innerHTML = "Liczba ruchów: " + moves + "/" + availableMoves;
}

//funkcja służy do wygenerowania obrazków, nic nie zmienia na stronie.
function generateImgs() { 
	imgs = [
	'assets/koty/kot1.webp', "assets/koty/kot2.jfif", 
    "assets/koty/kot3.jpg", "assets/koty/kot4.jfif", "assets/koty/kot5.jfif", 
    "assets/koty/kot6.jfif", "assets/koty/kot7.jfif", "assets/koty/kot8.webp", 
    "assets/koty/kot9.jfif"
	];
	
	//mieszamy te obrazki:
	imgs = shuffle(imgs);
	
	//i  w pętli for przypisujemy do tablicy gameImgs poszczególne obrazki, to z tej tablicy będziemy korzystać na stronie.
	for (var i = 0; i < 8; i++){
	gameImgs.push(imgs[i]);
	gameImgs.push(imgs[i]);
	}

	//jeszcze raz mieszamy obrazki:
	gameImgs = shuffle(gameImgs); 
}


//musimy wygenerować tablicę z obrazkami na stronie:
function generateTable() {
	
	var k = 0;
	
	for (var i = 0; i < 4; i++)
	{
		var row = table.insertRow(i);
		for (var j = 0; j < 4; j++)
		{
			var cell = row.insertCell(j);
			var img = document.createElement('img');
			img.id = i.toString() + j.toString();
			img.src = gameImgs[k];
			img.className = "scored";
			img.addEventListener('click',
			function (obj) {selectImg(obj.currentTarget)}, false);
			cell.appendChild(img);
			k++;
		}
	}
}

function changeTurn(){
	if(cg){
		player = !player;
		computerMove();
	}
	else if(tpg){
		player = !player;
		if(player == true){
			whichPlayer = 1;
		}
		else{
			whichPlayer = 2;
		}
	}
}
function selectImg(img) {
	if (img.className == "hidden") 
	{
		img.className = "selected"; 
		selectedImgs.push(img);
		if (selectedImgs.length == 2)
		{
			if (areTheSame(selectedImgs[0], selectedImgs[1])) 
			{
				setScored(selectedImgs[0], selectedImgs[1]);
				changeTurn();
				score++;
			}
			else 
			{
                setTimeout(function(){  
				selectedImgs[0].className = "hidden";
				selectedImgs[1].className = "hidden";
				selectedImgs = [];
			},220);
			changeTurn();
			
		}
		update();
		win();
			
			
		}
		
	}
}

function setScored(img1, img2) { 
	img1.className = "scored";
	img2.className = "scored";
	if(player){
		playerOneScore++;
	}
	else{
		playerTwoScore++;
		computerScore++;
	}
	
	selectedImgs = []; 
	
}

function computerMove(){
	var availableImgs = document.getElementsByClassName('hidden');
	var one = availableImgs[0];
	var two = availableImgs[availableImgs.length-1];
	one.className = "selected";
	two.className = "selected";
	if (areTheSame(one, two))
			{
				setScored(one, two);
				score++;
			}
			else 
			{
                setTimeout(function(){  
				one.className = "hidden";
				two.className = "hidden";
				availableImgs = [];
			},220);

}
player = !player;
}
function win(){
if(score == 8){
	if(tpg){
		if(playerOneScore > playerTwoScore){
			alert("Wygrał gracz pierwszy.");
		}
		else if(playerTwoScore > playerOneScore){
			alert("Wygrał gracz drugi.");
		}
		else{
			alert("Remis.");
				}

	}
	else if(cg){
		if(playerOneScore > computerScore){
			alert("Wygrał gracz pierwszy.");
		}
		else if(computerScore > playerOneScore){
			alert("Wygrał komputer.");
		}
		else{
			alert("Remis.");
		}

	}
	else{
		alert("Wygrana.");
	}
}
}


function areTheSame(img1, img2) {
	return img1.src == img2.src;
}

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

