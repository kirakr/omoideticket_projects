document.getElementById('getqrInfo').addEventListener('click', () => {
  // 入力された文字列を取得
  var userInput = document.getElementById('isbn').value;
  var query = userInput.split(' ').join('+');
  // QRコードの生成
  (function() {
     var qr = new QRious({
       element: document.getElementById('image2'),
       // 入力した文字列でQRコード生成
       value: query
  });
  qr.background = '#FFF'; //背景色
  qr.backgroundAlpha = 1.0; // 背景の透過率
  qr.foreground = '#000000'; //QRコード自体の色
  qr.foregroundAlpha = 9.0; //QRコード自体の透過率
  qr.level = 'L'; // QRコードの誤り訂正レベル
  qr.size = 120; // QRコードのサイズ
       // qrcodeの表示位置を指定
     qr.x = 100;
     qr.y = 100;
  })();
});



window.onload = () => {
  // #image1にチケット画像を描画
  drawImage1();

  // #image2にQRcodeを描画
  drawImage2();

  // 「合成」ボタンを押したら合成
  document.querySelector("#btn-concat").addEventListener("click", ()=>{
    concatCanvas("#concat", ["#image1", "#image2"]);
  });

  // 「削除」ボタンを押したらクリア
  document.querySelector("#btn-eraser").addEventListener("click", ()=>{
    eraseCanvas("#concat");
  });

};

//チケット画像を描写
function drawImage1(){
  const Ticket = new Image();
  Ticket.src = "imag/ticket-nomal2.png";
  Ticket.onload = () =>{
    const canvas = document.querySelector("#image1");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(Ticket, 0, 0, canvas.width/1, canvas.height/1);
  }
}

//qrcodeを描写
function drawImage2(){
  const canvas = document.querySelector("#image2");
  const ctx = canvas.getContext("2d");

}

//追加
const assetPositions = {
'#image1': { x: 0, y: 0 }, // チケットの描画座標
'#image2': { x: 410, y: 190 }, // QRコードの描画座標
};

document.getElementById('savebtn').addEventListener('click', async () => {
const canvasId = '#concat';
const image = await getImagefromCanvas(canvasId);

const link = document.createElement('a');
link.href = image.src;
link.download = 'ticket.png';
link.click();
});


//Canvas合成
//@param {string} base 合成結果を描画するcanvas(id)
//@param {array} asset 合成する素材canvas(id)
//@return {void}
async function concatCanvas(base, asset) {
const canvas = document.querySelector(base);
const ctx = canvas.getContext('2d');

for (let i = 0; i < asset.length; i++) {
const assetId = asset[i];
const image = await getImagefromCanvas(assetId);
const position = assetPositions[assetId];
if (position) {
ctx.drawImage(image, position.x, position.y);
}
}
}


//Canvasをすべて削除する
// function eraseCanvas(target){
//   const canvas = document.querySelector(target);
//   const ctx = canvas.getContext("2d");
//   ctx.clearRect(0, 0, canvas.width/1, canvas.height/1);
// }

//Canvasを画像として取得
function getImagefromCanvas(id){
  return new Promise((resolve, reject) => {
    const image = new Image();
    const ctx = document.querySelector(id).getContext("2d");
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
    image.src = ctx.canvas.toDataURL();
  });
}

