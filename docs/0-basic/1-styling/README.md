# 装飾

CSS を書くことで、HTMLの見た目を装飾することができます。

次のようにファイルを作成してください。

```
./works
└── styling
    ├── index.html
    └── style.css
```

# HTMLファイルの記述

`index.html` ファイルに以下の内容を書き込んで保存してください。

```html
<html>
  <head>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1 class="title">Hello World</h1>
  </body>
</html>
```

# CSSファイルの記述

`style.css` ファイルに以下の内容を書き込んで保存してください。

```css
.title {
  color: red;
}
```

# ブラウザで確認

作成した `index.html` ファイルをブラウザで開いてください。
"Hello World" の文字が赤く表示されていれば成功です。

# CSS の構成

CSSはセレクタとプロパティと値で構成されます。

```css
セレクタ {
  プロパティ: 値;
}
```

上記の例では、`.title` がセレクタ、`color` がプロパティ、`red` が値です。

細かい仕様は以下のドキュメントを参照してください。

https://developer.mozilla.org/ja/docs/Web/CSS/Reference

# CSS のレイアウトの練習

CSSの装飾は色の変更だけではなく、レイアウトの調整も可能です。

CSSのレイアウトはFlexBoxやGridレイアウトがよく使われます。それぞれなれるまでは難しい概念なので、以下のゲームで楽しみながら学習してみてください。

- https://flexboxfroggy.com/#ja
- https://cssgridgarden.com/#ja

# CSS を完全に理解している人へ

CSSを完全に理解しているひとは次のサイトで腕試しをしてみてください。

https://cssbattle.dev/

# まとめ

今回はCSSを使ってHTMLの見た目を装飾する方法を学びました。 CSSには多くのプロパティがあり、様々な装飾が可能です。

[次の章](../2-interaction)ではJavaScriptを使ってインタラクションを学びます。
