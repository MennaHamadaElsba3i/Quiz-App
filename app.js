let countspan = document.querySelector('.count span');
let mainbullets = document.querySelector('.bullets');
let mainbulletscontainer = document.querySelector('.bullets .spans');
let quezErea = document.querySelector('.quiz-area');
let ansarea = document.querySelector('.answers-area');
let supbutton = document.querySelector('.submit-button');
let resContainer = document.querySelector('.results');
let coundownelment = document.querySelector('.countdown');

let currentIndex = 0;
let rightAns = 0;
let counterinterval;

function getques() {
     let myreq = new XMLHttpRequest();
     myreq.onreadystatechange = function () {  // لما حالة الريكويست تتغير هنبدا نتشيك على الريدي ستيت اللي هي حالة الريكويست 
          if (this.readyState === 4 && this.status === 200) { //الريكويست خلص والرد جاهز دي 4 
               // طيب ال 200 دي حالة الرد ان الرد اوكيه والحلجة رجعتلي تمام
               // console.log(this.responseText);
               // احنا عايزين الجسون اوبجت يرجعلنا ك جافا سكربت اوبجت عشان نقدر نتعامل معاه 
               let quesobjs = JSON.parse(this.responseText);
               let quescount = quesobjs.length;
               createpullets(quescount);
               addquesdata(quesobjs[currentIndex], quescount);
               countdown(60, quescount);
               supbutton.onclick = () => {
                    let theRightAnswer = quesobjs[currentIndex].right_answer;
                    currentIndex++;
                    checkAns(theRightAnswer, quescount);
                    quezErea.innerHTML = "";
                    ansarea.innerHTML = "";
                    addquesdata(quesobjs[currentIndex], quescount);
                    handlebullets();
                    clearInterval(counterinterval)
                    countdown(60, quescount);
                    showResults(quescount);
               }
          }
     }
     myreq.open("GET", "./ques.json", true);
     myreq.send();
}
getques();

function createpullets(num) {
     countspan.innerHTML = num;
     for (let i = 0; i < num; i++) {
          const thebullet = document.createElement('span');
          mainbulletscontainer.appendChild(thebullet);
          // دي لو هي الفيرست سبان اللي هي اول سؤال
          if (i === 0) {
               thebullet.classList.add('on');
          }
     }
}

function addquesdata(obj, count) {
     if (currentIndex < count) {
          // اول حاجه هنكريت السؤال
          let quesTitle = document.createElement("h2");
          let quesText = document.createTextNode(obj['title']);
          // let quesTExt = document.createTextNode(obj.title);
          quesTitle.appendChild(quesText);
          quezErea.appendChild(quesTitle);

          for (let i = 1; i <= 4; i++) {
               let mainansdiv = document.createElement('div');
               mainansdiv.className = 'answer'

               let radioAns = document.createElement('input');
               radioAns.name = "ques"
               radioAns.type = "radio";
               radioAns.id = `answer_${i}`;
               radioAns.dataset.answer = obj[`answer_${i}`];

               if (i === 1) {
                    radioAns.checked = true;
               }

               let thelabel = document.createElement('label');
               thelabel.htmlFor = `answer_${i}`;
               let lebelText = document.createTextNode(obj[`answer_${i}`]);


               thelabel.appendChild(lebelText);
               mainansdiv.appendChild(radioAns);
               mainansdiv.appendChild(thelabel);
               ansarea.appendChild(mainansdiv);
          }
     }
}

function checkAns(rans, count) {
     let ans = document.getElementsByName('ques');
     let chosenans;
     for (let i = 0; i < ans.length; i++) {
          if (ans[i].checked) {
               chosenans = ans[i].dataset.answer;
          }
     }
     if (rans === chosenans) {
          rightAns++;
     }
}

function handlebullets() {
     let bulspan = document.querySelectorAll('.bullets .spans span');
     let arrayofspan = Array.from(bulspan);
     arrayofspan.forEach((span, index) => {
          if (currentIndex === index) {
               span.classList.add("on");
          }
     })
}

function showResults(count) {
     let thereslts;
     if (currentIndex === count) {  // هنا معناه ان الاسئلة خلصت ف اظهرلي النتايج
          quezErea.remove();
          ansarea.remove();
          supbutton.remove();
          mainbullets.remove();

          if (rightAns > (count / 2) && rightAns < count) {
               thereslts = `<span class="good">Good</span> ${rightAns} from ${count}Is Good`
          }
          else if (rightAns === count) {
               thereslts = `<span class="perfect">perfect</span> All Answers Is Good`
          }
          else {
               thereslts = `<span class="bad">bad</span> ${rightAns} from ${count}`
          }
          resContainer.innerHTML = thereslts;
     }
}

function countdown(duaration, count) {
     if (currentIndex < count) {
          let mins, secs;
          counterinterval = setInterval(() => {
               mins = parseInt(duaration / 60); //هو دلوقتي ممكن يديني 150 ثانية لما بنقسمها على الستي مش بتقبل وبتطلع عدد صحيح طيب لو مطلعتش عدد صحيح هاخد العشري ده هو الثواني
               secs = parseInt(duaration % 60);

               mins = mins < 10 ? `0${mins}` : mins;  // 00:00
               secs = mins < 10 ? `0${secs}` : secs;

               coundownelment.innerHTML = `${mins}:${secs}`;

               if (--duaration < 0) {
                    clearInterval(counterinterval);
                    supbutton.click();
               }
          }, 1000);
     }
}