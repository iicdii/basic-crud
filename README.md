# basic-crud

# 시작하기 

### 시스템 요구사항
- Node.js >= 16

### 환경변수 설정
1. `.env` 파일을 `.env.local`에 복사
```
cp ./.env ./.env.local
```

2. `.env.local` 파일을 열고 필요한 환경변수 채우기

### 실행하기
```bash
# pnpm 사용을 위한 코어팩 활성화
corepack enable

pnpm install
pnpm dev

# 테스트 실행
pnpm test
```