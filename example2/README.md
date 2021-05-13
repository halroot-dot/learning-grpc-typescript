# Overview

[TypeScript で gRPC の streaming RPC を使ったチャットのサンプル](https://daikiojm.hatenablog.com/entry/2018/12/24/002656)

Unary なリクエストではなく、Streem を試す.

# Usage

```
% npm install
```

まずは Server 側を実行しておく

```
% cd src
% npx ts-node server.ts
```

その後、Client 側(1)を実行
ユーザー名を入力し Enter を押すと入力待受状態になる

```
% cd src
% npx ts-node client.ts
User name: hoge
Server: new user joined ...
```

Client(2)も同様に実行

```
% cd src
% npx ts-node client.ts
User name: fuga
Server: new user joined ...
```

その後は双方向の通信が確立される

```
% cd src
% npx ts-node client.ts
User name: hoge
Server: new user joined ...
Server: new user joined ...
Hello fuga
fuga: Hello hoge
```
