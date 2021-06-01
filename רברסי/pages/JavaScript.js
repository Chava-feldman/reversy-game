
//צלילי מקשי לוח רברסי
var beep = new Audio();
var place = new Audio();
var invalid = new Audio();
beep.src = "../style/button-21.mp3";
place.src = "../style/button-16.mp3";
invalid.src = "../style/button-24.mp3";


let ifCheck = false;//בדיקה האם זה שחקן יחיד
let flag = true;//בדיקה אם המשחק עדיין עבד
const inputNumSize = document.querySelectorAll('#inputNumberSize');
let size = 10;
const matrix = [];

let name1 = "שחקן א", name2 = "שחקן ב";

const playerNow = {
    'name': 'שחקן א',
    'color': 'red'
}
const player = {
    'name': 'שחקן ב',
    'color': 'white'
}

let first = false, last, lastRow, lastCol;
let sumRed, sumWhite, lastSumRed, lastSumWhite;

const div = document.querySelector('#luach');
const inputs = document.querySelectorAll('.in');
const placeGoPlay = document.querySelector('#newPl');
const startPlayBtns = document.querySelectorAll('#startPlay');

//צליל בלחיצה תקינה
var tilePlaceSound = function () {
    place.play();
}
//צליל בלחיצה לא תקינה
var invalidPlaceSound = function () {
    invalid.play();
}

//הוספת ארועים
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', localName);
}
for (let i = 0; i < inputNumSize.length; i++) {
    inputNumSize[i].addEventListener('keyup', function () { sizeTable()})
}
for (let i = 0; i < startPlayBtns.length; i++) {
    startPlayBtns[i].addEventListener('click', function () { goToPlay(); createBtnStartPlay(); })
}
document.getElementById('askBtn1').addEventListener('click', function () {
    document.getElementById('askLastPlay').style.display = 'none'
})
document.getElementById('askBtn2').addEventListener('click', function () {
    yesLastPlay(); createBtnStartPlay()
})

//כפתורים בהודעת סיום המשחק
const newp = document.querySelector('.new');
newp.addEventListener('click', function () {
    document.getElementById('id01').style.display = 'none'
    deleteLocalStorage();
    startNewPlay();
});
const close = document.querySelector('.close');
close.addEventListener('click', aaaaa);
function aaaaa() {
    const doc = document.getElementById('body2');
    doc.innerHTML = '';
    document.getElementById('gif').style.display = 'block';
    
}
//הסתרת כפתורי סוג המשחק לאחר הבחירה 
const onePlayerBtn = document.querySelectorAll('.type2');
for (let i = 0; i < onePlayerBtn.length; i++) {
    onePlayerBtn[i].addEventListener('click', onePlayer);
}


//פונקציה לשמירת השמות מהמשתמש
function localName(e) {
    if (e.target.id == "sachkanA") {
        playerNow.name = e.target.value;
        player.name = "מחשב";
        name1 = e.target.value;
        name2 = "מחשב";
    }
    else if (e.target.id == "sachkanB") {
        player.name = e.target.value;
        name2 = e.target.value;
    }
    localStorage.setItem('name1', name1);
    localStorage.setItem('name2', name2);
}
//מחיקית נתונים שמורים
function deleteLocalStorage() {
    localStorage.setItem('name1', 'שחקן א');
    localStorage.setItem('name2', 'שחקן ב');
    localStorage.setItem('size', 10);
    localStorage.setItem('flag', false);
}

//הקפצת שאלת משחק קודם
setTimeout(isLastPlay, "1500");

