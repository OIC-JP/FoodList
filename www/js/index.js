//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化
var ncmb = new NCMB("070898126fc8a57f789c8f7fa6dff549bba9773483c0a88ef8a506eed42a9c06","1f85ccf2e665bec807e342ff0f261dff3899338bf3b10b57875ae4906291224f");
// // 保存先クラスの作成
// var TestClass = ncmb.DataStore("TestClass");
// // 保存先クラスのインスタンスを生成
// var testClass = new TestClass();
// // 値を設定と保存
// testClass.set("message", "Hello, NCMB!")
//         .save()
//        .then(function(object){
//            // 保存に成功した場合の処理
//        })
//        .catch(function(err){
//            // 保存に失敗した場合の処理
//        });

//食材追加 クラスの作成
var Food = ncmb.DataStore("Food");
//クラスのインスタンスを生成
var food = new Food();
//値を保存
food.set();

ons.ready(function() {
  console.log("Onsen UI is ready!");
});

window.fn = {};
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
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

//addボタンをクリックした際の処理
popup = function(){
    var dialog = document.getElementById('dialog');
    dialog.showModal();
}

//cancelボタンをクリックした際の処理
cancel = function(){
  var dialog = document.getElementById('dialog');
  dialog.close();
}

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}

