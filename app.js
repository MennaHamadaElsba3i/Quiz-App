let countspan = document.querySelector('.count span');
let mainbullets = document.querySelector('.bullets');
let mainbulletscontainer = document.querySelector('.bullets .spans');



let currentIndex = 0;
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
}