//לא המשך משחק קודם
function isLastPlay() {
    if (localStorage.getItem('size') > 0) {
        document.getElementById('askLastPlay').style.display = 'block';
        //deleteLocalStorage();
    }
}
//המשך משחק קודם
function yesLastPlay() {
    document.getElementById('askLastPlay').style.display = 'none';
    name1 = localStorage.getItem('name1');
    name2 = localStorage.getItem('name2');
    ifCheck = localStorage.getItem('flag');
    size = localStorage.getItem('size');
    goToPlay();
}
// יצירת גודל הלוח בהתאם לבחירת המשתמש
function sizeTable() {
    size = inputNumSize[0].value >= 4 ? inputNumSize[0].value : inputNumSize[1].value;
    if (size % 2 != 0)
        size = parseInt(size) + 1;
    localStorage.setItem('size', size);

}
//פונקציה ליצירת כפתור להתחלת משחק חדש
function createBtnStartPlay() {
   
    const btn = document.createElement('button');
    btn.setAttribute('id', 'startPlay2');
    btn.innerHTML = 's<br/>t<br/>a<br/>r<br/>t<br/><br/>n<br/>e<br/>w<br/><br/>g<br/>a<br/>m<br/>e<br/>';
    placeGoPlay.appendChild(btn);
    btn.addEventListener('click', startNewPlay);
}
//פונקציה ליצירת לוח המשחק בפעם הראשונה
function goToPlay() {
    if (ifCheck) {
        player.name = 'מחשב';
        localStorage.setItem('name2', 'מחשב');
    }
    const details = document.querySelector('#details');
    const out = document.querySelector('#outDiv');
    out.innerHTML = '';
    details.remove("#details");
    createTable();
}
//פונקציה להתחלת משחק חדש
function startNewPlay() {
    div.innerHTML = '';
    flag = true;
    createTable();
    playerNow[name1, 'red']
    player[name2, 'white']
    playerNow.name = name1;
    playerNow.color = 'red';
    player.name = name2;
    player.color = 'white';
    points();

}

