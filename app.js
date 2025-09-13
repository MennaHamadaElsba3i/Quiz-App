let countspan = document.querySelector('.count span');
let mainbullets = document.querySelector('.bullets');
let mainbulletscontainer = document.querySelector('.bullets .spans');
let quezErea = document.querySelector('.quiz-area');
let ansarea = document.querySelector('.answers-area');
let supbutton = document.querySelector('.submit-button');

let currentIndex = 0;
let rightAns = 0;
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
               supbutton, onclick = () => {
                    let rightAns = quesobjs[currentIndex].right_answer;
                    //نزود الاندكس
                    currentIndex++;
                    checkAns(rightAns, quescount);
                    quezErea.innerHTML = "";
                    ansarea.innerHTML = "";
                    addquesdata(quesobjs[currentIndex], quescount);
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

          let thelabel = document.createElement('label');
          thelabel.htmlFor = `ans${i}`;
          let lebelText = document.createTextNode(obj[`answer_${i}`]);
          if (i === 1) {
               radioAns.checked = true;
          }

          thelabel.appendChild(lebelText);

          mainansdiv.appendChild(radioAns);
          mainansdiv.appendChild(thelabel);
          ansarea.appendChild(mainansdiv);
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