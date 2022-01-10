//This variable keeps thack of whose turn it is
let activePlayer = 'x';
//storing moves made
let selectedSquares = [];

//this funtion is for placing an x or o in a square
    function placeXOrO (squareNumber) {
        //this condition ensures a square hasn't been selected already.
        //the .some() method is used to check each element of selectedSquare array
        //to see if it contains the square number clicked on.
        if (!selectedSquares.some(element => element.includes(squareNumber))){
            //this retrieves the html element id that was clicked
            let select = document.getElementById(squareNumber);
            //this checks to see who's turn it is
            if (activePlayer === 'x') {
            //If active player is equal to x.pkg, the x.png is placedin HTMLp
            select.style.backgroundImage = "url('images/x.png')";
            }
            else {
                //If actvePlayer is equal to '0', the 0.png is placed in the png
                select.style.backgroundImage ='url("images/o.png")';
            }

            //squareNumber and activePlayer are concatenated together and added 

            selectedSquares.push(squareNumber + activePlayer);
            //this calls a fenction to check for any win conditions
            checkWinCondtition();
            //checks for active player
            if (activePlayer === 'x') {
                activePlayer = 'o';
            }
            else {
                activePlayer = 'x';
            }
        

            //this adds sound
            audio('../media/place.mp3');
            if (activePlayer === 'O'){
                //This portion disables the ability to click while the computer makes its move
                disableClick();
                //This function delays the computer. It'll take one second to make a move
                setTimeout(function () { computersTurn(); },1000)
            }
        }

        function computersTurn() {
            //boolean is needed for our while loop
            let success = false;
            //this variable stares a random number 0-8
            let pickSquare;
            //this allows the while loop to keep trying if a square in selected already.
            while(!success) {
                //random number between 0-8
                pickSquare = String(Math.floor(Math.random()*9));
                //evaluates if the square has been taken or not
                if (placeXOrO(pickSquare)){
                    //calling for function
                    placeXOrO(pickSquare);
                    success = true;
                };
            }
        }
    }


    function checkWinCondtition() {
        //X
        if (arrayIncludes('0x', '1x', '2x')) { drawWinLine(50,100,558,100)}
        else if (arrayIncludes('3x', '4x', '5x')) { drawWinLine(50,304,558,304)}
        else if (arrayIncludes('6x', '7x', '8x')) { drawWinLine(50,508,558,508)}
        else if (arrayIncludes('0x', '3x', '6x')) { drawWinLine(100,50,100,558)}
        else if (arrayIncludes('1x', '4x', '7x')) { drawWinLine(304,50,304,558)}
        else if (arrayIncludes('2x', '5x', '8x')) { drawWinLine(508,50,508,558)}
        else if (arrayIncludes('0x', '4x', '8x')) { drawWinLine(100,100,520,520)}
        else if (arrayIncludes('2x', '4x', '6x')) { drawWinLine(510,508,100,90)}
        //O
        else if (arrayIncludes('0o', '1o', '2o')) { drawWinLine(50,100,558,100)}
        else if (arrayIncludes('3o', '4o', '5o')) { drawWinLine(50,304,558,304)}
        else if (arrayIncludes('6o', '7o', '8o')) { drawWinLine(50,508,558,508)}
        else if (arrayIncludes('0o', '3o', '6o')) { drawWinLine(100,50,100,558)}
        else if (arrayIncludes('1o', '4o', '7o')) { drawWinLine(304,50,304,558)}
        else if (arrayIncludes('2o', '5o', '8o')) { drawWinLine(508,50,508,558)}
        else if (arrayIncludes('0o', '4o', '8o')) { drawWinLine(100,100,520,520)}
        else if (arrayIncludes('2o', '4o', '6o')) { drawWinLine(510,508,100,90)}
        //this portion checks for a tie. It'll determin this when all squares are taken
        else if (selectedSquares.length >= 9) {
            audio('../media/tie.mp3');
            setTimeout(function () { resetGame();},1000);
        }
    }

    function arrayIncludes(sa, sb, sc) {
        //this will check to see if you or the computer has won
        const a = selectedSquares.includes(sa);
        const b = selectedSquares.includes(sb);
        const c = selectedSquares.includes(sc);
        //if all is true, return true
        if (a === true && b === true && c === true) {return true}
    }