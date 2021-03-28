import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IQuestion, IResponse } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  questions: IQuestion[] = [
    {
      id: '100',
      question: 'Which smartphone do you own?',
      answers: ['Android', 'iPhone', 'Windows', 'other'],
    },
    {
      id: '200',
      question: 'How do you travel most regularly?',
      answers: ['By car', 'By public transport', 'By bicycle', 'other'],
    },
    {
      id: '300',
      question: 'Some other question?',
      answers: ['Answer A', 'Answer B', 'other'],
    },
  ];
  questionOne: FormControl;
  questionTwo: FormControl;
  answerOne: FormControl;
  answerTwo: FormControl;
  result?: string[];

  responses: IResponse[] = [
    { userId: '1', questionId: '100', answeredIndex: 1 },
    { userId: '1', questionId: '200', answeredIndex: 0 },
    { userId: '1', questionId: '300', answeredIndex: 2 },
    { userId: '2', questionId: '100', answeredIndex: 1 },
    { userId: '2', questionId: '200', answeredIndex: 3 },
    { userId: '2', questionId: '300', answeredIndex: 0 },
    { userId: '3', questionId: '100', answeredIndex: 2 },
    { userId: '3', questionId: '200', answeredIndex: 1 },
    { userId: '3', questionId: '300', answeredIndex: 0 },
    { userId: '4', questionId: '100', answeredIndex: 1 },
    { userId: '4', questionId: '200', answeredIndex: 0 },
  ];

  constructor() {
    this.questionOne = new FormControl();
    this.questionTwo = new FormControl();
    this.answerOne = new FormControl();
    this.answerTwo = new FormControl();
  }

  calculate(): void {
    this.result = this.calculateResults(
      this.questionOne.value,
      parseInt(this.answerOne.value),
      this.questionTwo.value,
      parseInt(this.answerTwo.value)
    );
  }

  /**
   * Calculates amount of users (out of all gathered data) who have chosen particular answers on both questions
   */
  calculateResults(
    questionOneId: string,
    answerOneIndex: number,
    questionTwoId: string,
    answerTwoIndex: number
  ): string[] {
    // filter for only responses to questions we are taking care here and those who were answered as expected
    const responses = this.responses.filter(
      (response) =>
        (response.questionId === questionOneId &&
          response.answeredIndex === answerOneIndex) ||
        (response.questionId === questionTwoId &&
          response.answeredIndex === answerTwoIndex)
    );

    const usersAnsweredFirstQuestion = responses
      .filter((response) => response.questionId === questionOneId)
      .map((response) => response.userId);
    const usersAnsweredSecondQuestion = responses
      .filter((response) => response.questionId === questionTwoId)
      .map((response) => response.userId);

    // ids of users who have answered correctly to both questions
    let userIds = usersAnsweredFirstQuestion.filter((value) =>
      usersAnsweredSecondQuestion.includes(value)
    );

    return userIds;
  }

  getQuestionById = (id: string): string =>
    this.questions.find((q) => q.id === id)?.question || 'n/a';

  getAnswers(questionId: string): { answer: string; index: number }[] {
    const answers = this.questions.find((q) => q.id === questionId)?.answers;
    return (
      answers?.map((a) => {
        return {
          answer: a,
          index: answers.indexOf(a),
        };
      }) || []
    );
  }
}
