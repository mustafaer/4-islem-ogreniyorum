import {Component, OnInit} from '@angular/core';
import {Items} from '../../../shared/shared';
// @ts-ignore
import plus from '../../../shared/operations/evaluation/plus.json';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plus-evaluation',
  templateUrl: './plus-evaluation.component.html',
  styleUrls: ['./plus-evaluation.component.scss']
})
export class PlusEvaluationComponent implements OnInit {

  Arr = Array;
  educationBackground = Items.educationBackground;
  mainBackground = Items.mainBackground;
  cloud = Items.cloud;
  apple = Items.apple;
  plate = Items.plate;
  appleCount: number;
  appleCount2: number;
  plusOperations = plus;
  isFirst: boolean;
  isLast: boolean;
  currentQuestion: number;
  movedApple: number;
  sound;
  appleSound;
  isSoundUp = false;
  toggleState = false;
  answer: number;
  answerList = [0, 0, 0];
  answerListTemp = [];
  tempAnswer: number;
  resultArray = [];
  correctCount: number;
  wrongCount: number;

  constructor(private router: Router) {
    this.isSoundUp = JSON.parse(sessionStorage.getItem('soundState'));
    this.movedApple = 0;
    this.isFirst = true;
    this.isLast = false;
    this.currentQuestion = 1;
    this.appleCount = this.plusOperations[this.currentQuestion - 1].first;
    this.appleCount2 = this.plusOperations[this.currentQuestion - 1].second;
  }

  ngOnInit() {
    this.createAnswers();
    this.resetSelectedAnswer();
    // @ts-ignore
    // tslint:disable-next-line:triple-equals
    this.toggleState = (window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height);
    this.sortApples();
    this.sound = document.getElementsByTagName('audio');
    if (this.isSoundUp) {
      this.startSound();
    }

    // @ts-ignore
    $(document).on('click', '.answerButton', (event) => {
      this.selectedAnswer(event);
    });
  }

