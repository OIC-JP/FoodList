//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化::::
var applicationKey = "395d40b7250d31db288e826be0020a404383690e7d4e0fc37ef43a5bd61916a5";
var clientKey = "50c00958b468ebe682b765254472f80f3e844f9d78c398dbd8ab3c0c1e05e4ce";
var ncmb = new NCMB(applicationKey, clientKey);

//カテゴリー追加　小銭作成中
function category_item(){
  var cg = ncmb.DataStore("Category");
  var cg_item1 = "";
  cg.order("createDate")
    .limit(10)
    .fetchAll()
    .then(function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        cg_item1 = cg_item1+"<option value="+object.category+">"+object.category+"</option>";
      }
      document.getElementById("category").innerHTML = cg_item1;
    })
    .catch(function(err){
        console.log(err);
    });
}

var addpush = function(){
      var fileName = document.getElementById("name").value;
      var fileData = document.getElementById("img").files[0];

      ncmb.File.upload(fileName, fileData)
        .then(function(res){
          // アップロード後処理
          alert("アップロード成功");
        })
        .catch(function(err){
          // エラー処理
          alert("エラー");
        });
}



    var reader = new FileReader();
    reader.onload = function(e) {
      var dataUrl = reader.result;
      document.getElementById("image").src = dataUrl;
    }

//ここからおかしいです
    function downloadImage(){
          // ファイル名からファイルを取得
          var fileName = "king.jpeg";

          // ダウンロード（データ形式をblobを指定）
          ncmb.File.download(fileName, "blob")
              .then(function(blob) {
              // ファイルリーダーにデータを渡す
              reader.readAsDataURL(blob);
              })
              .catch(function(err) {
                  console.error(err);
              })
        }
//ここまでが


// function addpush(){
//   // テキストエリアの値を取得する
//   // var name = document.getElementById("name").value;
//   var num = document.getElementById("num").value;
//   // var date = document.getElementById("date").value;
//   var money = document.getElementById("money").value;
//   // アラートで表示する
//   alert("個数"+num+"　金額"+money);

//   //データをニフクラに保存する
//   //食材追加 保存先クラスの作成
//   var Food = ncmb.DataStore("Food");
//   //クラスのインスタンスを生成
//   var food = new Food();
//   //値を保存
//   food.set("num",num)
//   food.set("money",money)
//   .save();


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

//カテゴリー追加
function categoryadd(){
  var cate=prompt("追加するカテゴリーを入力してください");
  var Category = ncmb.DataStore("Category");
  var category = new Category();
  category.set("category",cate).save();
}

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

//賞味期限順
document.getElementById("syoumi").onclick=Sort1;
function Sort1() {
    // (1) ノードリストを取得
    var syokuzai = document.getElementById("syokuzai");
    var node = syokuzai.getElementsByTagName("li");
    // (2) 配列を得る
    var Array = Array.prototype.slice.call(node);
    // (3) 配列をソート
    function compareText (a,b) {
        if (a.textContent > b.textContent)
            return 1;
        else if (a.textContent < b.textContent)
            return -1;
        return 0;
        }
    Array.sort1(compareText);
    // (4) 新しい順番を DOM ツリーに反映
    for (var i=0; i<Array.length; i++) {
        syokuzai.appendChild(syokuzai.removeChild(Array[i]))
    }
}

//購入日順
document.getElementById("kounyubi").onclick=Sort2;
function Sort2() {
    // (1) ノードリストを取得
    var syokuzai = document.getElementById("syokuzai");
    var node = syokuzai.getElementsByTagName("li");
    // (2) 配列を得る
    var Array = Array.prototype.slice.call(node);
    // (3) 配列をソート
    function compareText (a,b) {
        if (a.textContent > b.textContent)
            return 1;
        else if (a.textContent < b.textContent)
            return -1;
        return 0;
        }
    Array.sort(compareText);
    // (4) 新しい順番を DOM ツリーに反映
    for (var i=0; i<Array.length; i++) {
        syokuzai.appendChild(syokuzai.removeChild(Array[i]))
    }
}


//日付の並び替え方法

//配列準備
const array = ['1940/10/9', '1967/2/20', '1943/2/25', '1942/6/18', '1969/1/14', '1940/7/7', '1965/5/16'];

//昇順
const ascArray = [...array].sort((a, b) => new Date(a) - new Date(b));

//降順
const descArray = [...array].sort((a, b) => new Date(b) - new Date(a));


*/
