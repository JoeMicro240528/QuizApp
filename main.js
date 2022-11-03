
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets .spans");
let questionsName = document.querySelector(".quiz-area");
let areaAnswer = document.querySelector(".answers-area");
let submit = document.querySelector(".submit-button");
let result = document.querySelector(".results");
let countdown = document.querySelector(".countdown");
let QuestionsNamber =0;
let theRghitAnswerCount =0;
let api = "html_quiz_data.json";
async function getData(){
	const respons = await fetch(api);
	const data = await  respons.json();
	
	let countOfQuetions =data.length;
	creatBullets(countOfQuetions);
	getQuestions(data[QuestionsNamber],countOfQuetions);
	countDown(10,countOfQuetions);
	submit.onclick=function(){
           let theRghitAnswer = data[QuestionsNamber].right_answer;
		   QuestionsNamber++;
		   checkAns(theRghitAnswer,countOfQuetions);

		   //empty questionsName
		    questionsName.innerHTML = '';
		   // empty areaAnswer
		   areaAnswer.innerHTML = '';

		   // prviwe Next QuestionsName
		   getQuestions(data[QuestionsNamber],countOfQuetions);

		   //hendel bullets
		   handelBullets();

		   clearInterval(countdownInterval);
		   countDown(10,countOfQuetions);
		   showBullets(countOfQuetions);
	}
}
getData();

function creatBullets(num){
   countSpan.innerHTML = num;
   for(let i = 0;i<num ;i++){
        let span = document.createElement("span");
		if(i===0){
           span.className="active";
		}
		bullets.appendChild(span);
   }
}



function getQuestions(data,qCount){
  
	if(QuestionsNamber < qCount){
       // creat question titel
 let QuestionTitel = document.createElement("h2");
 let QuestionText = document.createTextNode(data['title']);
 QuestionTitel.appendChild(QuestionText);
 questionsName.appendChild(QuestionTitel);

 for(let i=1;i<=4;i++){
	 // creat answer Div
	 let answer = document.createElement("div");
	  answer.className = "answer";
	 let radioInput = document.createElement("input");
	 radioInput.name ="questions";
	 radioInput.type="Radio";
	 radioInput.id=`answer_${i}`;
	 radioInput.dataset.answer=data[`answer_${i}`];
	 if(i===1){
		 radioInput.checked = true;
	 }
	 //creat lable + lableText
	 let lable = document.createElement("label");
	 lable.htmlFor=`answer_${i}`;
	 let lableText = document.createTextNode(data[`answer_${i}`]);
	 lable.appendChild(lableText);
	 answer.appendChild(radioInput);
	 answer.appendChild(lable);
	 areaAnswer.appendChild(answer);

 }
	}
	


}

function checkAns(rAnswer,qcount){
	let answers = document.getElementsByName("questions");
	let theChooseAnswer;
	for(let i=0;i<answers.length;i++){
         if(answers[i].checked){
			theChooseAnswer = answers[i].id;
		 }
	}

	console.log(rAnswer);
	console.log(theChooseAnswer);
	if(rAnswer===theChooseAnswer){
		theRghitAnswerCount++;
	}
}

function handelBullets(){
     let bulletsSpans =document.querySelectorAll(".bullets .spans span");
	let arrayOfSpan = Array.from(bulletsSpans);
	arrayOfSpan.forEach((span,index)=>{
        if(QuestionsNamber===index){
			span.className="active";
		}else{
			span.className="";
		}
	});
}

function showBullets(count){
	let theResult;
	if(QuestionsNamber===count){
		bullets.remove();
		submit.remove();
		areaAnswer.remove();
		questionsName.remove();
		countdown.remove();

		if(theRghitAnswerCount > count/2 && theRghitAnswerCount < count ){
			theResult = `<span class="good">Good ${theRghitAnswerCount} from ${count}</span>`
		} else if(theRghitAnswerCount === count){
			theResult = `<span class="perfect">Perfect ${theRghitAnswerCount} from ${count}</span>`
		}else {
			theResult = `<span class="bad">Bad ${theRghitAnswerCount} from ${count} </span>`
		}
		result.innerHTML=theResult;
	}

	
}

function countDown(duration,count){
   if(QuestionsNamber < count){
	  let minutes,seconds;
	  countdownInterval = setInterval(()=>{
		minutes = parseInt(duration / 60);
		seconds = parseInt(duration % 60);

		minutes = minutes<10?`0${minutes}`:minutes;
		seconds = seconds<10?`0${seconds}` :seconds;

		countdown.innerHTML = `${minutes}${seconds}`

		if(--duration < 0){
            clearInterval(countdownInterval);
			submit.click();
		}
		duration < 0 ?countdown.style.color="red":countdown.style.color="#0075ff";
	  },1000);
   }
}
