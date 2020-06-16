노마드 코더님의 인스타그램 클론코딩 강의에 기반하고 있습니다.
자바스크립트와 JSX에 익숙하거나 강의를 수강하신 분을 대상으로 작성하였습니다.  
**다른점**
```
1. Prisma2 사용
2. 백앤드를 AWS 람다로 구현
3. 인증 수단으로 AWS Cognito 사용
4. 멀티 사진 선택기, 인스타그램 댓글 UI 카피 등
```
참조 : [준동's 인스타그램 클론코딩 ](https://joondong.tistory.com/92)  
  
  
준비할 내용이 상당히 많습니다.  
서버리스(Serverless) 프레임워크로 작성되었으며, Amplify로 생성된 AWS Cognito User Pool을 사용합니다. 해당 Cognito User Pool에는 [Pre-SignUp 이벤트 핸들러](https://github.com/JoonDong2/instagureng-cognito-presignup)를 등록해야 합니다.  
Prisma를 사용하여 데이터베이스를 생성해야하고, Prisma 클라이언트도 생성해야 합니다.  
상세한 내용은 아래 링크를 걸어 두었습니다.  
# 수정할 내용
### 1. prisma/.env
DATABASE ENDPOINT 설정  
  
**예제**
```
DATABASE_URL="mysql://joondong3:1234@joondong.avnpe1bdkren.ap-northeast-2.rds.amazonaws.com/instagureng?connection_limit=5"
```
### 2. Lambda 함수 환경변수 설정
AWS Lambda 홈페이지에 접속해서 해당 인스턴스의 환경 변수를 직접 추가해 주어야 한다.  
  
**예제**
```
KEY = COGNITO_POOL_ID
VALUE = ap-northeast-2_DLRUJODP5
```
### 3. src/verifier.js
만약 REGION이 서울(ap-northeast-2)이 아닌 경우에만 수정 (28라인)
```
var cognitoIssuer = "https://cognito-idp.<YOUR REGION>.amazonaws.com/".concat(cognitoPoolId);
```
  
# 필요한 작업
### 데이터베이스 테이블 생성
참조1: [[인스타그램 클론코딩] Prisma2 데이터 모델링](https://joondong.tistory.com/146)  
참조2: [Prisma2 CLI를 사용하여 데이터베이스 테이블 생성](https://joondong.tistory.com/147)  
### Prisma 클라이언트 생성
참조: [Prisma2 클라이언트 생성](https://joondong.tistory.com/148)  
### 서버리스 AWS Lambda 배포
참조1: [서버리스 GraphQL 백앤드 구성](https://joondong.tistory.com/133)  
참조2: [서버리스 GraphQL 백앤드 구축](https://joondong.tistory.com/136)  
참조3: [서버리스 프레임워크 초기화 및 AWS에 연결](https://joondong.tistory.com/106)  
### AWS Cognito 생성
참조1: [[인스타그램 클론코딩] 회원가입 구조](https://joondong.tistory.com/95)  
참조2: [[인스타그램 클론코딩] API 인증 구조](https://joondong.tistory.com/96)  
참조3: [Amplify 초기화](https://joondong.tistory.com/99)  
참조4: [Cognito 소셜 로그인 추가 (실전) - 구글](https://joondong.tistory.com/101)  
참조5: [[Git Repository]생성된 Cognito Pool에 Pre-SignUp 이벤트 핸들러](https://github.com/JoonDong2/instagureng-cognito-presignup)  
참조5: [Cognito Pool에 Pre-SignUp 이벤트 핸들러 등록(https://joondong.tistory.com/102)  
  
# 참조
### [관련 포스트 목록](https://joondong.tistory.com/151)
### [인스타그램 클론코딩 웹(리액트)](https://github.com/JoonDong2/instagureng-frontend)
### [인스타그램 클론코딩 앱 (리액트 네이티브)](https://github.com/JoonDong2/instagureng-app)  
### [인스타그램 클론코딩 Cognito Pre-Signup 핸들러](https://github.com/JoonDong2/instagureng-cognito-presignup)  