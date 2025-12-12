# インタラクション

この節では　JavaScript を使って簡単なカウンターアプリを作ってみましょう。

# ファイルの用意

次のように `index.html` と `main.js` の2つのファイルを作成してください。

```
./works
└── interaction
    ├── index.html
    └── main.js
```

# ステップ1: 数を増やす

ボタンを押すと数が増えていくカウンターアプリを作成します。

[完成例](./examples/1/index.html)

## HTML
`index.html` ファイルに以下の内容を書き込んで保存してください。

```html
<html>
  <body>
    <div id="count">0</div>
    <button id="incrementButton">+</button>
    <script src="./main.js"></script>
  </body>
</html>
```

## JavaScript

次のように `main.js` ファイルに内容を書き込んで保存してください。

```javascript
const incrementButton = document.getElementById('incrementButton');
const countDisplay = document.getElementById('count');

let count = 0;

incrementButton.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

```

## 要素の取得

`document.getElementById` を使ってHTMLの要素を取得しています。引数には取得したい要素の `id` 属性の値を指定します。

その他にも要素を取得する方法があります。詳しくは以下のドキュメントを参照してください。

- https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById
- https://developer.mozilla.org/ja/docs/Web/API/Document/getElementsByTagName
- https://developer.mozilla.org/ja/docs/Web/API/Document/getElementsByClassName
- https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector
- https://developer.mozilla.org/ja/docs/Web/API/Document/querySelectorAll

さらに簡易的には `document.id` という書き方もあります。

```javascript
const incrementButton = document.incrementButton;
```

ただし、この方法だと変数名と衝突することがあるので注意が必要です。

## イベントハンドラの設定

`addEventListener` メソッドを使って、ボタンがクリックされたときの処理を設定しています。

基本的な記法としては以下のようになります。

```javascript
element.addEventListener('イベント名', イベントハンドラ関数);
```

イベント名にはクリックの場合は `'click'` を指定します。その他に代表的なイベントは以下の通りです。

- `mouseover`: マウスが要素に乗ったとき
- `mouseout`: マウスが要素から離れたとき
- `keydown`: キーが押されたとき
- `keyup`: キーが離されたとき

## テキストの更新

HTMLの要素のテキストを更新するには、`textContent` プロパティを使います。

```javascript
countDisplay.textContent = count;
```

直接HTMLを更新したい場合は、`innerHTML` プロパティを使います。

```javascript
countDisplay.innerHTML = '<b>' + count + '</b>';
```

こうすると、太字で数が表示されます。

[`<b />`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/b) タグは文字を太字にするタグです。

# ステップ2: 数を減らす

数が減るボタンを追加してみましょう。

[完成例](./examples/2/index.html)

## HTML

`index.html` ファイルを以下のように書き換えて保存してください。

```html
<html>
  <body>
    <div id="count">0</div>
    <button id="incrementButton">+</button>
    <button id="decrementButton">-</button>
    <script src="./main.js"></script>
  </body>
</html>
```

## JavaScript

`main.js` ファイルを以下のように書き換えて保存してください。

```javascript
const incrementButton = document.getElementById('incrementButton');
const decrementButton = document.getElementById('decrementButton');
const countDisplay = document.getElementById('count');

let count = 0;

incrementButton.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

decrementButton.addEventListener('click', () => {
  count--;
  countDisplay.textContent = count;
});
```

## 動作確認

作成した `index.html` ファイルをブラウザで開いて、数が増えたり減ったりすることを確認してください。


# ステップ3: 限度の設定

数が増えるボタンと減るボタンに限度を設定してみましょう。

[完成例](./examples/3/index.html)

JavaScriptファイルを以下のように書き換えて保存してください。

```javascript
const incrementButton = document.getElementById('incrementButton');
const decrementButton = document.getElementById('decrementButton');
const countDisplay = document.getElementById('count');

const MAX = 100;
let count = 0;

incrementButton.addEventListener('click', () => {
  if (count >= MAX) return;

  count++;
  countDisplay.textContent = count;
});

decrementButton.addEventListener('click', () => {
  if (count <= 0) return;

  count--;
  countDisplay.textContent = count;
});
```

## 動作確認

作成した `index.html` ファイルをブラウザで開いて、数が0未満や100超えないことを確認してください。

# まとめ

今回はJavaScriptを使って簡単なカウンターアプリを作成しました。JavaScriptを使うことで、Webページにインタラクションを追加することができます。

# 章のまとめ

この章ではHTMLとCSSとJavaScriptの基本的な書き方を学びました。

最近は React や Vue.js などのフレームワークがよく使われますがこれらも最終的にはHTML、CSS、JavaScriptで動いています。

基本的な技術を学ぶことでWebフロントエンドの理解が深まると思います。
