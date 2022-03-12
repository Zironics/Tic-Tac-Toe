let arena=document.querySelector('.arena');
let announcement= document.querySelector('.announcement');
let start=document.querySelector('.start');
let again=document.querySelector(".playAgain");

let restart=document.querySelector(".restart");

let p1={
    id:'',
    value:'X',
    score:0
};

let p2 = {
    id:'',
    value:'O',
    score:0
};

let gameBoard=(function(){
      
    let gameboard=[['','',''],
                   ['','',''],
                   ['','','']
                  ];

    function displayBoard(){
        for(let i=0;i<3;i++)
        {
           for(let j=0;j<3;j++)
           {
            let div=document.createElement('div');
            div.setAttribute('class',`cell c-${i*10+j}`);
            if(j==0 && i==0){
                div.setAttribute("style",'border-left:none;border-top:none');
            }
            else if(i==0 && j==2){
                div.setAttribute("style",'border-top:none; border-right:none');
            }
            else if(j==2 && i==2){
                div.setAttribute("style",'border-right:none; border-bottom:none');
            }
            else if(j==0 && i==2){
                div.setAttribute("style",'border-left:none; border-bottom:none');
            } 
            else if(i==2){
                div.setAttribute("style",'border-bottom:none');
            }
            else if(j==0){
                div.setAttribute("style",'border-left:none');
            }
            else if(j==2){
                div.setAttribute("style",'border-right:none');
            }
            else if(i==0){
                div.setAttribute("style",'border-top:none');
            }
            div.textContent=gameboard[i][j];
            arena.appendChild(div);
           }
        }
    }

    function updateBoard(cell,player){
    if(cell.textContent=='')
    {
         if(player==p1)
         {
            cell.classList.remove("blue");
            cell.classList.add("red");
         } 
         else {
            cell.classList.remove("red");
            cell.classList.add("blue");
         }
        value=player.value;
        if(cell.classList.contains('c-0')){
           gameboard[0][0]=value;
           cell.textContent=value;
        }
        else if(cell.classList.contains('c-1')){
            gameboard[0][1]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-2')){
            gameboard[0][2]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-10')){
            gameboard[1][0]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-11')){
            gameboard[1][1]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-12')){
            gameboard[1][2]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-20')){
            gameboard[2][0]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-21')){
            gameboard[2][1]=value;
            cell.textContent=value;
        }
        else if(cell.classList.contains('c-22')){
            gameboard[2][2]=value;
            cell.textContent=value;
        }
        return true;
    }
    return false;
}

    function checkHorizontal(){
        for(let i=0;i<3;i++)
        {
            if(gameboard[i][0]===gameboard[i][1] 
            && gameboard[i][1]===gameboard[i][2]
            && gameboard[i][0]!='') return true;
        }

        return false;
    }
    const checkVertical = () => {
        for(let j=0;j<3;j++){
            if(gameboard[0][j]===gameboard[1][j]
            && gameboard[1][j]===gameboard[2][j]
            && gameboard[0][j]!='') return true;
        }

        return false;
    }

    const checkDiagonal = () =>{
        if(gameboard[0][0]===gameboard[1][1]
        && gameboard[1][1]===gameboard[2][2]
        && gameboard[0][0]!='') return true;

        if(gameboard[0][2]===gameboard[1][1]
        && gameboard[1][1]===gameboard[2][0]
        && gameboard[1][1]!='') return true;

        return false;
    }

    const full = () => {
        for (const key in gameboard) {
            for(const v in gameboard[key])
            if(gameboard[key][v]==='') return false;
        }
        return true;
    }

    const winCheck = () =>{
        return (checkVertical() || checkHorizontal() || checkDiagonal());
    }

    const clearGameBoard = () => {
        for (const key in gameboard)
            for(const v in gameboard[key])
               gameboard[key][v]='';
    }
    return {
        gameboard,
        displayBoard,
        updateBoard,
        winCheck,
        full,
        clearGameBoard
    }
})();

