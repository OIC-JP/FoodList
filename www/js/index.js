//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化::::
var applicationKey = "070898126fc8a57f789c8f7fa6dff549bba9773483c0a88ef8a506eed42a9c06";
var clientKey = "1f85ccf2e665bec807e342ff0f261dff3899338bf3b10b57875ae4906291224f";
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
      var name = document.getElementById("name").value;
      // 作品名をエンコード
      var fileName = encodeURIComponent(name);
      var fileData = document.getElementById("img").files[0];
      var ca = document.getElementById("category");
      var n = document.getElementById("category").selectedIndex;
      var fileca = ca.options[n].value;
      var num = document.getElementById("num").value;
      var buy_date = document.getElementById("buy_date").value;
      var expiration_date = document.getElementById("expiration_date").value;
      var money = document.getElementById("money").value;

      var Food = ncmb.DataStore("Food");
      var food = new Food();
      food.set("name",name)
      food.set("category",fileca)
      food.set("num",num)
      food.set("buy_date",buy_date)
      food.set("expiration_date",expiration_date)
      food.set("money",money)
      .save();

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

//ここからおかしいです
var reader = new FileReader();
reader.onload = function(e) {
  var dataUrl = reader.result;
  document.getElementById("image").src = dataUrl;
}
function downloadImage(){

  $("#foodmainimg").attr("src","");
  $("#foodmainimg").val("");
  $("#foodmainimg").empty();

      // ファイル名からファイルを取得
      var fileName = "aia";
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
  if(cate != null){
    var Category = ncmb.DataStore("Category");
    var category = new Category();
    category.set("category",cate).save();
  }
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


/*＊＊＊＊＊＊遠藤作業中＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

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
