# 문제 해결 가이드

## Writing 포스트가 사이트에 반영되지 않는 경우

### 증상
- 포스트 파일이 `src/content/posts/`에 존재함
- GitHub Actions에서 포스트 생성이 성공했음
- 하지만 사이트에 포스트가 표시되지 않음

### 가능한 원인 및 해결 방법

#### 1. 배포 워크플로우가 실행되지 않음

**원인**: `daily-post.yml`이 포스트를 커밋하고 push했지만, `deploy.yml`이 자동으로 트리거되지 않았을 수 있습니다.

**해결 방법**:
1. GitHub 저장소의 Actions 탭에서 "Deploy to GitHub Pages" 워크플로우를 확인
2. 수동으로 "Run workflow" 버튼을 클릭하여 배포 트리거
3. 또는 다음 명령어로 로컬에서 빌드 확인:
   ```bash
   npm run build
   ```

#### 2. 빌드 실패

**원인**: 포스트 파일의 frontmatter나 내용에 문제가 있을 수 있습니다.

**해결 방법**:
1. 포스트 파일의 frontmatter 확인:
   - `title`: 문자열
   - `date`: "YYYY-MM-DD" 형식
   - `lang`: "ko" 또는 "en"
   - `excerpt`: 선택사항 (문자열)

2. 빌드 로그 확인:
   ```bash
   npm run build
   ```

#### 3. 브라우저 캐시 문제

**원인**: 브라우저가 이전 버전의 사이트를 캐시하고 있을 수 있습니다.

**해결 방법**:
- 브라우저 캐시 삭제 (Ctrl+Shift+Delete 또는 Cmd+Shift+Delete)
- 시크릿 모드에서 사이트 접속
- 하드 리프레시 (Ctrl+F5 또는 Cmd+Shift+R)

#### 4. 포스트가 필터링됨

**원인**: Writing 페이지에서 언어별로 필터링되는데, 포스트의 `lang` 값이 잘못되었을 수 있습니다.

**해결 방법**:
1. 포스트 파일의 `lang` 필드 확인
2. Writing 페이지에서 올바른 언어로 접속 (`?lang=ko` 또는 `?lang=en`)

### 확인 사항 체크리스트

- [ ] 포스트 파일이 `src/content/posts/` 디렉토리에 존재하는가?
- [ ] 포스트 파일의 frontmatter가 올바른가?
- [ ] GitHub Actions에서 "Deploy to GitHub Pages" 워크플로우가 실행되었는가?
- [ ] 배포가 성공적으로 완료되었는가?
- [ ] 브라우저 캐시를 삭제했는가?
- [ ] 올바른 언어 파라미터로 Writing 페이지에 접속했는가?

### 로그 확인 방법

1. **GitHub Actions 로그**:
   - 저장소 > Actions 탭
   - "Generate Daily Post" 워크플로우 확인
   - "Deploy to GitHub Pages" 워크플로우 확인

2. **로컬 빌드 테스트**:
   ```bash
   npm run build
   ```
   빌드 출력에서 포스트가 포함되는지 확인

3. **포스트 파일 확인**:
   ```bash
   ls -la src/content/posts/ | grep "2025-11-27"
   ```
