import React, {Component} from 'react'
import {QuizData} from './QuizData'
import './style.css'
export class Quiz extends Component{
    constructor(props){
        super(props)
        this.state  ={
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true
        }
    } 
    loadQuiz = () => {
        const {currentIndex} = this.state;
        this.setState(() => {
            return {
                question: QuizData[currentIndex].question,
                options:QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer
            }
        })
    }
    nextQuestionHandler = () =>{
        const {userAnswer, answer, score} = this.state
        //alert(answer)
        if(userAnswer == answer){
            this.setState({
                score: score + 1
            })
        }
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null
        })
    }
    componentDidMount(){
        this.loadQuiz();
    }
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }
    componentDidUpdate(prevProps, prevState){
        const{currentIndex} = this.state;
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
    finishHandler =() => {

        
        if(this.state.currentIndex === QuizData.length - 1){
            
            this.setState({
                quizEnd:true
            })
        }

    }
    

    render(){
        const{question, options, currentIndex, userAnswer, quizEnd} = this.state
        if(quizEnd){            
            if(this.state.score > 3){
                
                return(<div>
                    <h1>  Конец. Количество баллов: {this.state.score} </h1>
                    <h2>
                        Много баллов, идите к врачу
                    </h2>
                </div>
                )
            } else{
                return (
                    <div>
                    <h1>  Конец. Количество баллов: {this.state.score} </h1>
                    <h2>Всё в порядке</h2>
                    </div>
                )
            }
            return (
            <div>
              <h1>  Конец. Количество баллов: {this.state.score} </h1>              
              
            </div>
            )
        }
        
        
        return(
            <div>
                <h2>{question}</h2>
                
                <span>{`Вопрос ${currentIndex + 1} из ${QuizData.length}`} </span>
                {
                    options.map(option => 
                        <p key = {option.id} className={`options ${userAnswer === option? "selected": null}`} 
                        onClick = {() => this.checkAnswer(option)}
                        
                        >
                            {option}
                            
                        </p>)
                        
                }
                <h2>{this.state.score}</h2>
            {currentIndex < QuizData.length - 1 && 
            <button disabled = {this.state.disabled} onClick = {this.nextQuestionHandler}>
                Дальше
            </button>}
            {currentIndex == QuizData.length - 1 &&
            <button onClick ={this.finishHandler} disabled = {this.state.disabled}>
                Конец

            </button>}

            </div>
        )
    }
}
export default Quiz