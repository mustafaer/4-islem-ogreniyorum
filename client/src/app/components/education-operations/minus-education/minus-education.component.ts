import {Component, OnInit} from '@angular/core';
import {Items} from '../../../shared/shared';
// @ts-ignore
import plus from '../../../shared/operations/minus.json';
import {Router} from '@angular/router';

@Component({
  selector: 'app-minus-education',
  templateUrl: './minus-education.component.html',
  styleUrls: ['./minus-education.component.scss']
})
export class MinusEducationComponent implements OnInit {

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

  constructor(private router: Router) {
    this.isLast = false;
    this.isFirst = true;
    this.movedApple = 0;
    this.currentQuestion = 1;
    this.appleCount = this.plusOperations[this.currentQuestion - 1].first;
    this.appleCount2 = this.plusOperations[this.currentQuestion - 1].second;
  }


  ngOnInit() {
    this.removeApple();
  }

  removeApple() {

    // @ts-ignore
    $(document).on('click', '.fruits3 .apple', (event) => {
      // @ts-ignore
      event.target.remove();
      this.movedApple++;
      // @ts-ignore
      $('#removedApples .apple').remove();
      let x = 0;
      let htmlImg = '';
      while (x < this.movedApple) {
        htmlImg = htmlImg + '<img class="apple fruits2_a" src="' + this.apple + '">';
        x++;
      }
      // @ts-ignore
      $('#removedApples').html(htmlImg);
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion > 10) {
      this.isLast = true;
    }
    if (this.isLast !== true) {
      this.resetQuestion();
    }
    this.isFirst = false;

  }

  previousQuestion() {
    this.currentQuestion--;
    if (this.currentQuestion <= 1) {
      this.isFirst = true;
    }
    this.resetQuestion();
    this.isLast = false;
  }

  createFruits1() {
    let x = 0;
    let htmlImg = '';
    while (x < this.appleCount) {
      htmlImg = htmlImg + '<img class="apple fruits2_a" src="' + this.apple + '">';
      x++;
    }
    // @ts-ignore
    $('#sortable3').html(htmlImg);
  }

  resetQuestion() {
    // @ts-ignore
    $('.fruits3 .apple').remove();
    // @ts-ignore
    $('#removedApples .apple').remove();
    this.movedApple = 0;
    this.appleCount = this.plusOperations[this.currentQuestion - 1].first;
    this.appleCount2 = this.plusOperations[this.currentQuestion - 1].second;
    this.createFruits1();
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
