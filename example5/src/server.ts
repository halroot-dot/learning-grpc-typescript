import * as grpc from "@grpc/grpc-js";
import * as book_grpc_pb from "./proto/book_grpc_pb";
import * as book_pb from "./proto/book_pb";

import { bookData } from "./books";

class BookService implements book_grpc_pb.IBookServiceServer {
  [name: string]: grpc.UntypedHandleCall;
  getBook(
    call: grpc.ServerUnaryCall<book_pb.GetBookRequest, book_pb.GetBookResponse>,
    callback: grpc.sendUnaryData<book_pb.GetBookResponse>
  ) {
    const bookId = call.request.getId();

    const response = new book_pb.GetBookResponse();
    const book = new book_pb.Book();
    book.setTitle(bookData[bookId].title);
    book.setAuthor(bookData[bookId].author);
    response.setBook(book);

    callback(null, response);
  }
}

(() => {
  const server = new grpc.Server();
  server.addService(book_grpc_pb.BookServiceService, new BookService());
  server.bindAsync(
    `0.0.0.0:50051`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
})();
