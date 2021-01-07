//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化::::
var applicationKey = "070898126fc8a57f789c8f7fa6dff549bba9773483c0a88ef8a506eed42a9c06";
var clientKey = "1f85ccf2e665bec807e342ff0f261dff3899338bf3b10b57875ae4906291224f";
var ncmb = new NCMB(applicationKey, clientKey);


//addボタンを押した際の処理
function addpush(){
  // テキストエリアの値を取得する
  var img = document.getElementById("img").value;
  var num = document.getElementById("num").value;
  var money = document.getElementById("money").value;
  // アラートで表示する
  alert("画像　"+img+"　個数　"+num+"　金額　"+money);




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

