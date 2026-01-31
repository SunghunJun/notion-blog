# Notion Blog with Next.js

Notion을 CMS로 사용하는 Next.js 14 블로그

## ✨ 주요 기능

- 🎨 Notion 스타일 디자인 (시스템 폰트 사용)
- 📝 Notion 페이지를 블로그 포스트로 자동 변환
- 🔄 ISR(Incremental Static Regeneration) - 60초마다 자동 갱신
- 💅 마크다운 지원 (제목, 리스트, 코드, 인용문 등)
- 🏷️ 태그 시스템
- 📱 반응형 디자인

## 🚀 시작하기

### 1. Notion Integration 생성

1. https://www.notion.so/my-integrations 접속
2. "New integration" 클릭
3. Integration 이름 입력
4. API Key 복사

### 2. Notion Database 생성

1. Notion에서 새 페이지 생성
2. `/database` 입력하여 Database 생성
3. 다음 속성 추가:

| 속성명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| Title | Title | ✅ | 포스트 제목 |
| Slug | Text | ✅ | URL 경로 (예: first-post) |
| Date | Date | ✅ | 게시 날짜 |
| Published | Checkbox | ✅ | 게시 여부 |
| Description | Text | | 포스트 요약 (1-2문장) |
| Tags | Multi-select | | 태그 |

4. Database 우측 상단 `...` → "Add connections" → Integration 선택
5. Database URL에서 ID 복사:
   ```
   https://notion.so/[Database-ID]?v=...
   ```

### 3. 환경변수 설정

`.env.local` 파일 생성:

```env
NOTION_API_KEY=your_integration_key_here
NOTION_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Blog Name
```

### 4. 의존성 설치 및 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인

### 5. 첫 포스트 작성

Notion Database에 새 페이지 생성:

**속성 입력**:
- Title: `첫 번째 포스트`
- Slug: `first-post`
- Date: 오늘 날짜
- Published: ✅ 체크
- Description: `Notion으로 만드는 첫 포스트입니다.`
- Tags: 원하는 태그 추가

**본문 작성** (속성 아래 빈 공간):
- `/h2` - 섹션 제목
- `/bullet` - 리스트
- `/code` - 코드 블록
- `/quote` - 인용문
- 일반 텍스트 입력

저장 후 1분 내로 블로그에 반영됩니다!

## 📦 배포 (Vercel)

### 1. GitHub에 Push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/notion-blog.git
git push -u origin main
```

### 2. Vercel 연동

1. [vercel.com](https://vercel.com) 접속
2. "New Project" → GitHub 연결
3. Repository 선택
4. Environment Variables 추가:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
5. Deploy!

## 🛠 커스터마이징

### 스타일 수정

`src/app/globals.css`에서 CSS 변수 수정:

```css
:root {
  --color-accent: #c45a3b;  /* 포인트 컬러 */
  --font-display: 'Cormorant Garamond', serif;  /* 제목 폰트 */
  --font-body: 'Sora', sans-serif;  /* 본문 폰트 */
}
```

### 메타데이터 수정

`src/app/layout.tsx`에서 사이트 정보 변경

### 네비게이션 수정

`src/app/layout.tsx`의 `site-nav` 부분 수정

## 📁 프로젝트 구조

```
notion-blog/
├── src/
│   ├── app/
│   │   ├── globals.css      # 전역 스타일
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   ├── page.tsx         # 홈페이지
│   │   ├── not-found.tsx    # 404 페이지
│   │   └── posts/
│   │       ├── page.tsx     # 포스트 목록
│   │       └── [slug]/
│   │           └── page.tsx # 개별 포스트
│   └── lib/
│       └── notion.ts        # Notion API 함수
├── .env.local               # 환경변수
├── next.config.js           # Next.js 설정
└── package.json
```

## 🔄 자동 업데이트

- ISR(Incremental Static Regeneration) 사용
- 60초마다 콘텐츠 자동 갱신
- Notion에서 글 수정하면 1분 내 반영

## 📝 License

MIT
