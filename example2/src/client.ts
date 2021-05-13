import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as readline from "readline";

import { Message } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
);

const remoteServer = "0.0.0.0:5001";

let username = "";

// const client = new proto.example.Chat(
//   remoteServer,
//   grpc.credentials.createInsecure()
// );
const client = new proto.example["Chat"](
  remoteServer,
  grpc.credentials.createInsecure()
);

function startChat(): void {
  let channel = client.join({ user: username });

  channel.on("data", onDataCallback);

  // 標準入力に新しい行が入力されるごとにServerに送信
  rl.addListener("line", (text: string) => {
    client.send({ user: username, text: text }, () => {});
  });
}

function onDataCallback(message: Message): void {
  if (message.user === username) {
    return;
  }

  console.log(`${message.user}: ${message.text}`);
}

rl.question("User name: ", (answer: string) => {
  username = answer;

  startChat();
});