  sortApples() {
    // @ts-ignore
    $('#sortable1, #sortable2, #sortable3').sortable({
      connectWith: '#sortable3',
    }).on('sortstop', (event, ui) => {
      this.movedApple++;

    }).disableSelection();
  }

  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion > 10) {
      this.isLast = true;
      this.calculateResult();
    }
    if (this.isLast !== true) {
      this.resetQuestion();
    }
    this.isFirst = false;
    this.createAnswers();
    this.resetSelectedAnswer();
  }

  previousQuestion() {
    this.currentQuestion--;
    if (this.currentQuestion <= 1) {
      this.isFirst = true;
    }
    this.resetQuestion();
    this.isLast = false;
    this.createAnswers();
    this.resetSelectedAnswer();
  }

  calculateResult() {
    let res = 0;
    let i;
    for (i = 0; i < this.resultArray.length; i++) {
      if (this.resultArray[i] === true) {
        res++;
      }
    }
    this.correctCount = res;
    this.wrongCount = this.plusOperations.length - res;
  }

  createFruits1() {
    let x = 0;
    let htmlImg = '';
    while (x < this.appleCount) {
      htmlImg = htmlImg + '<img class="apple fruits2_a" src="' + this.apple + '">';
      x++;
    }
    // @ts-ignore
    $('#sortable1').html(htmlImg);
  }

  createFruits2() {
    let x = 0;
    let htmlImg = '';
    while (x < this.appleCount2) {
      htmlImg = htmlImg + '<img class="apple fruits2_a" src="' + this.apple + '">';
      x++;
    }
    // @ts-ignore
    $('#sortable2').html(htmlImg);
  }

  resetQuestion() {
    // @ts-ignore
    $('.fruits3 .apple').remove();
    this.appleCount = this.plusOperations[this.currentQuestion - 1].first;
    this.appleCount2 = this.plusOperations[this.currentQuestion - 1].second;
    this.createFruits1();
    this.createFruits2();
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  stopSound() {
    this.sound[0].pause();
    this.isSoundUp = false;
    sessionStorage.setItem('soundState', 'false');
  }

  startSound() {
    this.sound[0].play();
    this.isSoundUp = true;
    sessionStorage.setItem('soundState', 'true');
  }

  toggleFullScreen() {
    this.toggleState = true;
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      // @ts-ignore
      if (document.documentElement.requestFullScreen) {
        // @ts-ignore
        document.documentElement.requestFullScreen();
        // @ts-ignore
      } else if (document.documentElement.mozRequestFullScreen) {
        // @ts-ignore
        document.documentElement.mozRequestFullScreen();
        // @ts-ignore
      } else if (document.documentElement.webkitRequestFullScreen) {
        // @ts-ignore
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      this.toggleState = false;
      // @ts-ignore
      if (document.cancelFullScreen) {
        // @ts-ignore
        document.cancelFullScreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.webkitCancelFullScreen) {
        // @ts-ignore
        document.webkitCancelFullScreen();
      }
    }
  }

  createAnswers() {
    this.answerListTemp = [];
    this.answer = this.appleCount + this.appleCount2;
    let rand;
    if (this.answer < 10) {
      let x = 0;
      while (x < 2) {
        rand = this.getRndInteger(1, 9);
        if (rand !== this.answer && !this.answerListTemp.includes(rand)) {
          x++;
          this.answerListTemp.push(rand);
        }
      }
    } else if (this.answer >= 10) {
      let x = 0;
      while (x < 2) {
        rand = this.getRndInteger(10, 20);
        if (rand !== this.answer && !this.answerListTemp.includes(rand)) {
          x++;
          this.answerListTemp.push(rand);
        }
      }
    }
    const answerIndex = this.getRndInteger(0, 2);
    this.answerList[answerIndex] = this.answer;
    if (answerIndex === 0) {
      this.answerList[1] = this.answerListTemp[0];
      this.answerList[2] = this.answerListTemp[1];
    } else if (answerIndex === 1) {
      this.answerList[0] = this.answerListTemp[0];
      this.answerList[2] = this.answerListTemp[1];
    } else if (answerIndex === 2) {
      this.answerList[0] = this.answerListTemp[0];
      this.answerList[1] = this.answerListTemp[1];
    }
    while (this.answerList[0] < 1) {
      this.createAnswers();
    }
    // tslint:disable-next-line:max-line-length
    const htmlElem = '<span id="answerButton1" class="answerButton" title="' + this.answerList[0] + '">' + this.answerList[0] + '</span>&nbsp;&nbsp;&nbsp;<span id="answerButton2" class="answerButton" title="' + this.answerList[1] + '">' + this.answerList[1] + '</span>&nbsp;&nbsp;&nbsp;<span id="answerButton3" class="answerButton" title="' + this.answerList[2] + '">' + this.answerList[2] + '</span>';

    // @ts-ignore
    $('#answerDiv').html(htmlElem);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectedAnswer(event) {
    const selectedElementId = event.target.id;
    this.tempAnswer = event.target.title;
    const ids = ['answerButton1', 'answerButton2', 'answerButton3'];
    const index = ids.indexOf(selectedElementId);
    if (index > -1) {
      ids.splice(index, 1);
    }
    // @ts-ignore
    const selectedElement = $('#' + selectedElementId);
    // @ts-ignore
    const unSelectedElement1 = $('#' + ids[0]);
    // @ts-ignore
    const unSelectedElement2 = $('#' + ids[1]);
    selectedElement.css({color: 'white', 'background-color': 'darkred'});
    unSelectedElement1.css({color: 'black', 'background-color': 'whitesmoke'});
    unSelectedElement2.css({color: 'black', 'background-color': 'whitesmoke'});

    // tslint:disable-next-line:triple-equals
    this.resultArray[this.currentQuestion - 1] = this.answer == this.tempAnswer;
  }

  resetSelectedAnswer() {
    const ids = ['answerButton1', 'answerButton2', 'answerButton3'];
    this.tempAnswer = 0;
    // @ts-ignore
    const unSelectedElement = $('#' + ids[0]);
    // @ts-ignore
    const unSelectedElement1 = $('#' + ids[1]);
    // @ts-ignore
    const unSelectedElement2 = $('#' + ids[2]);
    unSelectedElement.css({color: 'black', 'background-color': 'whitesmoke'});
    unSelectedElement1.css({color: 'black', 'background-color': 'whitesmoke'});
    unSelectedElement2.css({color: 'black', 'background-color': 'whitesmoke'});
  }
}
