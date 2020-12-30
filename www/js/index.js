//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化
var ncmb = new NCMB("070898126fc8a57f789c8f7fa6dff549bba9773483c0a88ef8a506eed42a9c06","1f85ccf2e665bec807e342ff0f261dff3899338bf3b10b57875ae4906291224f");

//データをニフクラに保存する
function saveData(){
  //食材追加 クラスの作成
var Food = ncmb.DataStore("Food");
//クラスのインスタンスを生成
var food = new Food();
//値を保存
food.set("syokuzai","ミカン");
//設定したデータをmobile backendに保存
    data.save()
        .then(function(object) {
              //成功する時の処理
              $("#message").html("<p>データの保存に成功しました</p>");
          })
        .catch(function(error) {
              //エラーが発生する時の処理        
              $("#message").html("error:"+error.message);
          });
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

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}

