# Video Note Full Prototype

這份 README 適合拿來當「Video Note 本體」的 GitHub repo 說明，主要對應 [video-scholar](video-scholar) 與 [videonote_backend](videonote_backend) 這兩個子專案。

這個版本比較偏向展示完整原型流程：前端互動、後端 API、AI 任務處理與內容輸出流程。

## 這個專案的重點

- 展示影片內容整理與摘要輸出的原型流程
- 結合前端互動、API 與 AI 背景任務
- 呈現從輸入影片到輸出內容的完整雛形思路
- 讓作品更像一個可說明、可展示的產品原型，而不是單純的功能拼湊

## 目前包含的部分

- 前端原型展示頁
- 影片內容相關互動頁面
- 後端 API 與背景任務流程
- AI 摘要與內容生成雛形

## 專案結構

```text
Video Note Full Prototype/
├── video-scholar/          # 前端原型展示
└── videonote_backend/      # 後端與 AI 流程
```

## 技術堆疊

- React
- TypeScript
- Tailwind CSS
- FastAPI
- Python
- Celery
- Redis
- Groq / Whisper

## 啟動方式

### 1. 前端原型

```bash
cd video-scholar
pnpm install
pnpm dev
```

### 2. 後端流程

```bash
cd videonote_backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 作品集整理建議

為了讓作品集更清楚呈現，我建議把 Landing Page 與 Video Note 本體分成兩個 repo 上傳：

- Landing Page repo：使用 [video-note-ui-design](video-note-ui-design)
- Full Prototype repo：使用 [video-scholar](video-scholar) 與 [videonote_backend](videonote_backend)

這樣的安排比較適合展示產品概念與原型實作兩個不同層次的內容，也更容易讓 HR 或面試官快速理解我的作品定位。