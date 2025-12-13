# 画像をリクエストに含む

OpenAI APIのリクエストに画像を含める方法を学びます。

# ファイルの用意

次のように `index.html`、`style.css`、`main.js`、そして画像ファイル（`dog.png`、`bird.png`、`fish.png`）を作成してください。

```
./works
└── send-image
    ├── index.html
    ├── style.css
    ├── main.js
    ├── dog.png
    ├── bird.png
    └── fish.png
```

画像ファイルは、[docs/3-open-ai/assets/](../assets/) からコピーするか、自分で用意した画像を使用してください。

## 何を作るか

画像をクリックすると、その画像をOpenAI APIに送信し、AIからの画像説明を表示するアプリケーションを作成します。

## 実装の流れ

このセクションでは、2段階に分けて実装します:

1. **[第1段階: UIの実装](#第1段階-uiの実装)** - APIキーなしでUIの動作確認
2. **[第2段階: OpenAI API統合](#第2段階-openai-api統合)** - 画像を含むAPIリクエストを送信

---

## 第1段階: UIの実装

まず、OpenAI APIを使わずに画像クリックのUIを作ります。

**実装例**: [./examples/1/](./examples/1/)

### 1. HTMLファイルを作成する ([index.html](./examples/1/index.html))

```html
<html>
  <head>
    <title>画像をリクエストに含む</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <h1>画像をリクエストに含む</h1>
    <div>
      <img id="dogImage" src="./dog.png" width="100" height="100" />
      <img id="birdImage" src="./bird.png" width="100" height="100" />
      <img id="fishImage" src="./fish.png" width="100" height="100" />
    </div>
    <div id="result">
      <h2>AIのコメント</h2>
      <p id="comment">画像をクリックしてください</p>
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

#### HTMLの構成要素

- `img#dogImage`, `img#birdImage`, `img#fishImage`: クリック可能な画像
- `p#comment`: AIのコメントを表示するエリア

### 2. JavaScriptファイルを作成する ([main.js](./examples/1/main.js))

```javascript
const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');
const resultElement = document.getElementById('comment');

function showResult(text) {
  resultElement.textContent = text;
}

dogImage.addEventListener('click', () => {
  showResult('仮のコメント: これは犬の画像です');
});

birdImage.addEventListener('click', () => {
  showResult('仮のコメント: これは鳥の画像です');
});

fishImage.addEventListener('click', () => {
  showResult('仮のコメント: これは魚の画像です');
});
```

#### コードの説明

1. **DOM要素の取得**: 3つの画像と結果表示エリアを取得
2. **showResult関数**: 結果エリアにテキストを表示する関数
3. **イベントリスナー**: 各画像をクリックすると仮のコメントを表示（まだAPIは呼び出していない）

### 動作確認

ブラウザでHTMLファイルを開き、以下を確認します:

1. 3つの画像が表示される
2. 各画像をクリックすると、対応する仮のコメントが表示される

---

## 第2段階: OpenAI API統合

第1段階で作成したUIに、画像を含むOpenAI APIリクエストを統合します。

**実装例**: [./examples/2/](./examples/2/)

### 1. HTMLファイル ([index.html](./examples/2/index.html))

HTMLは第1段階と同じです（変更なし）。

### 2. JavaScriptファイルを更新する ([main.js](./examples/2/main.js))

```javascript
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

const dogImage = document.getElementById('dogImage');
const birdImage = document.getElementById('birdImage');
const fishImage = document.getElementById('fishImage');
const resultElement = document.getElementById('comment');

function showResult(text) {
  resultElement.textContent = text;
}

async function convertImageToBase64(imageSrc) {
  const response = await fetch(imageSrc);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function sendImageToAPI(imageElement) {
  const base64Image = await convertImageToBase64(imageElement.src);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'この画像について説明してください'
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;
  showResult(aiMessage);
}

dogImage.addEventListener('click', () => {
  sendImageToAPI(dogImage);
});

birdImage.addEventListener('click', () => {
  sendImageToAPI(birdImage);
});

fishImage.addEventListener('click', () => {
  sendImageToAPI(fishImage);
});
```

#### 第1段階からの変更点

1. **APIキーの追加**: `OPENAI_API_KEY`定数を追加
2. **convertImageToBase64関数の追加**: 画像をBase64 Data URLに変換する関数
3. **sendImageToAPI関数の追加**: 画像をAPIに送信する関数
4. **contentの配列化**: テキストと画像の両方を含むリクエスト
   - `type: 'text'`: テキストプロンプト
   - `type: 'image_url'`: 画像のBase64 Data URL
5. **イベントリスナーの更新**: 仮のコメントの代わりに、APIからの実際の返答を表示

#### Base64変換の仕組み

`convertImageToBase64`関数は以下の手順で画像をBase64 Data URLに変換します:

1. **画像の取得**: `fetch(imageSrc)`で画像データを取得
2. **Blob変換**: `response.blob()`で画像をBlobオブジェクトに変換
3. **FileReaderで読み込み**: `FileReader.readAsDataURL(blob)`でBase64エンコードされたData URLを生成

この方法は、Canvasを使わずにシンプルに画像をBase64に変換でき、`data:image/png;base64,iVBORw0KG...`という形式のデータが生成されます。

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant Img as img要素
    participant Func as convertImageToBase64関数
    participant Fetch as fetch API
    participant Blob as Blob
    participant Reader as FileReader

    User->>Img: 画像をクリック
    Img->>Func: img.src (画像URL) を渡す
    Func->>Fetch: fetch(imageSrc)
    Fetch-->>Func: Response オブジェクト
    Func->>Blob: response.blob()
    Blob-->>Func: Blob オブジェクト<br/>(画像のバイナリデータ)
    Func->>Reader: new FileReader()
    Func->>Reader: readAsDataURL(blob)
    Reader-->>Func: Data URL<br/>(data:image/png;base64,iVBORw0KG...)
    Func-->>User: Base64エンコードされた画像データ
```

**各ステップの説明:**

- **fetch(imageSrc)**: 画像のURLから画像データを取得
- **response.blob()**: レスポンスをBlobオブジェクト（バイナリデータ）に変換
- **FileReader**: Blobをテキスト形式（Base64）に変換するためのAPI
- **readAsDataURL(blob)**: BlobをData URL形式（`data:image/png;base64,...`）に変換

#### 画像を含むリクエストのポイント

OpenAI APIで画像を含むリクエストを送る場合、`content`フィールドを**配列**にし、テキストと画像の両方を含めます:

```javascript
content: [
  {
    type: 'text',
    text: 'この画像について説明してください'
  },
  {
    type: 'image_url',
    image_url: {
      url: base64Image  // Base64エンコードされたData URL
    }
  }
]
```

画像は以下の2つの形式で指定できます:
- **公開URL**: `https://example.com/image.png`
- **Base64 Data URL**: `data:image/png;base64,iVBORw0KG...`（今回はこちらを使用）

### 動作確認

1. `OPENAI_API_KEY`を実際のAPIキーに置き換える
2. ブラウザでHTMLファイルを開く
3. 画像をクリック
4. AIからの実際の画像説明が表示されることを確認

## 次のステップ

[次の章](../3-specify-json-structure/README.md)では、APIレスポンスのJSON構造を指定する方法を学びます。
