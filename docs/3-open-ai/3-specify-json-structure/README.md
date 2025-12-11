# JSONの構造を指定する

OpenAI APIのレスポンスで返されるJSONの構造を指定する方法を学びます。

## 何を作るか

Structured Outputs機能を使って、AIが返すレスポンスのJSON構造を指定します。これにより、常に一貫したデータ構造で結果を受け取ることができます。

この例では、ユーザーが入力した説明に基づいて、架空の人物のプロフィール（名前、年齢、出身地、好きなもの）を生成します。

## 実装の流れ

このセクションでは、3段階に分けて実装します:

1. **[第1段階: UIの実装](#第1段階-uiの実装)** - APIキーなしでUIの動作確認
2. **[第2段階: 普通のAPI呼び出し](#第2段階-普通のapi呼び出し)** - JSON構造を指定しないAPI呼び出し
3. **[第3段階: JSON構造指定](#第3段階-json構造指定)** - Structured Outputsでデータ構造を保証

---

## 第1段階: UIの実装

まず、OpenAI APIを使わずにUIの基本構造を作ります。

**実装例**: [./examples/1/](./examples/1/)

### 1. HTMLファイルを作成する ([index.html](./examples/1/index.html))

```html
<html>
  <head>
    <title>JSONの構造を指定する</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <h1>JSONの構造を指定する</h1>
    <div>
      <input type="text" id="descriptionInput" placeholder="どんな人がいいか入力してください" />
      <button id="generateButton">生成</button>
    </div>
    <div id="result">
      <h2>生成されたプロフィール</h2>
      <p>名前: <span id="name">-</span></p>
      <p>年齢: <span id="age">-</span></p>
      <p>出身地: <span id="hometown">-</span></p>
      <p>好きなもの: <span id="favorites">-</span></p>
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

#### HTMLの構成要素

- `input#descriptionInput`: プロフィールの説明を入力
- `button#generateButton`: プロフィール生成ボタン
- `span#name`, `span#age`, `span#hometown`, `span#favorites`: 生成されたプロフィール情報を表示

### 2. JavaScriptファイルを作成する ([main.js](./examples/1/main.js))

```javascript
const descriptionInput = document.getElementById('descriptionInput');
const generateButton = document.getElementById('generateButton');
const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const hometownElement = document.getElementById('hometown');
const favoritesElement = document.getElementById('favorites');

function showResult(profile) {
  nameElement.textContent = profile.name;
  ageElement.textContent = profile.age;
  hometownElement.textContent = profile.hometown;
  favoritesElement.textContent = profile.favorites.join(', ');
}

generateButton.addEventListener('click', () => {
  // 仮のプロフィールデータ
  const fakeProfile = {
    name: '仮太郎',
    age: 25,
    hometown: '東京都',
    favorites: ['読書', '映画', '旅行']
  };

  showResult(fakeProfile);
});
```

#### コードの説明

1. **DOM要素の取得**: 入力欄、ボタン、結果表示エリアを取得
2. **showResult関数**: プロフィールデータを画面に表示する関数
3. **イベントリスナー**: 仮のプロフィールデータを表示（まだAPIは呼び出していない）

### 動作確認

ブラウザでHTMLファイルを開き、以下を確認します:

1. 入力欄とボタンが表示される
2. 「生成」ボタンをクリックすると、仮のプロフィールが表示される

---

## 第2段階: 普通のAPI呼び出し

第1段階で作成したUIに、OpenAI APIを統合します。ただし、まだJSON構造は指定しません。

**実装例**: [./examples/2/](./examples/2/)

### 1. HTMLファイル ([index.html](./examples/2/index.html))

HTMLは第1段階と同じです（変更なし）。

### 2. JavaScriptファイルを更新する ([main.js](./examples/2/main.js))

```javascript
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

const descriptionInput = document.getElementById('descriptionInput');
const generateButton = document.getElementById('generateButton');
const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const hometownElement = document.getElementById('hometown');
const favoritesElement = document.getElementById('favorites');

function showResult(profile) {
  nameElement.textContent = profile.name;
  ageElement.textContent = profile.age;
  hometownElement.textContent = profile.hometown;
  favoritesElement.textContent = profile.favorites.join(', ');
}

generateButton.addEventListener('click', async () => {
  const description = descriptionInput.value || 'ランダムな人';

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
          content: `${description}のプロフィール（名前、年齢、出身地、好きなもの）をJSON形式で生成してください`
        }
      ]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;

  // JSONっぽい文字列をパースする（エラーが起きる可能性あり）
  const result = JSON.parse(aiMessage);

  showResult(result);
});
```

#### 第1段階からの変更点

1. **APIキーの追加**: `OPENAI_API_KEY`定数を追加
2. **fetch APIでリクエスト送信**: OpenAI APIを呼び出す
3. **プロンプトの工夫**: 「JSON形式で生成してください」と指示
4. **レスポンスのパース**: `JSON.parse()`で文字列をJSONに変換

#### この段階の問題点

**JSON構造が保証されない**問題があります:

- AIが必ずしもパース可能なJSONを返すとは限らない
- フィールド名が異なる場合がある（`name` vs `名前`）
- 必須フィールドが欠けている場合がある
- 余計な説明文が含まれている場合がある

これらの問題を解決するのが、次の第3段階です。

### 動作確認

1. `OPENAI_API_KEY`を実際のAPIキーに置き換える
2. ブラウザでHTMLファイルを開く
3. 入力欄に説明を入力（例: "明るくて元気な人"）
4. 「生成」ボタンをクリック
5. プロフィールが表示されることを確認（エラーが出る可能性もあり）

---

## 第3段階: JSON構造指定

第2段階のコードに、Structured Outputs機能を追加して、確実に決まった構造のJSONを取得します。

**実装例**: [./examples/3/](./examples/3/)

### 1. HTMLファイル ([index.html](./examples/3/index.html))

HTMLは第1段階と同じです（変更なし）。

### 2. JavaScriptファイルを更新する ([main.js](./examples/3/main.js))

```javascript
const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

const descriptionInput = document.getElementById('descriptionInput');
const generateButton = document.getElementById('generateButton');
const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const hometownElement = document.getElementById('hometown');
const favoritesElement = document.getElementById('favorites');

function showResult(profile) {
  nameElement.textContent = profile.name;
  ageElement.textContent = profile.age;
  hometownElement.textContent = profile.hometown;
  favoritesElement.textContent = profile.favorites.join(', ');
}

generateButton.addEventListener('click', async () => {
  const description = descriptionInput.value || 'ランダムな人';

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
          content: `${description}のプロフィールを生成してください`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'person_profile',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: '名前'
              },
              age: {
                type: 'number',
                description: '年齢'
              },
              hometown: {
                type: 'string',
                description: '出身地'
              },
              favorites: {
                type: 'array',
                description: '好きなもののリスト',
                items: {
                  type: 'string'
                }
              }
            },
            required: ['name', 'age', 'hometown', 'favorites'],
            additionalProperties: false
          }
        }
      }
    })
  });

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  showResult(result);
});
```

#### 第2段階からの変更点

1. **response_formatの追加**: JSON構造を指定する新しいパラメータ
2. **プロンプトの簡略化**: 「JSON形式で」という指示が不要になった

#### JSON構造の指定 (Structured Outputs)

`response_format`パラメータで、レスポンスのJSON構造を厳密に指定します:

```javascript
response_format: {
  type: 'json_schema',
  json_schema: {
    name: 'person_profile',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: '名前' },
        age: { type: 'number', description: '年齢' },
        hometown: { type: 'string', description: '出身地' },
        favorites: {
          type: 'array',
          description: '好きなもののリスト',
          items: { type: 'string' }
        }
      },
      required: ['name', 'age', 'hometown', 'favorites'],
      additionalProperties: false
    }
  }
}
```

**主要なフィールド**:
- `type: 'json_schema'`: Structured Outputsを使用
- `name`: スキーマの名前（任意）
- `strict: true`: 厳密なスキーマ検証を有効化
- `schema`: JSONスキーマの定義
  - `type: 'object'`: オブジェクト型
  - `properties`: 各フィールドの型と説明
  - `required`: 必須フィールドのリスト
  - `additionalProperties: false`: 定義外のフィールドを禁止

#### レスポンスの処理

AIからの返答は**必ず**指定した構造になります:

```javascript
const result = JSON.parse(data.choices[0].message.content);
```

返答例:
```json
{
  "name": "田中太郎",
  "age": 28,
  "hometown": "東京都",
  "favorites": ["読書", "映画鑑賞", "旅行"]
}
```

### 動作確認

1. `OPENAI_API_KEY`を実際のAPIキーに置き換える
2. ブラウザでHTMLファイルを開く
3. 入力欄に説明を入力（例: "明るくて元気な人"）
4. 「生成」ボタンをクリック
5. 構造化されたプロフィールが確実に表示されることを確認

## Structured Outputsのメリット

1. **一貫性**: 常に同じ構造のデータが返される
2. **型安全性**: 数値、文字列、配列などの型が保証される
3. **エラー削減**: パース失敗やフィールド欠落がない
4. **開発効率**: レスポンス処理のコードがシンプルになる
5. **プロンプト簡略化**: 「JSON形式で」などの指示が不要

## 次のステップ

[次の章](../4-get-image-from-canvas/README.md)では、これまでの知識を統合して、Canvasから画像を取り出してAPIに送信する完全な機能を実装します。
