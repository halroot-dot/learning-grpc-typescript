import * as grpc from "@grpc/grpc-js";
import { ServerWritableStream } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { Message } from "./types";

// .protoファイルを動的に読み込み
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
).example;

const users: ServerWritableStream<Message, any>[] = [];

function join(call: ServerWritableStream<Message, any>): void {
  users.push(call);
  notifyChat({ user: "Server", text: `new user joined ...` });
}

function send(call: ServerWritableStream<Message, any>): void {
  console.log(`send message from ${call.request.user}: ${call.request.text}`);
  notifyChat(call.request);
}

function notifyChat(message: Message): void {
  // すべてのユーザーにメッセージを送信
  users.forEach((user) => {
    user.write(message);
  });
}

function main() {
  const server = new grpc.Server();
  const serverAddress = "0.0.0.0:5001";

  // .protoファイルで定義したserviceと上記実装をマッピング
  server.addService(proto["Chat"].service, {
    join: join,
    send: send,
  });

  // Serverのconfig設定 & 起動
  server.bindAsync(
    serverAddress,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
