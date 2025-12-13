# Canvasから画像を取り出して送信する

Canvasに描画した内容を画像として取り出し、OpenAI APIに送信する方法を学びます。

# ファイルの用意

次のように `index.html`、`style.css`、`main.js`、そして画像ファイル（`dog.png`、`bird.png`、`fish.png`）を作成してください。

```
./works
└── get-image-from-canvas
    ├── index.html
    ├── style.css
    ├── main.js
    ├── dog.png
    ├── bird.png
    └── fish.png
```

ファイルの準備方法は以下のいずれかを選んでください:

1. **[docs/2-drawing/3-put-image/examples/1/](../../2-drawing/3-put-image/examples/1/) からコピーする**
   - すべてのファイル（`index.html`、`style.css`、`main.js`）をコピーして、このセクションで必要な機能を追加していきます
   - 画像ファイルは [docs/2-drawing/assets/](../../2-drawing/assets/) からコピーしてください

2. **前の節で作成した自分のファイルを使用する**
   - [docs/2-drawing/3-put-image](../../2-drawing/3-put-image/) の手順で作成した自分のファイルを `./works/get-image-from-canvas/` にコピーして使用できます

## 実装例

実装例: [./examples/1/](./examples/1/)

## 何を作るか

前のステップまでの知識を組み合わせて、Canvasに描いた絵をOpenAI APIに送信し、評価を受け取る完全な機能を実装します。

## 実装手順

### 1. HTMLファイルを修正する ([index.html](./examples/1/index.html))

用意したHTMLファイルに、評価ボタンと結果表示エリアを追加します。

```html
<html>
  <head>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div>
      <button id="clearButton">消す</button>
      <input type="color" id="colorInput" value="#000000" />
      <button id="evaluateButton">評価してもらう</button>
    </div>
    <div>
      <img id="dogImage" src="./dog.png" width="100" height="100" />
      <img id="birdImage" src="./bird.png" width="100" height="100" />
      <img id="fishImage" src="./fish.png" width="100" height="100" />
    </div>
    <canvas id="canvas" width="400" height="300"></canvas>
    <div id="result">
      <h2>評価結果</h2>
      <p>スコア: <span id="score">-</span></p>
      <p>コメント: <span id="comment">-</span></p>
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

**変更点:**
- 「評価してもらう」ボタンを追加
- 評価結果を表示するエリア（`#result`）を追加

### 2. JavaScriptファイルを修正する ([main.js](./examples/1/main.js))

用意したJavaScriptファイルに、評価機能を追加します。

```javascript
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearButton');
const colorInput = document.getElementById('colorInput');
const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');
const evaluateButton = document.getElementById('evaluateButton');
const scoreElement = document.getElementById('score');
const commentElement = document.getElementById('comment');

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

evaluateButton.addEventListener('click', async () => {
  console.log('評価ボタンがクリックされました');

  const apiKey = 'YOUR_API_KEY_HERE';

  const imageDataUrl = canvas.toDataURL('image/png');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'この絵を評価してください'
            },
            {
              type: 'image_url',
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'image_evaluation',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              score: {
                type: 'number',
                description: '絵の評価スコア (0-100)'
              },
              comment: {
                type: 'string',
                description: '評価コメント'
              }
            },
            required: ['score', 'comment'],
            additionalProperties: false
          }
        }
      }
    })
  });

  const data = await response.json();
  console.log('レスポンス:', data);

  const result = JSON.parse(data.choices[0].message.content);
  console.log('評価スコア:', result.score);
  console.log('コメント:', result.comment);

  scoreElement.textContent = result.score;
  commentElement.textContent = result.comment;
});
```

**追加した機能:**
- `evaluateButton`: 評価ボタンの要素を取得
- `scoreElement` / `commentElement`: 評価結果を表示する要素を取得
- **Canvasから画像を取得**: `canvas.toDataURL('image/png')` でBase64形式の画像データを取得
- **JSON構造を指定**: `response_format` で `score` と `comment` を持つJSONを要求
- **結果を表示**: 受け取った `score` と `comment` を画面に表示

### コードの説明

#### Canvasから画像を取り出す

```javascript
const imageDataUrl = canvas.toDataURL('image/png');
```

`canvas.toDataURL('image/png')` メソッドを使うと、Canvasの内容をBase64エンコードされたPNG画像として取得できます。これをそのままOpenAI APIの `image_url.url` に渡すことができます。

#### JSON構造の指定

```javascript
response_format: {
  type: 'json_schema',
  json_schema: {
    name: 'image_evaluation',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        score: {
          type: 'number',
          description: '絵の評価スコア (0-100)'
        },
        comment: {
          type: 'string',
          description: '評価コメント'
        }
      },
      required: ['score', 'comment'],
      additionalProperties: false
    }
  }
}
```

OpenAI APIの Structured Outputs 機能を使って、レスポンスのJSON構造を指定します。これにより、必ず `score`（数値）と `comment`（文字列）を含むJSONが返されます。

#### 評価結果の表示

```javascript
scoreElement.textContent = result.score;
commentElement.textContent = result.comment;
```

APIから返された評価結果を画面に表示します。

## 動作確認

1. ブラウザでHTMLファイルを開く
2. Canvasに絵を描くか、サンプル画像をクリックして配置
3. 「評価してもらう」ボタンをクリック
4. 評価結果（スコアとコメント）が画面に表示されることを確認

## まとめ

このセクションで学んだ内容を統合することで、ブラウザベースのお絵描き評価アプリケーションを作成できます。

- `canvas.toDataURL()` でCanvasの内容をBase64画像として取得
- OpenAI APIにBase64画像を送信
- Structured Outputsで構造化されたJSON（score/comment）を取得
- 画面に評価結果を表示
