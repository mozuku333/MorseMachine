'use strict'
const body = document.getElementById('body');
const resultErea = document.getElementById('resultErea');
const sentenceErea = document.getElementById('sentenceErea');
const sentenceEreaR = document.getElementById('sentenceEreaR')
const language = document.getElementsByName('language');
const volume = document.getElementById('volume');
const numberSetting = document.getElementsByName('numberSetting');
const romanButton = document.getElementById('romanButton');
romanButton.style.visibility = 'hidden';



let timer;
let timerSignal = 0;
let langValue = null;
let startTime = null;
let stopTime = null;
let intervalTime = null;
let afterPullTime = null;
let numberValue = null;
let alphabetString = null;

const result = [];
const signs = [];
const finalSentence = [];
const alphabetSentence = [];
const romanSentence = [];

const music = new Audio('regulation.mp3');

volume.addEventListener('input', e => { //音量設定
  music.volume = volume.value;
});
function changeRadio(p) {
  console.log('changeRadio(' + p + ')');

  if (p === 1) {
    romanButton.style.visibility = 'visible';
  } else {
    romanButton.style.visibility = 'hidden';
  };
};
document.body.addEventListener('keydown',
event => {
  if (event.key === 'n') {
    push();
  } else if (event.key === 'm') {
    translateToRoman();
  }
});
document.body.addEventListener('keyup',
event => {
  if (event.key === 'n') {
    pull();
  }
});
function clearSentence(buttonValue) {
  console.log('clearSentence()');

  if (buttonValue == 0) {
    result.length = 0;
    resultErea.innerText = result;
  } else {
    finalSentence.length = 0;
    sentenceErea.innerText = finalSentence;
  }
}
function reload() {
  console.log('reload()');
  location.reload();
}

function push() { // keydown
  console.log('push()');

  if (timerSignal === 1) {
    clearInterval(timer);
    timerSignal = 0;
  } else { ;};

  for (let i = 0; i < language.length; i++) {
    if (language[i].checked) {
      langValue = language[i].value;
    };
  };

  startTime = Date.now();
  music.play();
  return startTime;
}
function pull() { // keyup
  console.log('pull()');

  stopTime = Date.now();
  music.pause();
  music.currentTime = 0;
  decideArrays();
  timer = setInterval(measureIntervalTime, 5)
  function measureIntervalTime() {
    afterPullTime = Date.now();
    intervalTime = afterPullTime - stopTime;
    if (intervalTime > 460) {
      result.push("; ");
      switch (langValue) {
        case 'english': translateToEnglish();
        break;
        case 'roman': translateToEnglish();
        break;
        case 'japanese': translateToJapanese();
        break;
        case 'number': translateToNumbers();
        break;
        default: sentenceErea.innerText = "言語を選択してください。";
      }
      signs.length = 0;
      clearInterval(timer);
    } else {
      timerSignal = 1;
    };
  }
  return stopTime;
}

function decideArrays() { // クリック時間を計算
  var clickTime = stopTime - startTime;
  if (clickTime < 140) {
    result.push("・ ");
    signs.push(".");
  } else {
    result.push("－ ");
    signs.push("－");
  }
  resultErea.innerText = result.join("");
}

