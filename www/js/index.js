
//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化
var applicationKey = "070898126fc8a57f789c8f7fa6dff549bba9773483c0a88ef8a506eed42a9c06";
var clientKey = "1f85ccf2e665bec807e342ff0f261dff3899338bf3b10b57875ae4906291224f";
var ncmb = new NCMB(applicationKey, clientKey);



function addpush(){
  // テキストエリアの値を取得する
  // var name = document.getElementById("name").value;
  var num = document.getElementById("num").value;
  // var date = document.getElementById("date").value;
  var money = document.getElementById("money").value;
  // アラートで表示する
  alert(num,money);

  //データをニフクラに保存する
  //食材追加 保存先クラスの作成
  var Food = ncmb.DataStore("Food");
  //クラスのインスタンスを生成
  var food = new Food();
  //値を保存
  food.set("num",num)
  food.set("money",money)
  .save();
}

ons.ready(function() {
  console.log("Onsen UI is ready!");
});

window.fn = {};
window.fn.open1 = function() {
  var menu = document.getElementById('menu');
  menu.open();
};
window.fn.open2 = function() {
  var sort = document.getElementById('sort');
  sort.open();
};
window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content
    .load(page)
    .then(menu.close.bind(menu));
};

//画像表示
function previewFile(obj) {
    var reader = new FileReader();
    reader.onload = (function() {
		  document.getElementById('preview').src = reader.result;
	  });
    reader.readAsDataURL(obj.files[0]);
}

//clearボタンを押したときの処理
function clearimg(){
  document.getElementById("preview").src = "img/noimage.jpg";
}

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}


/* 遠藤作業メモ領域＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

//並び替えメニューを選択した時

//賞味期限
document.getElementById("syoumi").onclick=mySort;
function mySort() {
    // (1) ノードリストを取得
    var myUL = document.getElementById("syokuzai");
    var myNodeList = myUL.getElementsByTagName("li");
    // (2) 配列を得る
    var myArray = Array.prototype.slice.call(myNodeList);
    // (3) 配列をソート
    function compareText (a,b) {
        if (a.textContent > b.textContent)
            return 1;
        else if (a.textContent < b.textContent)
            return -1;
        return 0;
        }
    myArray.sort(compareText);
    // (4) 新しい順番を DOM ツリーに反映
    for (var i=0; i<myArray.length; i++) {
        myUL.appendChild(myUL.removeChild(myArray[i]))
    }
}

//購入日
document.getElementById("kounyubi").onclick=mySort;
function mySort() {
    // (1) ノードリストを取得
    var myUL = document.getElementById("syokuzai");
    var myNodeList = myUL.getElementsByTagName("li");
    // (2) 配列を得る
    var myArray = Array.prototype.slice.call(myNodeList);
    // (3) 配列をソート
    function compareText (a,b) {
        if (a.textContent > b.textContent)
            return 1;
        else if (a.textContent < b.textContent)
            return -1;
        return 0;
        }
    myArray.sort(compareText);
    // (4) 新しい順番を DOM ツリーに反映
    for (var i=0; i<myArray.length; i++) {
        myUL.appendChild(myUL.removeChild(myArray[i]))
    }
}
*/
