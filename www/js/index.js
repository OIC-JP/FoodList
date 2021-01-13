//ニフクラとの連携エリア＊＊＊データベース永野＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

// APIキーの設定とSDK初期化:
var applicationKey = "070898126fc8a57f789c8f7fa6dff549bba9773483c0a88ef8a506eed42a9c06";
var clientKey = "1f85ccf2e665bec807e342ff0f261dff3899338bf3b10b57875ae4906291224f";
var ncmb = new NCMB(applicationKey, clientKey);




//＊＊＊食材の一覧＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

    var addpush = function(){
          var name = document.getElementById("name").value;
          var Name = encodeURIComponent(name);
          var fileData = document.getElementById("img").files[0];
          var ca = document.getElementById("category");
          var n = document.getElementById("category").selectedIndex;
          var category = ca.options[n].value;
          var Category = encodeURIComponent(category);
          var num = document.getElementById("num").value;
          var buy_date = document.getElementById("buy_date").value; //購入日
          var Buy_date = buy_date.split('/');
          var expiration_date = document.getElementById("expiration_date").value; //賞味期限
          var Expiration_date = expiration_date.split('/');
          var money = document.getElementById("money").value;
          Buy_date[1] = Buy_date[1].padStart(2, '0');
          Buy_date[2] = Buy_date[2].padStart(2, '0');
          Expiration_date[1] = Expiration_date[1].padStart(2, '0');
          Expiration_date[2] = Expiration_date[2].padStart(2, '0');


          var Food = ncmb.DataStore("Food");    //ここ！！！！！
          var food = new Food();
          food.set("name",name)
          food.set("category",category)
          food.set("num",num)
          food.set("buy_date",buy_date)
          food.set("expiration_date",expiration_date)
          food.set("money",money)
          .save();

          // fileName = fileName+"_"+fileCategory;

          fileName = Name+"_"+Category+"_"+num+"_"+Buy_date[0]+Buy_date[1]+Buy_date[2]+"_"
                    +Expiration_date[0]+Expiration_date[1]+Expiration_date[2];

          ncmb.File.upload(fileName, fileData)
            .then(function(res){
              // アップロード後処理
              alert("アップロード成功");
            })
            .catch(function(err){
              // エラー処理
              alert("エラー");
            });
          
          var Food = ncmb.DataStore("Food");
          var food = new Food();
          food.set("buy_date",buy_date)
          food.set("money",money)
          .save();

          document.form.reset();
          document.getElementById("preview").src = "img/noimage.jpg";
    }

   //***食材表示
    function downloadImage(){
      document.getElementById("food-list").innerHTML = "";
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

    //食材表示関数
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
                            var fileNameArray = fileName.split('_');
                            var li = document.createElement("li");
                            var p = document.createElement("p");
                            p.innerHTML = "商品名："+fileNameArray[0]+"<br>個数："+fileNameArray[2];
                            var c = "haiti"+" "+"すべて"+" "+fileNameArray[1];
                            li.setAttribute("class",c);
                            var img = document.createElement("img");
                            img.setAttribute("src",dataUrl);
                            img.setAttribute("class","food-item");
                            img.setAttribute("id",id);
                            li.appendChild(img);
                            li.appendChild(p);
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

    function cancelimg(){
      alert(aa);
      Food.delete()
      .then(function(result){
      console.log(result); //true
      alert("できた");
      })
      .catch(function(err){
      //エラー処理
      alert("エラー");
      });
    }
   

    //→　ここどのページについてのコードですか？？分かる人移動させてくれ、、、
    ons.ready(function() {
      var cg = ncmb.DataStore("Category");
      var cg_item1 = "";
      cg.order("createDate")
        .fetchAll()
        .then(function(results){
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            cg_item1 += "<li class='menu-item'><a href='#"+object.category+"'>"+object.category+"</a></li>";
          }
          document.getElementById("menu-list").insertAdjacentHTML("beforeend",cg_item1);
        })
        .catch(function(err){
            console.log(err);
        });
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
            cg_item1 += "<li class='menu-item'><a href='#"+object.category+"'>"+object.category+"</a></li>";
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
    //←

    //***カテゴリーごとの食材表示
    $(document).on('click', '.menu-list a', function() {
        var lists = $('.food-list li');
        // 絞り込みの対象を取得
        var target = $(this).attr('href').replace('#', '');
        lists.each(function(e) {
            // 絞り込み対象の場合は表示
            if($(this).hasClass(target)) {
                $(this).show();
            // 絞り込み対象でない場合は非表示
            } else {
                $(this).hide();
            }
        });
    });


    //***並び替えメニュー

     //カテゴリー追加
    //賞味期限順
    function syoumiFunk(){
      alert("a");
          // (1) ノードリストを取得
          var syokuzai = document.getElementById("food-item");
          var node = syokuzai.getElementById("c");
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
    // document.getElementById("kounyubi").onclick=Sort2;
    // function Sort2() {
    //     // (1) ノードリストを取得
    //     var syokuzai = document.getElementById("syokuzai");
    //     var node = syokuzai.getElementsByTagName("li");
    //     // (2) 配列を得る
    //     var Array = Array.prototype.slice.call(node);
    //     // (3) 配列をソート
    //     function compareText (a,b) {
    //         if (a.textContent > b.textContent)
    //             return 1;
    //         else if (a.textContent < b.textContent)
    //             return -1;
    //         return 0;
    //         }
    //     Array.sort(compareText);
    //     // (4) 新しい順番を DOM ツリーに反映
    //     for (var i=0; i<Array.length; i++) {
    //         syokuzai.appendChild(syokuzai.removeChild(Array[i]))
    //     }
    // }




//＊＊＊食材の追加＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

    //選択した画像の表示
    function previewFile(obj) {
        var reader = new FileReader();
        reader.onload = (function() {
          document.getElementById('preview').src = reader.result;
        });
        reader.readAsDataURL(obj.files[0]);
    }

    //画像clearボタンを押したとき
    function clearimg(){
      document.getElementById("preview").src = "img/noimage.jpg";
    }

    if (ons.platform.isIPhoneX()) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }




//＊＊＊カテゴリーの追加＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

    //カテゴリー追加
    function categoryadd(){
      var cate=prompt("追加するカテゴリーを入力してください");
      if(cate != null){
        var Category = ncmb.DataStore("Category");
        var category = new Category();
        category.set("category",cate).save();
        setTimeout("location.reload()",700);
      }
    }
