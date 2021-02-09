//各種定数の宣言
const displayAnswer = document.getElementById("displayAnswer");
const answerTextArea = document.getElementById("answerTextArea");
const answerButton = document.getElementById("answerButton");
const playerName = "ダミーくん"; //あとで別ページで入力させたものを呼び出すか、もしくは名前入力欄を作る

//関数
function answerButtonOnClick(){
    let answerText = answerTextArea.value;
    let answerTextHTML = answerText.replace(/\n/g,'<br>'); //普通だと一個置き換えた時点で終わるので正規表現を使う
    console.log(answerText);
    displayAnswer.innerHTML += playerName+":<br>"+answerTextHTML; //HTMLとして出力
    answerTextArea.value = ''; //テキストエリアをクリア
    displayAnswer.scrollTop = displayAnswer.scrollHeight; //scrollTopは現在スクロール位置、scrollHeightは現在のスクロール可能な高さ。 これで一番下まで強制でスクロールする。
}

// 紐付け
answerButton.onclick = answerButtonOnClick;

//jQuery記述
function questionChoice(){
    const dataUrl = 'bousaiGameData.json';
    var bousaiJSON;
    var QNum,INum; //QuestionNumber,ImageNumber
    $.getJSON(dataUrl,bousaiJSON => {
        Qnum = Math.floor(Math.random()*bousaiJSON.question.length);
        Inum = Math.floor(Math.random()*bousaiJSON.question[Qnum].image.length);
        console.log(bousaiJSON.question.length,"\n",bousaiJSON.question[Qnum].text,"\n",bousaiJSON.question[Qnum].image.length);
    });
}
window.onload = questionChoice;


/* こっちはデバッグ 
$(function(){
    var bousaiJSON = {
        question:[{
            text:"問１：大きな地震に被災したときのことを想定します。<br>備蓄のあった以下の食べ物のどれかについて、<br>他の選択肢には無い長所を考えてみましょう。<br>限られた条件下で特に有用であれば、<br>条件を付け足してみても構いません。<br>",
            image:[{
                alt:"カップラーメン",
                src:"food_cup_noodle_close.png"
            },
            {
                alt:"乾パン",
                src:"bousai_kanpan.png"
            },
            {
                alt:"缶詰",
                src:"bfood_kandume_close.png"
            }
            ]
        }
        ]
    }
    Qnum = Math.floor(Math.random()*bousaiJSON.question.length);
    Inum = Math.floor(Math.random()*bousaiJSON.question[Qnum].image.length);
    console.log(bousaiJSON.question.length,"\n",bousaiJSON.question[Qnum].text,"\n",bousaiJSON.question[Qnum].image.length);
});
*/