//יצירת לוח המשחק
function createTable() {
    const btnNewPlay = document.querySelector('#newPl');
    let table = document.createElement('table');

    for (let i = 1; i <= size; i++) {
        matrix[i] = [];
        const tr = document.createElement('tr');
        for (let j = 1; j <= size; j++) {
            const td = document.createElement('td');
            matrix[i][j] = td;
            matrix[i][j].addEventListener('click', function (e) { if (checkTwoColors(e.target, 'tdClass') && flag) stage(i, j, event) });
            td.classList.add('tdClass');
            if (i == j && (i == size / 2 || i == size / 2 + 1))
                td.classList.replace('tdClass', 'red');
            if ((i == size / 2 && j == size / 2 + 1) || (i == size / 2 + 1 && j == size / 2))
                td.classList.replace('tdClass', 'white');

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    div.appendChild(table);
    points();
}

//שלב במשחק
function stage(i, j, event) {
    //כשהלחיצה לא תקינה
    if (matrix[i][j].classList != 'tdClass' || !(checkPositive(i, j))) {
        invalidPlaceSound();
        return;
    }
    else
        changePlayer();
    points();
    if (ifCheck)
        setTimeout("computer()", "1000");
}

//שליחה לבדיקת כל הכוונים
function checkPositive(i, j) {
    let ok = [];
    ok.push(up(i, j, false));
    ok.push(down(i, j, false));
    ok.push(right(i, j, false));
    ok.push(left(i, j, false));
    ok.push(upRight(i, j, false));
    ok.push(upLeft(i, j, false));
    ok.push(downRight(i, j, false));
    ok.push(downLeft(i, j, false));
    for (let i = 0; i < ok.length; i++) {
        if (ok[i] == 10) return true;
    }
    return false;
}
//////////////////////////////////////////////////////////////////////////////////////////////
// פונקציות של הכיוונים/////////////////////////////////////////////////////////////////////
function up(i, j, checkPossibleSteps) {
    first = false;
    if (i != 1 && checkTwoColors(matrix[i - 1][j], player.color))
        first = true;
    for (let x = i - 2; x > 0 && first && !(checkTwoColors(matrix[x][j], 'tdClass')); x--) {
        if (checkTwoColors(matrix[x][j], playerNow.color)) {
            last = x;
            if (checkPossibleSteps)
                return i - last;
            for (let y = i; y > last; y--) {
                changeColor(matrix[y][j], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}

function down(i, j, checkPossibleSteps) {
    first = false;
    if (i != size && checkTwoColors(matrix[i + 1][j], player.color))
        first = true;
    for (let x = i + 2; x <= size && first && !(checkTwoColors(matrix[x][j], 'tdClass')); x++) {
        if (checkTwoColors(matrix[x][j], playerNow.color)) {
            last = x;
            if (checkPossibleSteps)
                return last - i;
            for (let y = i; y < last; y++) {
                changeColor(matrix[y][j], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return - 1;
}

function right(i, j, checkPossibleSteps) {
    first = false;
    if (j != size && checkTwoColors(matrix[i][j + 1], player.color))
        first = true;
    for (let x = j + 2; x <= size && first && !(checkTwoColors(matrix[i][x], 'tdClass')); x++) {
        if (checkTwoColors(matrix[i][x], playerNow.color)) {
            last = x;
            if (checkPossibleSteps)
                return last - j;
            for (let y = j; y < last; y++) {
                changeColor(matrix[i][y], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}

function left(i, j, checkPossibleSteps) {
    first = false;
    if (j != 1 && checkTwoColors(matrix[i][j - 1], player.color))
        first = true;
    for (let x = j - 2; x > 0 && first && !(checkTwoColors(matrix[i][x], 'tdClass')); x--) {
        if (checkTwoColors(matrix[i][x], playerNow.color)) {
            last = x;
            if (checkPossibleSteps)
                return j - last;
            for (let y = j; y > last; y--) {
                changeColor(matrix[i][y], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}

function upRight(i, j, checkPossibleSteps) {
    first = false;
    if (i != 1 && j != size && checkTwoColors(matrix[i - 1][j + 1], player.color))
        first = true;
    for (let x = i - 2, y = j + 2; x > 0 && y <= size && first && !(checkTwoColors(matrix[x][y], 'tdClass')); x-- , y++) {
        if (checkTwoColors(matrix[x][y], playerNow.color)) {
            lastRow = x; lastCol = y;
            if (checkPossibleSteps)
                return i - x;
            for (let p = i, q = j; p > lastRow && q < lastCol; p-- , q++) {
                changeColor(matrix[p][q], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}

function upLeft(i, j, checkPossibleSteps) {
    first = false;
    if (i != 1 && j != 1 && checkTwoColors(matrix[i - 1][j - 1], player.color))
        first = true;
    for (let x = i - 2, y = j - 2; x > 0 && y > 0 && first && !(checkTwoColors(matrix[x][y], 'tdClass')); x-- , y--) {
        if (checkTwoColors(matrix[x][y], playerNow.color)) {
            lastRow = x; lastCol = y;
            if (checkPossibleSteps)
                return i - x;;
            for (let p = i, q = j; p > lastRow && q > lastCol; p-- , q--) {
                changeColor(matrix[p][q], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}

function downRight(i, j, checkPossibleSteps) {
    first = false;
    if (i != size && j != size && checkTwoColors(matrix[i + 1][j + 1], player.color))
        first = true;
    for (let x = i + 2, y = j + 2; x <= size && y <= size && first && !(checkTwoColors(matrix[x][y], 'tdClass')); x++ , y++) {
        if (checkTwoColors(matrix[x][y], playerNow.color)) {
            lastRow = x; lastCol = y;
            if (checkPossibleSteps)
                return x - i;
            for (let p = i, q = j; p < lastRow && q < lastCol; p++ , q++) {
                changeColor(matrix[p][q], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}

function downLeft(i, j, checkPossibleSteps) {
    first = false;
    if (i != size && j != 1 && checkTwoColors(matrix[i + 1][j - 1], player.color))
        first = true;
    for (let x = i + 2, y = j - 2; x <= size && y > 0 && first && !(checkTwoColors(matrix[x][y], 'tdClass')); x++ , y--) {
        if (checkTwoColors(matrix[x][y], playerNow.color)) {
            lastRow = x; lastCol = y;
            if (checkPossibleSteps)
                return x - i;
            for (let p = i, q = j; p < lastRow && q > lastCol; p++ , q--) {
                changeColor(matrix[p][q], playerNow.color);
            }
            endLop();
            return 10;
        }
    }
    return -1;
}
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


//ספירת סה"כ הנקודות שצברו עד כה 2 השחקנים
function points() {
    lastSumRed = sumRed; lastSumWhite = sumWhite;
    sumRed = document.querySelectorAll('.red').length;
    sumWhite = document.querySelectorAll('.white').length;
    document.getElementById('points').innerHTML = name1 + ': ' + sumRed + ' , ' + name2 + ': ' + sumWhite + ' ';
}
//מפסיק לולאה לאותו הכוון
function endLop() {
    first = false;
}
// מחליף שחקן ובודק האם ישנם שלבים לשחן הנוכחי לבצע
function changePlayer() {
    tilePlaceSound();
    let changePlayersColor = player.color;
    player.color = playerNow.color;
    playerNow.color = changePlayersColor;

    changePlayersColor = playerNow.name;
    playerNow.name = player.name;
    player.name = changePlayersColor;

    //בדיקת המקרה בו אין לשחקן שלבים לבצע
    if (possibleSteps() == 0)
        setTimeout("endPlay()", "1000");
}
//בדיקת צבע התא עם צבע השחקן
function checkTwoColors(td, color) {
    if (td.classList == color)
        return true;
    return false;
}
// החלפת צבע התא לצבע השחקן
function changeColor(td, color) {

    td.setAttribute('class', color);
}

//בדיקה כמה מקומות רלונטים ללחיצה עבור השחקן הנוכחי
function possibleSteps() {
    console.log('possibleSteps');
    let cntPossibleSteps = 0;
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            if (checkTwoColors(matrix[i][j], 'tdClass')) {
                if (up(i, j, true) > 0 ||
                    down(i, j, true) > 0 ||
                    right(i, j, true) > 0 ||
                    left(i, j, true) > 0 ||
                    upRight(i, j, true) > 0 ||
                    upLeft(i, j, true) > 0 ||
                    downRight(i, j, true) > 0 ||
                    downLeft(i, j, true) > 0)
                    cntPossibleSteps++;
            }
        }
    }

    return cntPossibleSteps;
}
//פונקציה שמחזירה מערך שבכל מקום מופיע כמה אפשר להרויח מהכוון הזה
function direction(i, j) {
    let trueOrfalse = [];
    trueOrfalse[1] = up(i, j, true);
    trueOrfalse[2] = down(i, j, true);
    trueOrfalse[3] = right(i, j, true);
    trueOrfalse[4] = left(i, j, true);
    trueOrfalse[5] = upRight(i, j, true);
    trueOrfalse[6] = upLeft(i, j, true);
    trueOrfalse[7] = downRight(i, j, true);
    trueOrfalse[8] = downLeft(i, j, true);
    return trueOrfalse;
}
//חישוב סה"כ המשבצות שאפשר יכול להרויח ע"י הפיכת משבצת מסוימת
function calcSumFromDirections(trueOrfalse) {
    let sum = 0, cnt = 0;
    for (let p = 0; p < trueOrfalse.length; p++) {
        if (trueOrfalse[p] > 0) {
            sum += trueOrfalse[p];
            cnt++;
        }
    }
    sum > 0 ? sum - cnt + 1 : sum;
    return sum;
}
//מציאת המקום המקסימלי שהכי משתלם לקומפיוטר להפוך שם
function maxPlace(cntMat) {
    let max = -9, maxI = -1, maxJ = -1;
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            if (cntMat[i][j] > max) {
                max = cntMat[i][j];
                maxI = i;
                maxJ = j;
            }
        }
    }
    //שליחה לפונקציה שמבצעת את הפיכת הצבעים עבור הפיכת המקום הנל שהמחשב בחר
    computerColor(maxI, maxJ);
}
//ביצוע המהלך שבחר המחשב
function computerColor(maxI, maxJ) {
    up(maxI, maxJ, false);
    down(maxI, maxJ, false);
    right(maxI, maxJ, false);
    left(maxI, maxJ, false);
    upRight(maxI, maxJ, false);
    upLeft(maxI, maxJ, false);
    downRight(maxI, maxJ, false);
    downLeft(maxI, maxJ, false);
}
//מהלך המחשב
function computer() {
    if (!(flag))
        return;
    let cntMat = [];
    for (let row = 1; row <= size; row++) {
        cntMat[row] = [];
        for (let col = 1; col <= size; col++ , cnt = 0, sum = 0) {
            //כשהמקום הנוכחי בלוח המשחק אינו מתאים ללחיצה
            if (!(checkTwoColors(matrix[row][col], 'tdClass')))
                cntMat[row][col] = 0;
            // כשהמקום בלוח חוקי והוא בצידי הלוח ,הגדלת הרווח כדי להגדיל את הסיכוי לניצחון
            else if (row == 1 || row == size || col == 1 || col == size) {
                cntMat[row][col] = (calcSumFromDirections(direction(row, col)));
                cntMat[row][col] > 0 ? cntMat[row][col] + 5 : cntMat[row][col];
            }
            else
                cntMat[row][col] = calcSumFromDirections(direction(row, col));
        }
    }
    maxPlace(cntMat);//שליחה לבדיקת המקום המשלם ביותר ללחיצה
    changePlayer();//שליחה להחלפת שחקן
    points();//ספירת נקודות 2 השחקנים
}

//מוחק רת הכפתורים להכנה לאינפוטים
function onePlayer(e) {
    const div = document.querySelector('#outDiv');
    div.innerHTML = '';
    if (e.target.id == "onePlayer") {
        ifCheck = true;
        localStorage.setItem('flag', true);
    }
}

//הצגת הוראות המשחק
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
//סגירת הוראות המשחק
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById('main').style.backgroundColor = "";
}

//סיום משחק
function endPlay() {
    flag = false;
    alertWin();
}
function alertWin() {
    const win = document.querySelector('#win');
    document.getElementById('id01').style.display = 'block';
    if (ifCheck && sumRed > sumWhite)
        win.innerText = "ניצחת!!!"
    else if (ifCheck && sumRed < sumWhite)
        win.innerHTML = "אויש חבל..." + '<br/>' + "נכשלת הפעם : ( "
    else if (sumRed > sumWhite) {
        if (playerNow.color == 'red')
            win.innerHTML = "והמנצח הוא..." + '<br/>' + playerNow.name;
        else
            win.innerHTML = "והמנצח הוא..." + '<br/>' + player.name;
    }
    else {
        if (playerNow.color == 'white')
            win.innerHTML = "והמנצח הוא..." + '<br/>' + playerNow.name;
        else
            win.innerHTML = "והמנצח הוא..." + '<br/>' + player.name;
    }
    win.appendChild(document.getElementById('winBtns'));
}





$(document).ready(function () {
    //הסתרת טפסי פרטי המילוי
    $('#onePlayerDiv').hide();
    $('#twoPlayerDiv').hide();
    $('#startPlay').hide();
    //הצגת טופס פרטי מילוי לשחקן יחיד
    $('#onePlayer').click(function () {
        $('#onePlayerDiv').show();
        $('#startPlay').show();
    });
    //הצגת טופס פרטי מילוי לשני שחקנים
    $('#twoPlayer').click(function () {
        $('#twoPlayerDiv').show();
        $('#startPlay').show();
    });
});











