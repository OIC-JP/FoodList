//ニフクラとの連携エリア＊＊＊データベース永野＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

// APIキーの設定とSDK初期化:
var applicationKey = "395d40b7250d31db288e826be0020a404383690e7d4e0fc37ef43a5bd61916a5";
var clientKey = "50c00958b468ebe682b765254472f80f3e844f9d78c398dbd8ab3c0c1e05e4ce";
var ncmb = new NCMB(applicationKey, clientKey);

//起動時の処理
ons.ready(function() {
  categoryCreate();
});



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

          fileName = Name+"_"+Category+"_"+num+"_"+Buy_date[0]+Buy_date[1]+Buy_date[2]+"_"
                    +Expiration_date[0]+Expiration_date[1]+Expiration_date[2];

          ncmb.File.upload(fileName, fileData)
            .then(function(res){
              // アップロード後処理
              var Food = ncmb.DataStore("Food");        //ここ！！
              var food = new Food();
              food.set("buy_date",buy_date)
              food.set("money",money)
              .save();
              alert("アップロード成功");
              document.form.reset();
              document.getElementById("preview").src = "img/noimage.jpg";
            })
            .catch(function(err){
              // エラー処理
              alert("エラー");
            });

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
    var syoumi_arr = new Array();
    var kounyu_arr = new Array();
    var cnt=0;
    var day1;
    var day2;
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
                            p.setAttribute("class","food-font");
                            day1 = fileNameArray[4].substr(0, 4)+"/"+fileNameArray[4].substr(4, 2)+"/"+fileNameArray[4].substr(6, 2); //賞味期限
                            //賞味期限をDate型に変換
                            var day1Date = new Date (fileNameArray[4].substr(0, 4),fileNameArray[4].substr(4, 2)-1,fileNameArray[4].substr(6, 2));
                            //残り日数を計算
                            var termDay = (day1Date - end) / 86400000;
                            var showDay = Math.ceil(termDay);//残り日数
                            day2 = fileNameArray[3].substr(0, 4)+"/"+fileNameArray[3].substr(4, 2)+"/"+fileNameArray[3].substr(6, 2); //購入日
                            if(showDay <= 3){
                              p.setAttribute("style","color:red");
                              p.innerHTML = "商品名："+fileNameArray[0]+"<br>個数："+fileNameArray[2]+"<br>賞味期限："+day1+"<br>購入日："+day2+"<br>"+"<ons-button id='cancelbtn' onclick=\"cancelimg('"+fileName+"')\">"+"×"+"</ons-button>";
                            }else{
                              p.innerHTML = "商品名："+fileNameArray[0]+"<br>個数："+fileNameArray[2]+"<br>賞味期限："+day1+"<br>購入日："+day2+"<br>"+"<ons-button id='cancelbtn' onclick=\"cancelimg('"+fileName+"')\">"+"×"+"</ons-button>";
                            }
                            var c = "haiti"+" "+"すべて"+" "+fileNameArray[1];
                            li.setAttribute("class",c);
                            var img = document.createElement("img");
                            img.setAttribute("src",dataUrl);
                            img.setAttribute("class","food-item");
                            img.setAttribute("id",id);
                            li.appendChild(img);
                            li.appendChild(p); 
                            document.getElementById("food-list").appendChild(li);
                          

                            //賞味期限と購入日を配列に格納
                            syoumi_arr[cnt] += day1;
                            kounyu_arr[cnt] += fileNameArray[3];                   
                            cnt++;
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

    //食材の削除
    function cancelimg(filename){
      var fa = filename.split('_');
      var fn = encodeURI(filename);
      var res = confirm("｢"+fa[0]+"｣"+"を消しますか？");
      if(res == true){
        ncmb.File.delete(fn)
        .then(function(){
          setTimeout("location.reload()",700);
        })
        .catch(function(err){
          alert("エラー");
        });
      }
    }

    //メニューを開く処理
    window.fn = {};
    window.fn.open1 = function() {
      var menu = document.getElementById('menu');
      menu.open();
    };
    window.fn.open2 = function() {
      var sort = document.getElementById('sort');
      sort.open();
    };
    //画面遷移処理
    window.fn.load = function(page) {
      var content = document.getElementById('content');
      var menu = document.getElementById('menu');
      content
        .load(page)
        .then(menu.close.bind(menu));
      categoryCreate();
      selectboxCreate();
      accountbookCreate();
    };

    //ホーム画面のカテゴリー作成処理
    function categoryCreate(){
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
    }
    //食材追加画面のセレクトボックス作成処理
    function selectboxCreate(){
      var cg = ncmb.DataStore("Category");
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
    }

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

    //***並び替えメニュー  遠藤作業中　ＨＥＬＰ！！！！！！！
    //賞味期限順
    function syoumiFunk(){
      
          //ノードリストを取得
          var syokuzai = document.getElementById("food-list");
         
          //並び替え
          syoumi_arr.sort();//配列内の要素は並び替えできる
  
          for (var i=0;i<syoumi_arr.length;i++) {
            alert(syoumi_arr[i]);
             //syokuzai.appendChild(syokuzai.removeChild(syoumi_arr[i])); ?
             //document.getElementById("food-list").appendChild(li); ?
          }
          //配列を並び替えたはいいけど、その後食材の再表示するのが分からん、、
          //setTimeout("location.reload()",700);
      }
    

    //購入日順
    function kounyuFunk(){
      kounyu_arr.sort();
      alert(kounyu_arr);
    }
    
    


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




