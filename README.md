# yarn
yarn 은 javascirpt 의 package manager 이다. npm 의 drop-in substitute 로 사용할 수 있는 점이 초기 도입에도 큰 장점이다.  
패키지 설치 속도가 더 빠르고, 패키지 설치과정에서 패키지가 code를 running 하지 않도록 하여 더 보안상 안전하다.  
또한, 같은 package.json 에 의존하는 두개의 서로 다른 환경이 서로 다른 버전의 패키지 의존성을 가지는 것을 방지하기 위해, 버전의 range 가 아닌, 정확한 버전을 명시한 yarn.lock 파일을 사용한다. 

## 주요
```bash
# npm install
yarn install 또는 yarn

# npm i <package> --save
yarn add <package>

# npm i <package> --save-dev
yarn add <package> --dev : --dev 옵션은 -D 와 같다.

# 패키지 삭제
yarn remove <package>

# dependencies와 devDependencies 모두 (package.json 에 명시된) version rule 에 따라 최신 버전으로 업그레이드.
# 만약 어떤 패키지가 semantic versioning([segVer](https://github.com/semver/semver/blob/master/semver.md))를 
# 따르지 않는다면, version rule이 무색해져 하위 호환성이 보장되지 않는 업그레이드일 수도 있다.  
yarn upgrade

# 특정 패키지를 특정 버전으로 업그레이드 
yarn upgrade <package>@<version>

# 목록들 중에서 원하는 패키지만 최신버전으로 업그레이드하는 interactive terminal ui 를 제공한다. 
yarn upgrade-interactive

# production 환경서 필요한 dependencies 만 설치
NODE_ENV=production yarn install 또는 yarn install --production
```

## 현재 사용중
```bash
  @reduxjs/toolkit: "^2.2.5",
  next: "14.2.4",
  primeicons: "^7.0.0",
  primereact: "^10.6.6",
  react: "^18",
  react-dom: "^18",
  react-redux: "^9.1.2",
  redux-persist: "^6.0.0"
```

## Tip
* version
  * npm, yarn 명령어에서 : <package>@<version> 은 특정 패키지의 특정 버전을 의미한다. ex : `yarn add weppack@4.0.0`
  * package.json 에서 : 
    * ~ (tilt) : 최하위버전의 업데이트만 허용  
    * ^ (carot) : 최상위 버전의 업데이트까지 자유롭게 허용.

## 참고
* 깃 커밋메시지 설정 
  * git config --global core.editor code --wait


