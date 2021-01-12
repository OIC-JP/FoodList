//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化::::
var applicationKey = "395d40b7250d31db288e826be0020a404383690e7d4e0fc37ef43a5bd61916a5";
var clientKey = "50c00958b468ebe682b765254472f80f3e844f9d78c398dbd8ab3c0c1e05e4ce";
var ncmb = new NCMB(applicationKey, clientKey);

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
function downloadImage(){
  ncmb.File
            .order("createDate",true) // 作成日の降順を指定
            .fetchAll()
            .then(function(results){
                // ファイルデータ取得成功時の処理
                console.log("ファイルデータ取得成功(allFile)");

                var promises = [];
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // ファイルデータを元にPromiseを使って１件ずつ同期処理でファイルストアから画像を取得
                    promises.push(downloadFile(object, i)); 
                }

                /*** Promise ***/
                Promise.all(promises)
                            .then(function(results) {
                                // 全てのPromise処理成功時の処理
                                 console.log("全てのPromise処理に成功(allFile)：" + results + " OK");
                                // loading の表示を終了
                            })
                            .catch(function(error){
                                // 全てのPromise処理成功時の処理
                                console.log("Promise処理に失敗(allFile)：" + error);
                                alert("Promise処理に失敗(allFile)" );
                                // loading の表示を終了
                            });
            })
            .catch(function(error){
                // ファイルデータ取得失敗時の処理
                console.log("ファイルデータ取得失敗(allFile)：" + error);
                alert("ファイルデータ取得失敗(allFile)" );
                // loading の表示を終了
            });
}

function downloadFile(object, i) {
    /*** Promise ***/
    return new Promise(function(resolve, reject) {        
        // 画像・作品名・作者名の表示先を指定
        var id = "syokuzai_" + i;

        // ファイルデータからファイル名を取得
        var fileName = object.fileName;
        var fileName_encode = encodeURI(fileName);

        // ファイルのダウンロード（データ形式をblobを指定）
        ncmb.File.download(fileName_encode, "blob")
                      .then(function(blob) {
                          // ファイルダウンロード成功時の処理
                          var reader = new FileReader();
                          reader.onload = function(e) {
                              // 画像URLを設定
                              var dataUrl = reader.result;
                              var li = document.createElement("li");
                              li.setAttribute("class","haiti");
                              var img = document.createElement("img");
                              img.setAttribute("src",dataUrl);
                              img.setAttribute("width",80);
                              img.setAttribute("height",80);
                              img.setAttribute("id",id);
                              li.appendChild(img);
                              document.getElementById("food-list").appendChild(li);
                          }
                          // ファイルリーダーにデータを渡す
                          reader.readAsDataURL(blob);
                          
                          resolve("画像" +i); 
                      })
                      .catch(function(error) {
                          // ファイルダウンロード失敗時の処理
                          reject("画像" + i);
                      });
    });
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
  var cg = ncmb.DataStore("Category");
  var cg_item1 = "";
  cg.order("createDate")
    .fetchAll()
    .then(function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        cg_item1 += "<li class='menu-item'><a href='#'>"+object.category+"</a></li>";
      }
      document.getElementById("menu-list").insertAdjacentHTML("beforeend",cg_item1);
    })
    .catch(function(err){
        console.log(err);
    });
  var cg_item2 = "";
  cg.order("createDate")
    .fetchAll()
    .then(function(results){
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        cg_item2 += "<option value="+object.category+">"+object.category+"</option>";
      }
      document.getElementById("category").insertAdjacentHTML("afterbegin",cg_item2);
    })
    .catch(function(err){
        console.log(err);
    });
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