const game=(function(){
    let t=1;
    const getPlayerTurn=function(){
        if(t==1) return p1;
        return p2;
    }

    const changeTurn = () =>{
        t*=-1;
    }
    
    const draw = function(){
        announcement.textContent=`IT'S A DRAW!`;
        let options=document.querySelector(".options");
        options.classList.remove('hide');
    }

    const win = function (){
            winner=getPlayerTurn();
            announcement.textContent=`${winner.id} HAS WON!`;
            winner.score++;
            updateScore();
            let options=document.querySelector(".options");
            options.classList.remove('hide');
    }
    
    const updateAnnouncement = () =>{
        announcement.textContent=`${getPlayerTurn().id}'s Turn`;
    }

    const updateScore = () =>{
        let player1=document.querySelector('.player1');
        let player2=document.querySelector('.player2');
        let p1score=document.querySelector(".p1score");
        let p2score=document.querySelector(".p2score");

        player1.textContent=p1.id + " : ";
        player2.textContent=": " + p2.id;
        p1score.textContent=p1.score;
        p2score.textContent=p2.score+ " ";
    }

    return {
        getPlayerTurn,
        changeTurn,
        updateAnnouncement,
        updateScore,
        win,
        draw
    }
})();


gameBoard.displayBoard();
let cells=document.querySelectorAll('.cell');
cells.forEach(cell => {
cell.addEventListener('click',handleClick);
});

start.addEventListener('click',function(e){
        p1.id=document.getElementById('1').value=='' ?
        'Player 1' : document.getElementById('1').value;
        p2.id=document.getElementById('2').value=='' ?
        'Player 2' : document.getElementById('2').value;

        let overlay=document.querySelector('.overlay');
        overlay.classList.add('hide');
        let container=document.querySelector('.container');
        container.classList.add('hide');
        if(game.getPlayerTurn()==p2) game.changeTurn();
        gameBoard.clearGameBoard();
        game.updateAnnouncement();
        updateDisplay();
        game.updateScore();
});

function handleClick(e){

  if(!gameBoard.winCheck() && gameBoard.updateBoard(e.target,game.getPlayerTurn())){
    if(gameBoard.winCheck()){
        game.win();
    }
    else if(gameBoard.full()) game.draw();

    else{
        game.changeTurn();
        game.updateAnnouncement();
    }
  }
}

function updateDisplay(){
    cells.forEach(cell => {
        if(cell.classList.contains('c-0')){
            cell.textContent= gameBoard.gameboard[0][0];
         }
         else if(cell.classList.contains('c-1')){
            cell.textContent= gameBoard.gameboard[0][1];
         }
         else if(cell.classList.contains('c-2')){
            cell.textContent= gameBoard.gameboard[0][2];
         }
         else if(cell.classList.contains('c-10')){
            cell.textContent= gameBoard.gameboard[1][0];
         }
         else if(cell.classList.contains('c-11')){
            cell.textContent= gameBoard.gameboard[1][1];
         }
         else if(cell.classList.contains('c-12')){
            cell.textContent= gameBoard.gameboard[1][2];
         }
         else if(cell.classList.contains('c-20')){
            cell.textContent= gameBoard.gameboard[2][0];
         }
         else if(cell.classList.contains('c-21')){
            cell.textContent= gameBoard.gameboard[2][1];
         }
         else if(cell.classList.contains('c-22')){
            cell.textContent= gameBoard.gameboard[2][2];
         }
    });
}

function restartGame(){
    let overlay=document.querySelector(".overlay");
    overlay.classList.remove('hide');
    let container=document.querySelector(".container");
    container.classList.remove('hide');
    p1.score=0;
    p2.score=0;
    let options=document.querySelector(".options");
    options.classList.add("hide");
}

again.addEventListener('click',function(e){
    gameBoard.clearGameBoard();
    updateDisplay();
    game.changeTurn();
    game.updateAnnouncement();
    let options=document.querySelector(".options");
    options.classList.add("hide");
});

restart.addEventListener('click',restartGame);


