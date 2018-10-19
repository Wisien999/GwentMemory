var possibleCards = ["ciri.png", "geralt.png", "iorweth.png", "jaskier.png", "triss.png", "yen.png", "zolchivay.png", "Bloodcurdling.png", "runestone.png"];
var cards = [];
var card;
var oneVisible = false;
var turnCounter = 0;
var lock = false;
var pairsLeft;
var visible_nr;
var Highscore;
var firstGame = true;
var cardTab = [];
var cardsAmount;


//function randomizeCards(cardsAmount) 
//{
//    var pairs = cardsAmount / 2;
//    var position = Math.floor(Math.random() * cardsAmount);
//        
//    if (cards[position].)
//    cards[position] = possibleCards[i];
//    ...
//}


function randomizeCards() {
    var is = 0;
    card = Math.floor(Math.random() * cardsAmount / 2);

    for (var j = 0; j < cards.length; j++)
    {
        if (possibleCards[card] == cards[j]) is++;
    }

    if (is < 2)
    {
        cards.push(possibleCards[card]);
    }
    else randomizeCards();
}

//var press = document.addEventListener("dblclick", function() {var ans = prompt("What's your secret code?"); if(ans=="skip") $('.board').html('<p><h1>You win!<br>Done in '+turnCounter+' turns</h1></p><p><button onclick="restoreBoard()">Again?</button>');});


function revealCard(nr)
{
	var opacityValue = $('#c'+nr).css('opacity');
	
	//alert('Opacity: '+opacityValue);
	
	if (opacityValue != 0 && lock == false)
	{
		lock = true;
		
		//alert(nr);

		var obraz = "url(img/" + cards[nr] + ")";
		
		$('#c'+nr).css('background-image', obraz);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');
		
		if(oneVisible == false)
		{
			//first card
			
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
            
            if (visible_nr != nr)
            {
                if(cards[visible_nr] == cards[nr])
		      	{
		      		//alert("para");
		      		
		      		setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);
		      		
		      	}
		      	else
		      	{
		      		//alert("pudło");
		      		
		      		setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);
		      	}
		      	
		      	turnCounter++;
		      	$('.score').html('Turn counter: '+turnCounter);
		      	oneVisible = false;
            }	
            else lock = false;
        }
		
	}
	
}

function hide2Cards(nr1, nr2)
{
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	
	pairsLeft--;
	
	if(pairsLeft == 0)
	{

        if(firstGame) 
        {
            $('.board').html('<p><h1>You win!<br>Done in '+turnCounter+' turns</h1></p><p><button onclick="restoreBoard()">Again?</button>');
            
            Highscore = turnCounter;
            firstGame = false;
        }
        else if (turnCounter < Highscore)
            {
                $('.board').html('<p><h1>You win!<br>Done in '+turnCounter+' turns</h1></p><p><h1 id= "highscore">NEW HIGHSCORE!</h1></p><p><button onclick="restoreBoard()">Again?</button>');
                
                Highscore = turnCounter;
            }
        else 
        {
            $('.board').html('<p><h1>You win!<br>Done in '+turnCounter+' turns</h1></p><p class="hs"><h1 id= "highscore">Highscore: ' + Highscore + '</h1></p><p><button onclick="restoreBoard()">Again?</button>');
        }
    
    }
	
    oneVisible = false;
    lock = false;
}

function restore2Cards(nr1, nr2)
{
	$('#c'+nr1).css('background-image', 'url(img/karta.png)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');	

	$('#c'+nr2).css('background-image', 'url(img/karta.png)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');
    
    lock = false;
}

function restoreBoard()
{    
    $('.board').html(''); //czyszczenie planszy
    cardTab = []; //czyszczenie tablicy obiektów kart
    
    for (var i = 0; i < cardsAmount; i++)
    {
        $('.board').html($('.board').html() + '<div class="card" id="c' + i + '"></div> '); //dodawanie kart na planszę
    }
    
    $('.board').html($('.board').html() + '<div class="score">Turn counter: 0</div>'); //dodanie scorecounter
    
    cards = [];
    
    for (var i = 0; i < cardsAmount; i++) 
    {
        randomizeCards(cardsAmount);
    }

    oneVisible = false;
    turnCounter = 0;
    pairsLeft = cardsAmount / 2;
}

function start(x) {
    var max = possibleCards.length * 2;
    
    if (x >= 4 && x <= max) {
        cardsAmount = x;   
        restoreBoard();
        
        $('.board').css('width', Math.round(cardsAmount / 3) * 150 + 'px'); 
        //if ($('.board').css('width') > $('body').css('width')) $('.board').css('width', $('body').css('width'));
        if ($('.board').css('width') < '160px') $('.board').css('width', '380px');
        
        document.addEventListener('click', (e) => {             //nasłuchiwanie kliknięcia
            for (var i = 0; i < cardsAmount; i++) {
                if (e.target && e.target.id == 'c' + i) {
                    revealCard(i);
                    break;
                }
            }
        });
        
        
    } 
    else $('#err').html('Write number between 2 and ' + possibleCards.length + '!');
    
}

function prepare(z) {
    $('#pairs').val(z);
    
    switch(z) {
        case 3:
            $('#s4-3').removeClass('boardSizeA');
            $('#s6-3').removeClass('boardSizeA');
            
            $('#s2-3').addClass('boardSizeA');
            
            break;
        case 6:
            $('#s2-3').removeClass('boardSizeA');
            $('#s6-3').removeClass('boardSizeA');
            
            $('#s4-3').addClass('boardSizeA');
            
            break;
        case 9:
            $('#s2-3').removeClass('boardSizeA');
            $('#s4-3').removeClass('boardSizeA');
            
            $('#s6-3').addClass('boardSizeA');

            break;
    }
}

$('#start').on('click', function() { start($('#pairs').val() * 2);});

$('#s2-3').on('click', function() { prepare(3);});
$('#s4-3').on('click', function() { prepare(6);});
$('#s6-3').on('click', function() { prepare(9);});