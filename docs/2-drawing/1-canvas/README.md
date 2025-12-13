# Canvasの基本的な使い方

HTML5のCanvas APIを使って、図形を描画する基本的な方法を学びます。Canvas要素は、JavaScriptを使って動的にグラフィックスを描画できる領域を提供します。

# ファイルの用意

次のように `index.html`、`style.css`、`main.js` の3つのファイルを作成してください。

```
./works
└── canvas
    ├── index.html
    ├── style.css
    └── main.js
```

まず、HTMLファイルにCanvas要素を追加します。

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

Canvas要素には`width`と`height`属性で描画領域のサイズを指定します。この例では400x300ピクセルのキャンバスを作成しています。

次に、スタイルシートでCanvasに枠線を追加します。

```css
canvas {
  border: 1px solid #CCC;
}
```

# コンテキストの取得

Canvas上に描画を行うには、まず描画コンテキスト(2Dコンテキスト)を取得する必要があります。

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

`getContext('2d')`メソッドで2D描画用のコンテキストオブジェクトを取得します。このオブジェクトを通じて、さまざまな描画メソッドを呼び出すことができます。

# 四角形=矩形の描画

矩形(四角形)を描画するには、`fillRect()`メソッドを使用します。

```javascript
// 四角形を描画
ctx.fillStyle = 'lightblue';
ctx.fillRect(50, 50, 150, 100);
```

- `fillStyle`で塗りつぶしの色を指定します(色名やHEXコード`#ADD8E6`が使えます)
- `fillRect(x, y, width, height)`で矩形を描画します
  - `x, y`: 左上の座標
  - `width, height`: 幅と高さ

# 円の描画

円を描画するには、パスを使用します。

```javascript
// 円を描画
ctx.beginPath();
ctx.arc(300, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = 'lightcoral';
ctx.fill();
```

- `beginPath()`で新しいパスを開始します
- `arc(x, y, radius, startAngle, endAngle)`で円弧を定義します
  - `x, y`: 中心座標
  - `radius`: 半径
  - `startAngle, endAngle`: 開始角度と終了角度(ラジアン)
- `fill()`でパスを塗りつぶします

arc の詳細については以下を参照してください。

https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc

# 線の描画

直線を描画するには、パスを使って始点と終点を指定します。

```javascript
// 線を描画
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(350, 200);
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;
ctx.stroke();
```

- `moveTo(x, y)`でパスの開始位置を設定します
- `lineTo(x, y)`で指定座標まで線を引きます
- `strokeStyle`で線の色を指定します
- `lineWidth`で線の太さを指定します
- `stroke()`でパスを描画します

## 複数の点をつないで線を描画

`lineTo()`を複数回使うことで、複数の点をつないだ線を描画できます。

```javascript
// 線を描画
ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(350, 200);
ctx.lineTo(200, 250);
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;
ctx.stroke();
```

この例では、3つの点 `(50, 200)` → `(350, 200)` → `(200, 250)` をつないだ線が描画されます。`lineTo()`を追加するたびに、新しい点まで線が伸びていきます。

# まとめ

この章では、Canvas APIの基本的な使い方を学びました:

- Canvas要素をHTMLに配置し、`getContext('2d')`で描画コンテキストを取得
- `fillRect()`で矩形を描画
- `arc()`と`fill()`で円を描画
- `moveTo()`、`lineTo()`、`stroke()`で線を描画

これらの基本的な図形描画メソッドを組み合わせることで、より複雑な図形やグラフィックスを作成できます。