function translateToEnglish() {// 英語
  console.log('translateToEnglish()');

  var binaryString = signs.join("");
  var alphabets = new Object();
  var alphabets = {
    '.－':   "a",
    '－...': "b",
    '－.－.': "c",
    '－..':  "d",
    '.':    "e",
    '..－.': "f",
    '－－.':  "g",
    '....': "h",
    '..':   "i",
    '.－－－': "j",
    '－.－':  "k",
    '.－..': "l",
    '－－':   "m",
    '－.':   "n",
    '－－－':  "o",
    '.－－.': "p",
    '－－.－': "q",
    '.－.':  "r",
    '...':  "s",
    '－':    "t",
    '..－':  "u",
    '...－': "v",
    '.－－':  "w",
    '－..－': "x",
    '－.－－': "y",
    '－－..': "z",
    '.....': "　",
    '...－.': "一文字消す"

  }

  for (var k in alphabets) {
    if (k === binaryString) {
      finalSentence.push(alphabets[k]);
      if (langValue == 'roman') {
        alphabetSentence.push(alphabets[k]);
      } else {;};
    };
  };

  sentenceErea.innerText = finalSentence.join("");
};
function translateToJapanese() {// 日本語
  console.log('translateToJapanese()');

  var binaryString = signs.join("");
  var katakana = new Object();
  var katakana = {
    '.－': "イ",
    '.－.－': "ロ",
    '－...': "ハ",
    '－.－.': "ニ",
    '－..': "ホ",
    '.': "ヘ",
    '..－..': "ト",
    '..－.': "チ",
    '－－.': "リ",
    '....': "ヌ",
    '－.－－.': "ル",
    '.－－－': "ヲ",
    '－.－': "ワ",
    '.－..': "カ",
    '－－': "ヨ",
    '－.': "タ",
    '－－－': "レ",
    '－－－.': "ソ",
    '.－－.': "ツ",
    '－－.－': "ネ",
    '.－.': "ナ",
    '...': "ラ",
    '－': "ム",
    '..－': "ウ",
    '.－..－': "ヰ",
    '..－－': "ノ",
    '.－...': "オ",
    '...－': "ク",
    '.－－': "ヤ",
    '－..－': "マ",
    '－.－－': "ケ",
    '－－..': "フ",
    '－－－－': "コ",
    '－.－－－': "エ",
    '.－.－－': "テ",
    '－－.－－': "ア",
    '－.－.－': "サ",
    '－.－..': "キ",
    '－..－－': "ユ",
    '－...－': "メ",
    '..－.－': "ミ",
    '－－.－.': "シ",
    '.－－..': "ヱ",
    '－－..－': "ヒ",
    '－..－.': "モ",
    '.－－－.': "セ",
    '－－－.－': "ス",
    '.－.－.': "ン",
    '..': "゛",
    '..－－.': "゜",
    '.－－.－': "ー",
    '...－.': "一文字消す"
  };

  for (var k in katakana) {
    if (k === binaryString) {
      finalSentence.push(katakana[k]);
    };
  };

  sentenceErea.innerText = finalSentence.join("");
};
function translateToRoman() {// ローマ字
  console.log('translateToRoman()');
  
  var alphabetString = alphabetSentence.join("");
  var romanchars = new Object();
  var romanchars = {
    'a': "あ",'i': "い",'u': "う",'e': "え",'o': "お",
    'ka': "か",'ki': "き",'ku': "く",'ke': "け",'ko': "こ",
    'sa': "さ",'shi': "し",'si': "し",'su': "す",'se': "せ",'so': "そ",
    'ta': "た",'ti': "ち",'chi': "ち",'tu': "つ",'tsu': "つ",'te': "て",'to': "と",
    'na': "な",'ni': "に",'nu': "ぬ",'ne': "ね",'no': "の",
    'ha': "は",'hi': "ひ",'hu': "ふ",'fu': "ふ",'he': "へ",'ho': "ほ",
    'ma': "ま",'mi': "み",'mu': "む",'me': "め",'mo': "も",
    'ya': "や",'yu': "ゆ",'yo': "よ",
    'wa': "わ",'wo': "を",'n': "ん",'nn': "ん",
    'ga': "が",'gi': "ぎ",'gu': "ぐ",'ge': "げ",'go': "ご",
    'za': "ざ",'zi': "じ",'ji': "じ",'zu': "ず",'ze': "ぜ",'zo': "ぞ",
    'da': "だ",'di': "ぢ",'du': "づ",'de': "で",'do': "ど",
    'ba': "ば",'bi': "び",'bu': "ぶ",'be': "べ",'bo': "ぼ",
    'pa': "ぱ",'pi': "ぴ",'pu': "ぷ",'pe': "ぺ",'po': "ぽ",
    'kya': "きゃ",'kyi': "きぃ",'kyu': "きゅ","kye": 'きぇ','kyo': "きょ",
    'qa': "くぁ",'qi': "くぃ",'qu': "くぅ",'qwu': "くぅ",'qe': "くぇ",'qo': "くぉ",
    'gya': "ぎゃ",'gyi': "ぎぃ",'gyu': "ぎゅ",'gye': "ぎぇ",'gyo': "ぎょ",
    'gwa': "ぐぁ",'gwi': "ぐぃ",'gwu': "ぐぅ",'gwe': "ぐぇ",'gwo': "ぐぉ",
    'sya': "しゃ",'sha': "しゃ",'syi': "しぃ",'syu': "しゅ",'shu': "しゅ",'sye': "しぇ",'she': "しぇ",'syo': "しょ",'sho': "しょ",
    'swa': "すぁ",'swi': "すぃ",'swu': "すぅ",'swe': "すぇ",'swo': "すぉ",
    'ja': "じゃ",'zya': "じゃ",'jyi': "じぃ",'zyi': "じぃ",'ju': "じゅ",'zyu': "じゅ",'je': "じぇ",'zye': "じぇ",'jo': "じょ",'zyo': "じょ",
    'tya': "ちゃ",'cha': "ちゃ",'tyi': "ちぃ",'tyu': "ちゅ",'chu': "ちゅ",'tye': "ちぇ",'che': "ちぇ",'tyo': "ちょ",'cho': "ちょ",
    'tha': "てゃ",'thi': "てぃ",'thu': "てゅ",'the': "てぇ",'tho': "てょ",
    'twa': "とぁ",'twi': "とぃ",'twu': "とぅ",'twe': "とぇ",'two': "とぉ",
    'dya': "ぢゃ",'dyi': "ぢぃ",'dyu': "ぢゅ",'dye': "ぢぇ",'dyo': "ぢょ",
    'dha': "でゃ",'dhi': "でぃ",'dhu': "でゅ",'dhe': "でぇ",'dho': "でょ",
    'dwa': "どぁ",'dwi': "どぃ",'dwu': "どぅ",'dwe': "どぇ",'dwo': "どぉ",
    'nya': "にゃ",'nyi': "にぃ",'nyu': "にゅ",'nye': "にぇ",'nyo': "にょ",
    'hya': "ひゃ",'hyi': "ひぃ",'hyu': "ひゅ",'hye': "ひぇ",'hyo': "ひょ",
    'fa': "ふぁ",'fwa': 'ふぁ','fi': "ふぃ",'fwi': "ふぃ",'fwu': "ふぅ",'fe': "ふぇ",'fwe': "ふぇ",'fo': "ふぉ",'fwo': "ふぉ",
    'bya': "びゃ",'byi': "びぃ",'byu': "びゅ",'bye': "びぇ",'byo': "びょ",
    'pya': "ぴゃ",'pyi': "ぴぃ",'pyu': "ぴゅ",'pye': "ぴぇ",'pyo': "ぴょ",
    'mya': "みゃ",'myi': "みぃ",'myu': "みゅ",'mye': "みぇ",'myo': "みょ",
    'rya': "りゃ",'ryi': "りぃ",'ryu': "りゅ",'rye': "りぇ",'ryo': "りょ",
    'wha': "うぁ",'whi': "うぃ",'wi': "うぃ",'whe': 'うぇ','we': "うぇ",'who': "うぉ"
  }

  for (var k in romanchars) {
    if (k === alphabetString) {
      romanSentence.push(romanchars[k]);
    };
  };

  sentenceEreaR.innerText = romanSentence.join("");
  alphabetSentence.length = 0;
};
function translateToNumbers() { // 数字
  console.log('translateToNumber()');

  var binaryString = signs.join("");
  var nomalNumbers = new Object();
  nomalNumbers = {
    '.－－－－': "1",
    '..－－－': "2",
    '...－－': "3",
    '....－': "4",
    '.....': "5",
    '－....': "6",
    '－－...': "7",
    '－－－..': "8",
    '－－－－.': "9",
    '－－－－－': "0",
    '...－.': "一文字消す"
  };
  var abbrevationNumbers = new Object();
  abbrevationNumbers = {
    '.－': "1",
    '..－': "2",
    '...－': "3",
    '....－': "4",
    '.....': "5",
    '－....': "6",
    '－...': '7',
    '－..': "8",
    '－.': "9",
    '－': "0"
  };

  for (let i = 0;i < numberSetting.length; i++) {
    if (numberSetting[i].checked) {
      numberValue = numberSetting[i].value
    };
  };

  if (numberValue == "nomal") {
    for (var k in nomalNumbers) {
      if (k === binaryString) {
        finalSentence.push(nomalNumbers[k]);
      };
    };
  } else if (numberValue == "abbreviation") {
    for (var k in abbrevationNumbers) {
      if (k === binaryString) {
        finalSentence.push(abbrevationNumbers[k]);
      };
    };
  };
  sentenceErea.innerText = finalSentence.join("");
};

function sliceCharacter() { // 文字消す関数

};