//FUNCTIONS

    //Picks and returns a colored square(which is to be played for)
        function pickSquare(){
            var randomIndex=Math.floor(Math.random()*(colors.length));
            return colors[randomIndex];
        }

    //Returns a random colour out of all possible colors(there are millions of those)
        function pickRandomColor(){
            var r=Math.floor(Math.random()*256);
            var g=Math.floor(Math.random()*256);
            var b=Math.floor(Math.random()*256);

            return("rgb("+r+", "+g+", "+b+")");
        }

    //Makes a list of random colors(of desired size) and returns it
        function generateListOfRandomColors(size){
            var arr=[];

            for(var i=0;i<size;i++){
                arr.push(pickRandomColor());
            }

            return arr;
        }

    //Changes the colors of all squares to the correct one when the player chooses it
        function changeColorOfAllWhenPlayerWins(color){
            for(var i=0;i<listOfSquares.length;i++){
                listOfSquares[i].style.background=color;       
            }
        }

    //checks whether clicked color is equal to correct color
        function test(){
            //finding the clicked color
                var clickedColor=this.style.background;

            //running the test
                if(pickedColor===clickedColor){
                    //IF PLAYER MAKES A CORRECT GUESS
                        //Changes the message at messageDisplay
                            messageDisplay.textContent="Correct!";
                        //Changes the colors of all squares to the correct one
                            changeColorOfAllWhenPlayerWins(pickedColor);
                        //Modifies the background color of the h1
                            h1.style.background=pickedColor;
                        //Modifies the text of the resetButton
                            resetButton.textContent="Play Again";
                }else{
                    //IF PLAYER MAKES A CORRECT GUESS
                        //Fades the wrongly choosen square
                            this.style.background="#232323";
                        //Changes the message at messageDisplay
                            messageDisplay.textContent="Try Again";
                }
        }

    //changing the mode as the name suggests
        function modeChange(){
            //check if the current button isn't already choosen(current mode){if it was then we don't need to change mode}
                if(this!==modeBtns[mode]){
                    //IF IT ISN'T
                    //remove the "selected" class from both the buttons
                        modeBtns[0].classList.remove("selected");
                        modeBtns[1].classList.remove("selected");
                    //adding the "selected" class to currently selected button
                        this.classList.add("selected");
                    //updating the mode
                        mode=giveMode(this);
                    //resetting the game in the current mode
                        reset();
                }
        }

    //returns mode index of button-object passed as parameter
        function giveMode(btnObject){
            //text-content is a way to check the kind of button
                if(btnObject.textContent==="Easy"){
                    return 0;
                }else{
                    return 1;
                }
        }

    //resets the game in the currently selected mode {via variable mode}
        function reset(){
            //Generate Random Colors
                colors=generateListOfRandomColors((mode+1)*3); 
            //Pick A random color out of these
                pickedColor=pickSquare();
            //Change the display to the new color
                colorDisplay.textContent=pickedColor;
            //change colors of the square
                for(var i=0;i<6;i++){
                    //If there exists colors for a square
                        if(colors[i]){
                            //add additional colours to squares
                                listOfSquares[i].style.background=colors[i];
                            //make them all show up
                                listOfSquares[i].style.display="block";
                        }
                    //if the square needs to be hidden
                        else{
                            //hide those squares which aren't assigned colors
                                listOfSquares[i].style.display="none";
                        }
                }    
            //Changing the background of the heading
                h1.style.background="steelblue";
            //updating the text-content of reset button
                resetButton.textContent="NEW COLORS";
            //updating the text-content of message display
                messageDisplay.textContent="";
        }


//DRIVER CODE


    //Declaring Variables,Lists AND Objects

        var mode=1;
        var colors;
        var pickedColor;
        var listOfSquares=document.querySelectorAll(".square");
        var h1=document.querySelector("h1");
        var colorDisplay=document.getElementById("colorDisplay");
        var messageDisplay=document.querySelector("#message");
        var resetButton=document.querySelector("#reset");
        var modeBtns=document.querySelectorAll(".mode");


    // Setting up the game initially 
        reset();

    //Adding Event Listeners
    
        //add click Listeners to reset Button
            resetButton.addEventListener("click",reset);

        //add click Listeners to mode Buttons
            for(var i=0;i<modeBtns.length;i++){
                modeBtns[i].addEventListener("click",modeChange);
            }

        //add click Listeners to squares
            for(var i=0;i<colors.length;i++){ 
                listOfSquares[i].addEventListener("click",test)
            }
