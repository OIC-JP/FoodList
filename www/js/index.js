//ニフクラとの連携エリア＊＊＊データベース＊＊永野がやった＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
// APIキーの設定とSDK初期化::::
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
  alert("個数"+num+"　金額"+money);

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


// ＊＊＊＊＊＊＊＊＊＊＊＊サンプルコードのコピペ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
/* ＊＊＊[NCMB] ファイルストア（画像のアップロード/ダウンロード）＊＊＊＊＊＊ */
// 「アップロード」ボタン押下時の処理
function onUploadBtn() {
    // 作品名を取得
    var imgName = $("#imgName").val();
    // 入力チェック
    if (imgName == "") {
        alert("作品名を入力してください");
        return;
    }
    if (imgFlag == false) {
        alert("投稿する写真を選択してください");
        return;
    }

    var img = document.getElementById('photo_image');
    var photoType = $("#photo")[0].files[0].type;
    var base64 = ImageToBase64(img, photoType);
    var photoData = toBlob(base64, photoType);

    // loading の表示
    $.mobile.loading('show', {
        text: 'Sending...',
        textVisible: true,
        theme: 'a',
        textonly: false,
        html: ''
    });

    // uuidを生成
    var uuid = makeUUID();
    // 選択した画像のファイル名を取得
    var fileName = $("#photo")[0].files[0].name;
    var sp = fileName.split('.');
    // 選択した画像の拡張子を取得
    var fileName_type = sp[sp.length-1];
    // 作品名をエンコード
    imgName = encodeURIComponent(imgName);
    // カレントユーザーのユーザー名を取得
    var currentUserName = currentUser.get("userName");
    // 作品の保存名を作成「作品名_作者名_uuid.拡張子」
    var photoName = imgName + "_" + currentUserName + "_" + uuid + "." + fileName_type;

    // 参照権限（ACL）を生成
    var acl = new ncmb.Acl();
    // 全員「読み込み可」、特定のユーザーのみの「書き込み可」で設定
    acl.setPublicReadAccess(true)
        .setUserReadAccess(currentUser, true)
        .setUserWriteAccess(currentUser, true);

    // 写真アップロード
    ncmb.File
            .upload(photoName, photoData, acl)
            .then(function(result){
                // アップロード成功時の処理
                alert("アップロード成功");
                console.log("アップロード成功");
                // フィールドを空に
                onDeleteHomeScreenPageField();
                // loading の非表示
                $.mobile.loading('hide');
            })
            .catch(function(error){
                // アップロード失敗時の処理
                alert("アップロード失敗：" + error);
                console.log("アップロード失敗：" + error);
                // loading の非表示
                $.mobile.loading('hide');
            });
}


// ファイルストアに格納されたファイルデータ（画像本体以外の情報）を取得＜全ての作品＞
function getAllFileData(){
    // フィールドを空に
    onDeleteEveryonePageField();
    // loading の表示
    $.mobile.loading('show', {
        text: 'Loading...',
        textVisible: true,
        theme: 'a',
        textonly: false,
        html: ''
    });

    ncmb.File
            .order("createDate",true) // 作成日の降順を指定
            .limit(10) // 取得件数を10件で指定
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
                                $.mobile.loading('hide');
                            })
                            .catch(function(error){
                                // 全てのPromise処理成功時の処理
                                console.log("Promise処理に失敗(allFile)：" + error);
                                alert("Promise処理に失敗(allFile)" );
                                // loading の表示を終了
                                $.mobile.loading('hide');
                            });
            })
            .catch(function(error){
                // ファイルデータ取得失敗時の処理
                console.log("ファイルデータ取得失敗(allFile)：" + error);
                alert("ファイルデータ取得失敗(allFile)" );
                // loading の表示を終了
                $.mobile.loading('hide');
            });
}


// ファイルストアから画像を取得して「みんなの投稿」に表示
function downloadFile(object, i) {
    /*** Promise ***/
    return new Promise(function(resolve, reject) {        
        // 画像・作品名・作者名の表示先を指定
        var imageId = "image_" + i;
        var titleId = "title_" + i;
        var posterId = "poster_" + i;

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
                              document.getElementById(imageId).src = dataUrl;
                              //  ファイル名を分解
                              var fileNameArray = fileName.split('_');
                              // 作品名を表示
                              var imageName = "作品名「" + fileNameArray[0] + "」";
                              document.getElementById(titleId).innerHTML = imageName;
                              // 作者名を表示
                              var posterName = "作者：" + fileNameArray[1] + "さん";
                              document.getElementById(posterId).innerHTML = posterName;
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