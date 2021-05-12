[TypeScript で gRPC の streaming RPC を使ったチャットのサンプル](https://daikiojm.hatenablog.com/entry/2018/12/24/002656)

Unary なリクエストではなく、Streem を試している.

# 動作確認

まずは Server 側を実行しておく

```
$ ts-node server.ts
```

その後、Client 側(1)を実行
ユーザー名を入力し Enter を押すと入力待受状態になる

```
$ ts-node client.ts
User name: daikiojm
Server: new user joined ...
```

Client(2)も同様に実行

```
$ ts-node client.ts
User name: test-user
Server: new user joined ...
```

その後は双方向の通信が確立される

```
$ ts-node client.ts
User name: test-user
Server: new user joined ...
daikiojm: はらへった
me too
```
