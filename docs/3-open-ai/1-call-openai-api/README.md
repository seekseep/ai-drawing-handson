# OpenAI API を呼び出す

ブラウザから直接OpenAI APIを呼び出す基本的な実装を学びます。

**警告**: 本番環境では、APIキーをブラウザに直接埋め込むことは絶対に避けてください。この実装は学習目的のみです。

## 何を作るか

OpenAI APIのChat Completions エンドポイントを使って、ユーザーが入力したテキストメッセージを送信し、AIからの応答を画面に表示するシンプルなチャットインターフェースを作成します。

## 実装の流れ

このセクションでは、2段階に分けて実装します:

1. **[第1段階: UIの実装](#第1段階-uiの実装)** - APIキーなしでUIの動作確認
2. **[第2段階: OpenAI API統合](#第2段階-openai-api統合)** - 実際のAPIを呼び出す

---

## 第1段階: UIの実装

まず、OpenAI APIを使わずにUIの基本構造を作ります。

**実装例**: [./examples/1/](./examples/1/)

### 1. HTMLファイルを作成する ([index.html](./examples/1/index.html))

```html
<html>
  <head>
    <title>OpenAI API を呼び出す</title>
  </head>
  <body>
    <h1>OpenAI API を呼び出す</h1>
    <textarea id="messageInput"></textarea>
    <button id="sendButton">送信</button>
    <div id="result"></div>
    <script src="./main.js"></script>
  </body>
</html>
```

#### HTMLの構成要素

- `textarea#messageInput`: ユーザーがメッセージを入力するエリア
- `button#sendButton`: メッセージを送信するボタン
- `div#result`: ユーザーとAIのメッセージを表示するエリア

### 2. JavaScriptファイルを作成する ([main.js](./examples/1/main.js))

```javascript
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const resultText = document.getElementById('result');

function appendResult(text) {
  const p = document.createElement('p');
  p.textContent = text;
  resultText.appendChild(p);
}

sendButton.addEventListener('click', async () => {
  const userMessage = messageInput.value;
  appendResult('あなた:' + userMessage);

  const aiMessage = "仮のメッセージ"
  appendResult('AI:' + aiMessage);
});
```

#### コードの説明

1. **DOM要素の取得**: テキストエリア、ボタン、結果表示エリアを取得
2. **appendResult関数**: 結果エリアに新しいメッセージを追加する関数
3. **イベントリスナー**:
   - ユーザーの入力を取得して表示
   - 仮のAIメッセージを表示（まだAPIは呼び出していない）

### 動作確認

ブラウザでHTMLファイルを開き、以下を確認します:

1. テキストエリアに文字を入力できる
2. 送信ボタンをクリックすると、入力したメッセージが表示される
3. 仮のAIメッセージ「仮のメッセージ」が表示される

---

## 第2段階: OpenAI API統合

第1段階で作成したUIに、実際のOpenAI APIを統合します。

**実装例**: [./examples/2/](./examples/2/)

### 1. HTMLファイル ([index.html](./examples/2/index.html))

HTMLは第1段階と同じです（変更なし）。

### 2. JavaScriptファイルを更新する ([main.js](./examples/2/main.js))

```javascript
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE'; // 当日APIキーに置き換える

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const resultText = document.getElementById('result');

function appendResult(text) {
  const p = document.createElement('p');
  p.textContent = text;
  resultText.appendChild(p);
}

sendButton.addEventListener('click', async () => {
  const userMessage = messageInput.value;
  appendResult('あなた:' + userMessage);

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
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;
  appendResult('AI:' + aiMessage);
});
```

#### 第1段階からの変更点

1. **APIキーの追加**: `OPENAI_API_KEY`定数を追加
2. **fetch APIでリクエスト送信**:
   - エンドポイント: `https://api.openai.com/v1/chat/completions`
   - メソッド: POST
   - AuthorizationヘッダーにAPIキーを設定
3. **リクエストボディ**:
   - `model`: 使用するモデル（`gpt-4o-mini`）
   - `messages`: ユーザーが入力したメッセージを送信
4. **レスポンスの処理**: 仮のメッセージの代わりに、APIからの実際の返答を表示

### 動作確認

1. `OPENAI_API_KEY`を実際のAPIキーに置き換える
2. ブラウザでHTMLファイルを開く
3. テキストエリアにメッセージを入力して送信
4. AIからの実際の返答が表示されることを確認

## 次のステップ

[次の章](../2-send-image/README.md)では、APIリクエストに画像を含める方法を学びます。
