import React, { Component } from 'react';
import axios from "axios";


export default class Details extends Component {
   
  constructor(){
    super();
    this.state = {
      QuizData: [],
      userAnswer:null,    //current users answer
      currentIndex:0,  //current questions index
      options: [],       //the four options
      quizEnd: false,
      score: 0,
      disabled: true
  }
  this.loadQuiz = this.loadQuiz.bind(this);
  this.nextQuestionHander = this.nextQuestionHander.bind(this);
  this.checkAnswer = this.checkAnswer.bind(this);
  this.finishHandler = this.finishHandler.bind(this);
}
    

    //Component that holds the current quiz
    loadQuiz = () => {
        const {currentIndex, QuizData} = this.state //get the current index and Data
        this.setState(() => {
            return {
                question: QuizData[currentIndex].question,
                options : QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer          
            }
        }
        )
    }

    //Handles Click event for the next button
    nextQuestionHander = () => {
        const {userAnswer, answer, score} = this.state
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })

        //Check for correct answer and increment score
        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
        }
    }

    //Load the quiz once the component mounts
    componentDidMount(){
     axios.get("http://localhost:4000/getData")
        .then(res => {
          this.setState({
            QuizData: res.data
        });
        this.loadQuiz();
      });
       // console.log(this.state.QuizData);
    }

    //Update the component
    componentDidUpdate(prevProps, prevState){
        const{currentIndex, QuizData} = this.state;
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                    disabled: true,
                    question: QuizData[currentIndex].question,
                    options : QuizData[currentIndex].options,
                    answer: QuizData[currentIndex].answer          
                }
            });

        }
    }

    //Check the answer
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled:false
        })
    }

    //Responds to the click of the finish button
    finishHandler = () => {
        const {userAnswer,answer,score}=this.state;
        if(userAnswer===answer){
            this.setState({
                score:score+1
            })
        }
        if(this.state.currentIndex === this.state.QuizData.length -1){
            this.setState({
                quizEnd:true
            })
        }
    }
    myChangeHandler = (event) =>{
        this.setState({username:event.target.value});
    }
    render() {
        const {question, options, currentIndex, userAnswer, quizEnd, QuizData} = this.state //get the current state       
        if(quizEnd) {
            return (
                <div className = "Content">
                    <h1 style = {{color: "red"}}><b>Game Over. Final score is {this.state.score} points</b></h1>
                    <p>The correct Answers for the quiz are</p>
                    <ul>
                        {QuizData.map((item, index) => (
                            <li className='options'
                                key={index}>
                                    {item.answer}
                            </li>
                     ))}
                    </ul>
                </div>
            )
        }
        
               
        return (
            <div className = "Content">
            <div className = "Question">
               <h1>{question}</h1>
              </div>
                <span>{`Question ${currentIndex+1} of ${QuizData.length}`}</span>
                <ul className = "Answer">
                {options.map(option => (  //for each option, new paragraph
                    <li key={option.id} 
                    className={`options ${userAnswer === option ? "selected" : null}`}
                    onClick= {() => this.checkAnswer(option)}>
                        {option}
                    </li>
                ))}
                </ul>
                {currentIndex < QuizData.length -1 &&  
                // Next button only displays if the above is true
                <button 
                    className="ui inverted button" 
                    disabled = {this.state.disabled}
                    onClick = {this.nextQuestionHander}
                 >Next Question</button>
                }
                 {currentIndex === QuizData.length -1 &&
                    <button
                    className="ui inverted button"
                    disabled = {this.state.disabled}
                    onClick = {this.finishHandler}
                    >Finish</button>
                 }
            </div>
        )
    }
}