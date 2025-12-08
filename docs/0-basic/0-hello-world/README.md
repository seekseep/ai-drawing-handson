# Hello World

プログラミングの学習のおきまりとして、まずは「Hello World」と表示してみましょう。

# ファイルの用意

works の中に `hello-world` というフォルダを作成し、その中に `index.html` という名前のファイルを作成してください。

```
/works
└── hello-world
    └── index.html
```

# HTMLの記述

`index.html` ファイルに以下の内容を書き込んで保存してください。

```html
<html>
  <body>
    Hello World
  </body>
</html>
```

画面上に "Hello World" と表示されるだけのとてもシンプルなHTMLです。

作成したファイルをダブルクリックするか、ブラウザにドラッグアンドドロップして開いてみてください。
"Hello World" と表示されれば成功です。

# 見出しとして表示する

次に、"Hello World" を見出しとして表示してみましょう。`<h1>` タグを使います。

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

文字が大きく表示されます。このように、HTMLではタグを使って文字の意味や役割を指定します。

# 他のHTMLタグ

HTMLのタグはHTML5の時点で100種類以上あります。

代表的なタグについては以下のドキュメントを参照してください。
https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements

# `<br />` について

`<br />` というタグはレイアウトの調整に使われることがありますが、本来の意味は「改行」を表します。

> <br> は HTML の要素で、文中に改行（キャリッジリターン）を生成します。詩や住所など、行の分割が重要な場合に有用です。

https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/br

# まとめ

今回はHTMLの基本として、"Hello World" を表示する方法を学びました。
HTMLには多くのタグがあり、様々な表現が可能です。
[次の章](../1-styling)ではCSSを使って装飾を学びます。
