This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


네. 지금 터미널에서 npm이 인식되지 않아 PATH만 잡아주면 됩니다. 아래 중 편한 방법을 사용하세요.

1) 현재 세션만 임시 적용
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
node -v
npm -v
cd E:\git.repo\web3_erc20
npm run dev
```

2) npm 전체 경로로 바로 실행
```powershell
cd E:\git.repo\web3_erc20
"C:\Program Files\nodejs\npm.cmd" run dev
```

3) 그래도 안 되면 터미널을 닫고 새로 열어 실행하세요(설치 후 PATH 갱신 필요).  
브라우저에서 `http://localhost:3000` 접속하면 됩니다.



PS E:\git.repo\web3_erc20>   npx hardhat run scripts/deploy.ts --network sepolia
[dotenv@17.2.3] injecting env (3) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
[dotenv@17.2.3] injecting env (0) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
file:///E:/git.repo/diverse_creta/scripts/deploy.ts:1
import { ethers } from "hardhat";
         ^^^^^^
SyntaxError: Named export 'ethers' not found. The requested module 'hardhat' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'hardhat';
const { ethers } = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:228:21)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ModuleJob.run (node:internal/modules/esm/module_job:337:5)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:665:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
PS E:\git.repo\web3_erc20> npm run hh:deploy:sepolia

> diverse_creta@0.1.0 hh:deploy:sepolia
> hardhat run scripts/deploy.ts --network sepolia

[dotenv@17.2.3] injecting env (3) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
[dotenv@17.2.3] injecting env (0) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
(node:25740) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///E:/git.repo/diverse_creta/scripts/deploy.ts is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to E:\git.repo\web3_erc20\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
TokenFactory: 0x619292fC0500fb30c53577a306074484EDb3B166
PS E:\git.repo\web3_erc20>


PS E:\git.repo\web3_erc20> npm run hh:deploy:sepolia

> diverse_creta@0.1.0 hh:deploy:sepolia
> hardhat run scripts/deploy.ts --network sepolia

[dotenv@17.2.3] injecting env (3) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
Compiled 13 Solidity files successfully (evm target: paris).
[dotenv@17.2.3] injecting env (0) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops
(node:29444) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///E:/git.repo/diverse_creta/scripts/deploy.ts is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to E:\git.repo\web3_erc20\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
TokenFactory: 0x2e156f1dBD8605A2506FD9493213733E93252d9D
PS E:\git.repo\web3_erc20>

PS E:\git.repo\web3_erc20> npm run hh:compile

> diverse_creta@0.1.0 hh:compile
> hardhat compile

[dotenv@17.2.3] injecting env (3) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
Nothing to compile
No need to generate any newer typings.
PS E:\git.repo\web3_erc20> npm run hh:deploy:sepolia

> diverse_creta@0.1.0 hh:deploy:sepolia
> hardhat run scripts/deploy.ts --network sepolia

[dotenv@17.2.3] injecting env (3) from .env -- tip: ⚙️  enable debug logging with { debug: true }
[dotenv@17.2.3] injecting env (0) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
(node:3252) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///E:/git.repo/diverse_creta/scripts/deploy.ts is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to E:\git.repo\web3_erc20\package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
TokenFactory: 0xf165A010265372872fB3fC61CF96b130111BC581
PS E:\git.repo\web3_erc20>