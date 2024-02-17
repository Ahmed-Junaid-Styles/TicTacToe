
//vars
var pl_one = document.querySelector('.one')
var pl_two = document.querySelector('.two')
var pl_sel = document.querySelector('.pl-sel')
var pl_btn = document.querySelectorAll('.pl-btn')
var body = document.querySelector('body')
var sm_btn = document.querySelectorAll('.sm-btn')
var sm_sel = document.querySelector('.sm-sel')
var sel_cnt = document.querySelector('.sel-cnt')
var sm1 = document.querySelector('.sm1')
var sm2 = document.querySelector('.sm2')
var game = document.querySelector('.game')
var reset = document.querySelector('.reset')
var td = document.querySelectorAll('.td')
var colX = document.querySelector('.x')
var colO = document.querySelector('.o')
var turns = document.querySelector('.turns')
var board = document.querySelector('.board')
var result = document.querySelector('.result')
var turn;
var myTurn
var botTurn
var now = true;
var gameover = false

//reset
reset.addEventListener('click', ()=>{
    window.location.reload()
})
//functions
function Win(){
    if((td[0].innerText == td[1].innerText && td[1].innerText == td[2].innerText && td[0].innerText != '') || (td[3].innerText == td[4].innerText && td[4].innerText == td[5].innerText && td[3].innerText != '') || (td[6].innerText == td[7].innerText && td[7].innerText == td[8].innerText && td[6].innerText != '') || (td[0].innerText == td[4].innerText && td[0].innerText == td[8].innerText && td[0].innerText != '') || (td[2].innerText == td[4].innerText && td[2].innerText == td[6].innerText && td[2].innerText != '')){
        return true;
    }else if((td[0].innerText == td[3].innerText && td[0].innerText == td[6].innerText && td[0].innerText != '') || (td[1].innerText == td[4].innerText && td[4].innerText == td[7].innerText && td[1].innerText != '') || (td[2].innerText == td[5].innerText && td[2].innerText == td[8].innerText && td[2].innerText != '')){
        return true;
    }else if((td[0].innerText != '') && (td[1].innerText != '') && (td[2].innerText != '') && (td[3].innerText != '') && (td[4].innerText != '') && (td[5].innerText != '') && (td[6].innerText != '') && (td[7].innerText != '') && (td[8].innerText != '')){
        return true;
    }else{
        return false;
    }
}
function Turn(){
    return turn=='X'?'O':'X'
}
function changeTurnMy(){
    return myTurn == true?false:true
}
function changeTurnBot(){
    return botTurn == true?false:true
}
function Now(){
    return now == true?false:true
}
function bot(){
    if(gameover == false && botTurn == true){
        setTimeout(()=>{
        let arr=[]
        for(let i=0;i<td.length;i++){
            if(td[i].innerText == ''){
                arr.push(i)
            }
        }
        random = Math.floor(Math.random()*arr.length)
        td[arr[random]].innerText = turn
        td[arr[random]].style.pointerEvents = 'none'
        turn = Turn()
        if(turn == 'O'){
            colO.style.animation = 'twinkle .8s linear 0s infinite'
            colX.style.animation = ''
        }else if(turn == 'X'){
            colX.style.animation = 'twinkle .8s linear 0s infinite'
            colO.style.animation = ''
        }
        myTurn = changeTurnMy()
        botTurn = changeTurnBot()
        now = Now()
        Win()
        if(Win()==true){
                colX.style.animation = ''
                colO.style.animation = ''
                turn = Turn()
            for(let i=0; i<td.length;i++){
                    td[i].style.pointerEvents = 'none'
                }
                setTimeout(()=>{
                    board.style.display = 'none'
                    result.innerText = `Player ${turn} won the game`
                    result.style.marginTop = '40vh'
                    reset.style.scale = 1.2
                }, 700)
            }
        }, 700)
    }
}
function stop(){
      Array.from(td).forEach((e)=>{
          e.style.pointerEvents = 'none'
      })
}


//Arrays forEach
Array.from(pl_btn).forEach((e)=>{
    e.addEventListener('click', ()=>{
        pl_sel.style.display = 'none'
        sm_sel.style.opacity = '.5'
        setTimeout(()=>{
            sm_sel.style.opacity = '1'
        }, 200)
        
    })
})

Array.from(sm_btn).forEach((f)=>{
    f.addEventListener('click', ()=>{
        sm_sel.style.display = 'none'
        game.style.display = 'inline'
    })
})

//EventListeners
pl_one.addEventListener('click',()=>{
    game.classList.add('one-player')
})
pl_two.addEventListener('click',()=>{
    game.classList.add('two-player')
})
sm1.addEventListener('click',()=>{
    turn = 'X'
    colX.style.animation = 'twinkle .8s linear 0s infinite'
    botTurn = false
    myTurn = true
})
sm2.addEventListener('click',()=>{
    if(game.classList.contains('one-player')){
        turn = 'X'
    colX.style.animation = 'twinkle .8s linear 0s infinite'
    botTurn = true
    myTurn = false
    bot()
    now = Now()
    }
    else if(game.classList.contains('two-player')){
        turn = 'O'
        colO.style.animation = 'twinkle .8s linear 0s infinite'
        myTurn = true
    }
})
Array.from(td).forEach((e)=>{
    e.addEventListener('click', ()=>{
        if(now == true && gameover == false){
            if(myTurn == true){
            e.innerText = turn
                e.style.opacity = '.8'
            e.style.pointerEvents = 'none'
            turn = Turn()
            if(turn == 'O'){
                colO.style.animation = 'twinkle .8s linear 0s infinite'
                colX.style.animation = ''
            }else if(turn == 'X'){
                colX.style.animation = 'twinkle .8s linear 0s infinite'
                colO.style.animation = ''
            }
                Win()
            myTurn = changeTurnMy()
            botTurn = changeTurnBot()
                now = Now()
        }
        if(game.classList.contains('one-player') && botTurn == true && Win()==false){
            bot()
        }else if(game.classList.contains('two-player')){
            myTurn = changeTurnMy()
            now = Now()
        }
            if(Win()==true){
                colX.style.animation = ''
                colO.style.animation = ''
                turn = Turn()
                for(let i=0; i<td.length;i++){
                    td[i].style.pointerEvents = 'none'
                }
                setTimeout(()=>{
                    board.style.display = 'none'
                    result.innerText = `Player ${turn} won the game`
                    result.style.marginTop = '40vh'
                    reset.style.scale = 1.2
                }, 700)
            }
        }
        
    })
})



