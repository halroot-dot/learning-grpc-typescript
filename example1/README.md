# Overview

[Node.js と TypeScript で gRPC を動かす](https://qiita.com/daisaru11/items/67366061f7244378639c)を参考にした。

また、以下の記事も参考にした。

[OK Google, Protocol Buffers から生成したコードを使って Node.js で gRPC 通信して](https://engineering.mercari.com/blog/entry/20201216-53796c2494/)

# Usage

```
% npm install
```

Launch server

```
% npx ts-node src/server.ts
```

Launch client

```
% npx ts-node src/client.ts
{ book: { title: 'Book1', author: 'Author1' } }
{ book: { title: 'Book2', author: 'Author2' } }
```
