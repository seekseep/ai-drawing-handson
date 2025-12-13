# 画像をキャンバスに描く

すでにある画像を直接キャンバスに描くこともできます。このセクションでは、前のステップで作成したお絵描きアプリに画像挿入機能を追加します。

# ファイルの用意

次のように `index.html`、`style.css`、`main.js`、そして画像ファイル（`dog.png`、`bird.png`、`fish.png`）を作成してください。

```
./works
└── put-image
    ├── index.html
    ├── style.css
    ├── main.js
    ├── dog.png
    ├── bird.png
    └── fish.png
```

画像ファイルは、[docs/2-drawing/assets/](../assets/) からコピーするか、自分で用意した画像を使用してください。

実装例: [./examples/1/](./examples/1/)

## 何を作るか

前のステップ（マウスで線を描く）のコードを拡張して、以下の機能を追加します:
- 画像をクリックするとキャンバスに描画される機能

## 実装手順

### 1. index.htmlを修正する

前のステップの [index.html](../2-draw-line/examples/3/index.html) に、画像要素を追加します。

**変更点:**
- 画像要素（犬、鳥、魚）を追加
- クリック可能なサムネイル画像として表示

```html
<html>
  <head>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div>
      <button id="clearButton">消す</button>
      <input type="color" id="colorInput" value="#000000" />
    </div>
    <div>
      <img id="dogImage" src="./dog.png" width="100" height="100" />
      <img id="birdImage" src="./bird.png" width="100" height="100" />
      <img id="fishImage" src="./fish.png" width="100" height="100" />
    </div>
    <canvas id="canvas" width="400" height="300"></canvas>
    <script src="./main.js"></script>
  </body>
</html>
```

### 2. style.cssを修正する

前のステップの [style.css](../2-draw-line/examples/3/style.css) に、画像のスタイルを追加します。

**変更点:**
- `img` 要素のスタイルを追加して、画像のサイズを調整

```css
canvas {
  border: 1px solid #CCC;
}

img {
  width: 200px;
  height: auto;
}
```

### 3. main.jsを修正する

前のステップの [main.js](../2-draw-line/examples/3/main.js) に、画像描画機能を追加します。

**変更点:**
- `dogImage`、`birdImage`、`fishImage` 要素を取得
- 各画像のクリックイベントで `ctx.drawImage()` を使用してキャンバスに描画

```javascript
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearButton');
const colorInput = document.getElementById('colorInput');
const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const color = colorInput.value;

  const ctx = canvas.getContext('2d');
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

clearButton.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

birdImage.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(birdImage, 0, 0, 400, 300);
});

dogImage.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(dogImage, 0, 0, 400, 300);
});

fishImage.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(fishImage, 0, 0, 400, 300);
});
```

## 動作確認

1. ブラウザでHTMLファイルを開く
2. 画像（犬、鳥、魚）をクリックするとキャンバスに描画されることを確認
3. 描画された画像の上から線を描けることを確認
4. 消すボタンでキャンバスがクリアされることを確認

## `ctx.drawImage()` について

`ctx.drawImage()` メソッドは、画像をキャンバスに描画するためのメソッドです。

```javascript
ctx.drawImage(image, x, y, width, height);
```

- `image`: 描画する画像要素
- `x`, `y`: キャンバス上の描画開始位置
- `width`, `height`: 描画する画像のサイズ


