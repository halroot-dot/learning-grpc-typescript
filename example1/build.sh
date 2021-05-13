#!/usr/bin/env bash

set -eu

export PATH="$PATH:$(npm bin)"

PROTO_SRC=./proto
PROTO_DEST=./src/proto

PLUGIN_GRPC=$(npm bin)/grpc_tools_node_protoc_plugin
PLUGIN_TS=$(npm bin)/protoc-gen-ts

mkdir -p ${PROTO_DEST}

grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${PROTO_DEST} \
  --ts_out=grpc_js:${PROTO_DEST} \
  --grpc_out=grpc_js:${PROTO_DEST} \
  --plugin=protoc-gen-grpc=${PLUGIN_GRPC} \
  --plugin=protoc-gen-ts=${PLUGIN_TS} \
  -I ${PROTO_SRC} \
  ${PROTO_SRC}/*