//＊＊＊カテゴリー＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

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

    //カテゴリー削除ダイアログの表示
    function showDialog(){
      var dialog = document.getElementById("dialog");
      if (dialog) {
        createcheckbox();
        dialog.show();
      } else {
        ons.createElement('dialog.html', { append: true })
        .then(function(dialog) {
          createcheckbox();
          dialog.show();
        });
      }
    }

    //チェックボックスの作成
    function createcheckbox(){
      document.getElementById("dialog-item").innerHTML = "";
      var cg = ncmb.DataStore("Category");
      var checkbox = "";
      cg.order("createDate")
        .fetchAll()
        .then(function(results){
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            checkbox += "<input type='checkbox' name='check' value='"+object.category+"'>"+object.category;
          }
          document.getElementById("dialog-item").insertAdjacentHTML("afterbegin",checkbox);
        })
        .catch(function(err){
            console.log(err);
        });
    }

    //カテゴリー削除処理
    function deleteDialog(){
      var cg = ncmb.DataStore("Category");
      var deleteArray = [];
      var check = document.getElementsByName("check");
      for (let i = 0; i < check.length; i++){
		    if(check[i].checked){
			    deleteArray.push(check[i].value);
		    }
	    }
      var res = confirm("選択したカテゴリーを消しますか？");
      if(res == true){
        for(let i = 0; i < deleteArray.length; i++){
          cg.equalTo("category", deleteArray[i])
            .fetch()
            .then(function(result){
              result.delete();
            })
            .catch(function(err){
              alert("エラー");
            });
        }
        hideDialog();
        setTimeout("location.reload()",700);
      }
    }

    //カテゴリー削除ダイアログの非表示
    function hideDialog() {
      document.getElementById("dialog").hide();
    };

//現在日付を取得
var end = new Date();

//＊＊＊家計簿＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

  //金額取得・表示
  function accountbookCreate(){
    var mn = ncmb.DataStore("Food");
    var month1 = 0;  //今月の合計(end)  //今月-先月と先月-先々月
    var month2 = 0;  //先月の合計(last_month)
    var month3 = 0;  //先々月の合計(last_lastmonth)
    var last_month = new Date(end.getFullYear(), end.getMonth()-1, end.getDate());
    var last_lastmonth = new Date(end.getFullYear(), end.getMonth()-2, end.getDate())
    mn.order("createDate")
      .fetchAll()
      .then(function(results){
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var money = Number(object.money);
          var array = object.buy_date.split("/");
          var date = new Date(array[0],array[1]-1,array[2]);
          if(date.getFullYear() == end.getFullYear()){
            if(date.getMonth() == end.getMonth()){
              month1 += money;
            }
          }else if(date.getFullYear() == last_month.getFullYear()){
            if(date.getMonth() == last_month.getMonth()){
              month2 += money;
            }
          }else if(date.getFullYear() == last_lastmonth.getFullYear()){
            if(date.getMonth() == last_lastmonth.getMonth()){
              month3 += money;
            }
          }
        }
        var month1_month2 = month1-month2;
        var month2_month3 = month2-month3;
        document.getElementById("nowmonth").innerHTML = month1+"円";
        document.getElementById("lastmonth").innerHTML = month2+"円";
        document.getElementById("nowmonth_df").innerHTML = month1_month2+"円";
        document.getElementById("lastmonth_df").innerHTML = month2_month3+"円";
      })
      .catch(function(err){
        console.log(err);
      });
  }

