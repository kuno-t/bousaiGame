//各種定数の宣言
const questionText = document.getElementById("questionText");
const startButton = document.getElementById("startButton");
const displayAnswer = document.getElementById("displayAnswer");
const answerTextArea = document.getElementById("answerTextArea");
const answerButton = document.getElementById("answerButton");
const playerName = "ダミーくん"; //あとで別ページで入力させたものを呼び出すか、もしくは名前入力欄を作る
const choiceNum = 3; //選択肢数は3
const dataUrl = 'bousaiGameData.json';
var bousaiJSON;

//関数
function answerButtonOnClick(){
    let answerText = answerTextArea.value;
    let answerTextHTML = answerText.replace(/\n/g,'<br>'); //普通だと一個置き換えた時点で終わるので正規表現を使う
    console.log(answerText);
    displayAnswer.innerHTML += playerName+":<br>"+answerTextHTML; //HTMLとして出力
    answerTextArea.value = ''; //テキストエリアをクリア
    displayAnswer.scrollTop = displayAnswer.scrollHeight; //scrollTopは現在スクロール位置、scrollHeightは現在のスクロール可能な高さ。 これで一番下まで強制でスクロールする。
}

function startButtonOnClick(){
    var QNum,INum; //QuestionNumber,ImageNumber
    $.getJSON(dataUrl,bousaiJSON => {
        let Qnum = Math.floor(Math.random()*bousaiJSON.question.length); //Question決定。完成時にはサーバーサイドで決める
        let imageList = bousaiJSON.question[Qnum].image;
        let image = [];
        let numList = randoms(choiceNum,imageList.length); //完成時にはサーバーサイドから受け取る
        for(let i=0;i<choiceNum;i++){ //画像を規定の数選ぶ。choiceNumは定数で一括変更可能。
            image[i] = imageList[numList[i]]; //image決定
        }
        console.log(image);

        questionText.innerHTML = bousaiJSON.question[Qnum].text;
        for(var i=0; i<choiceNum; i++){
            document.getElementById(`imageFrame${i+1}`).innerHTML = `<img src="${image[i].src}" alt="${image[i].alt}" title="選択肢${i+1}" class="choicesImage" id="choiceImage${i+1}">`; // ``の中に${}で変数展開
        }
    });
}

function randoms(num,max){ //重複無しの乱数発生装置。これはテストプレイ用。完成時にはサーバーサイドで全プレイヤーに共通のものを渡す必要がある
    console.log(num,max)
    var randoms = [];
    var tmp;
    var i=0;
    while(i<100){
        tmp = Math.floor(Math.random() * max);
        // console.log(tmp);
        if(!randoms.includes(tmp)) {randoms.push(tmp);}
        if(randoms.length >= num) { break; }
        i++;
    }
    console.log(randoms);
    return randoms;
}

// 紐付け
answerButton.onclick = answerButtonOnClick;
startButton.onclick = startButtonOnClick;

/* こっちはデバッグ 
var bousaiJSON = {
    question:[{
        text:"大きな地震に被災したときのことを想定します。<br>備蓄のあった以下の食べ物のどれかについて、<br>他の選択肢には無い長所を考えてみましょう。<br>限られた条件下で特に有用であれば、<br>条件を付け足してみても構いません。<br>",
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
            src:"food_kandume_close.png"
        }
        ]
    },
    {
        text:"大きな地震に被災したときのことを想定します。<br>水を保管、運搬するための以下の容器について、<br>他の選択肢には無い長所を考えてみましょう。<br>限られた条件下で特に有用であれば、<br>条件を付け足してみても構いません。<br>",
        image:[{
            alt:"ペットボトル",
            src:"bousai_water.png"
        },
        {
            alt:"バケツ",
            src:"bucket_blue_water_down.png"
        },
        {
            alt:"レジ袋",
            src:"shopping_bag_rejibukuro.png"
        }
        ]
    }
    ]
};

$(function(){
    Qnum = Math.floor(Math.random()*bousaiJSON.question.length);
    Inum = Math.floor(Math.random()*bousaiJSON.question[Qnum].image.length);
    console.log(bousaiJSON.question.length,"\n",bousaiJSON.question[Qnum].text,"\n",bousaiJSON.question[Qnum].image.length);
});
*/
