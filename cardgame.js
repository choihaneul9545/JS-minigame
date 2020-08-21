var row = 4;
var column = 3;
var colors = [
  'tomato',
  'tomato',
  'blue',
  'blue',
  'green',
  'green',
  'purple',
  'purple',
  'pink',
  'pink',
  'black',
  'black',
];
var colorChoice = colors.slice();
var color = [];
var clickFlag = true;
var clickCard = [];
var finishCard = [];
var startTime;

function shuffle() {
  for (var i = 0; colors.length > 0; i++) {
    color = color.concat(
      colors.splice(Math.floor(Math.random() * colors.length), 1)
    );
  }
}

function cardSetting(row, column) {
  clickFlag = false;
  for (var i = 0; i < row * column; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'cardInner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    (function (c) {
      card.addEventListener('click', function () {
        if (clickFlag && !finishCard.includes(c)) {
          c.classList.toggle('flipped');
          clickCard.push(c);
          if (clickCard.length == 2) {
            if (
              clickCard[0].querySelector('.card-back').style.backgroundColor ==
              clickCard[1].querySelector('.card-back').style.backgroundColor
            ) {
              finishCard.push(clickCard[0]);
              finishCard.push(clickCard[1]);
              clickCard = [];
              if (finishCard.length == row * column) {
                var endTime = new Date();
                alert(
                  'GAME CLEAR !! AWESOME !!!' +
                    (endTime - startTime) / 1000 +
                    ' 초 걸렸습니다.'
                );
                document.querySelector('#wrapper').innerHTML = '';
                colors = [
                  'tomato',
                  'tomato',
                  'blue',
                  'blue',
                  'green',
                  'green',
                  'purple',
                  'purple',
                  'pink',
                  'pink',
                  'black',
                  'black',
                ];
                color = [];
                finishCard = [];
                startTime = null;
                shuffle();
                cardSetting(row, column);
              }
            } else {
              //두 색깔이 다르면
              clickFlag = false;
              setTimeout(function () {
                clickCard[0].classList.remove('flipped');
                clickCard[1].classList.remove('flipped');
                clickFlag = true;
                clickCard = [];
              }, 1000);
            }
          }
        }
      });
    })(card);

    document.querySelector('#wrapper').appendChild(card);
  }

  document.querySelectorAll('.card').forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function () {
    document.querySelectorAll('.card').forEach(function (card, index) {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    startTime = new Date();
  }, 4000);
}

shuffle();
cardSetting(row, column);
