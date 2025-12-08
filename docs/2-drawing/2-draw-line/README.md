# マウスで線を描く

このセクションでは、段階的にお絵描きアプリケーションを作成していきます。

## ステップ1: マウスを動かすと線が描かれる

実装例: [./examples/1/](./examples/1/)

### 何を作るか

マウスカーソルが動いた軌跡に沿って線が描かれる基本的な機能を実装します。

### 実装手順

#### 1. HTMLファイルを作成する ([index.html](./examples/1/index.html))

```html
<html>
  <head>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <canvas id="canvas" width="400" height="300"></canvas>
    <script src="./main.js"></script>
  </body>
</html>
```

#### 2. CSSファイルを作成する ([style.css](./examples/1/style.css))

```css
canvas {
  border: 1px solid #CCC;
}
```

#### 3. JavaScriptファイルを作成する ([main.js](./examples/1/main.js))

```javascript
const canvas = document.getElementById('canvas');

canvas.addEventListener('mousemove', (e) => {
  const ctx = canvas.getContext('2d');
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
});
```

### 動作確認

ブラウザでHTMLファイルを開き、キャンバス上でマウスを動かすと線が描かれることを確認しましょう。

### 課題

この実装では、マウスを動かすだけで線が描かれてしまいます。次のステップでは、マウスをクリックしている間だけ線が描かれるように改善します。

---

## ステップ2: ドラッグで線を描く

実装例: [./examples/2/](./examples/2/)

### 何を作るか

ステップ1のコードを拡張して、マウスボタンを押している間だけ線が描かれるようにします。

### 実装手順

#### 1. main.jsを修正する

ステップ1で作成した [main.js](./examples/1/main.js) を以下のように修正します。

**変更点:**
- `drawing` 変数を追加して、描画中かどうかを管理
- `mousedown` イベントで描画を開始
- `mousemove` イベントで描画中のみ線を描く
- `mouseup` と `mouseleave` イベントで描画を終了

```javascript
const canvas = document.getElementById('canvas');

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const ctx = canvas.getContext('2d');
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});
```

### 動作確認

ブラウザでHTMLファイルを開き、マウスボタンを押しながらドラッグすると線が描かれることを確認しましょう。

---

## ステップ3: 追加の機能

実装例: [./examples/3/](./examples/3/)

### 何を作るか

ステップ2のコードに以下の機能を追加します:
- キャンバスをクリアする機能
- 線の色を変更する機能

### 実装手順

#### 1. index.htmlを修正する

ステップ2の [index.html](./examples/2/index.html) に、消去ボタンと色選択機能を追加します。

```html
<html>
  <head>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <button id="clearButton">消す</button>
    <input type="color" id="colorInput" value="#000000" />
    <canvas id="canvas" width="400" height="300"></canvas>
    <script src="./main.js"></script>
  </body>
</html>
```

#### 2. main.jsを修正する

ステップ2の [main.js](./examples/2/main.js) に、以下の機能を追加します。

**変更点:**
- `clearButton` と `colorInput` 要素を取得
- `clearButton` のクリックイベントでキャンバスをクリア
- `mousemove` イベント内で `colorInput` の値を取得して線の色に適用

```javascript
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearButton');
const colorInput = document.getElementById('colorInput');

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
```

### 動作確認

1. 色選択で異なる色を選んで線を描けることを確認
2. 消すボタンでキャンバスがクリアされることを確認
