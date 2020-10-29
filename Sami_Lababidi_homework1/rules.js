/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions. 
So please sight sources if you took help from any online resource.
*/



//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9. 
Usaged: This is to store the state to the tictactoe board.
When a move is made 
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/* 
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1 

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that 
turn = 1 is for player_1 and 
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param 
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param 
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

// return true if the string is empty and false otherwise.
function empty_name(name) {
	if (name == "") {
		return true;
	}
	return false;
}

function begin_play(){

	var player1 = document.getElementById("player1_id");
	var player2 = document.getElementById("player2_id");

	// If either player name is empty, exit the function and alert user. 
	if (empty_name(player1.value) || empty_name(player2.value)) {
		alert("Name Cannot Be Empty");
		return;
	}

	// If function did not exit, start the game.
	player1.value = player1.value + " (X)";
	player2.value = player2.value + " (O)";
	player1.disabled = true;
	player2.disabled = true;

	started = true;

	// update the turn information on the page, start with player X
	document.getElementById("turn_info").innerHTML = "Turn for: X";
	
}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the strated flag as false

*/
function reset_play(){

	// Clear input boxes
	clear_box("player1_id");
	clear_box("player2_id");
	clear_box("move_text_id");

	// Reset the turn message
	document.getElementById("turn_info").innerHTML = "Game has not begin.";

	started = false;

	// This function will reset the tic tac toe table to the default values.
	reset_game_table();

	board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1];


}

// This function will remove the values from the box
function clear_box(box_id) {
	var box = document.getElementById(box_id);
	box.value = "";
	box.disabled = false;
}

function reset_game_table() {
	table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
	for (var i = 0; i < table_ids.length; i++) {
		document.getElementById(table_ids[i]).innerHTML = table_ids[i];
	}
}
/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework) 
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/

var input_index;
 

function play() {


	var player_input = document.getElementById("move_text_id").value;

	if(!valid_input(player_input)) {
		alert("Invalid Input, Please Try Again");
		return;
	}

	if (whose_move() == 1) {
		cell = table_ids[input_index];
		board_state[input_index] = 1;
		document.getElementById(cell).innerHTML = "X";
		document.getElementById("turn_info").innerHTML = "Turn for: O";
	} else {
		cell = table_ids[input_index];
		board_state[input_index] = 0;
		document.getElementById(cell).innerHTML = "O";
		document.getElementById("turn_info").innerHTML = "Turn for: X";
	}
	document.getElementById("move_text_id").value = "";

	if (game_over()) {
		if (whose_move() == 1) {
			alert("The winner is: " + document.getElementById("player1_id").value);
		} else {
			alert("The winner is: " + document.getElementById("player2_id").value);
		}
		reset_play();
	}
	turn = (turn+1)%2;
	
}

function game_over() {
	var winning_list = [
					[0, 1, 2],
					[3, 4, 5],
					[6, 7, 8],
					[0, 3, 6],
					[1, 4, 7],
					[2, 5, 8],
					[0, 4, 8],
					[2, 4, 6],
				   ];

	for (var i = 0; i < winning_list.length; i++) {
		var cell1 = board_state[winning_list[i][0]];
		var cell2 = board_state[winning_list[i][1]];
		var cell3 = board_state[winning_list[i][2]];
		if ((cell1 == cell2) && (cell2 == cell3) && (cell1 != -1) ) {
			return true;
		}
	}
}

function valid_input(text) {
	var valid = false;
	for (var i = 0; i < table_ids.length; i++) {
		if ((table_ids[i] == text) && (board_state[i] == -1)) {valid = true; input_index = i; break;}
	}
	return valid;
}

/*
Do not change this method.
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
