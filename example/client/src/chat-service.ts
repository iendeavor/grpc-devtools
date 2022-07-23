import { unaryInterceptors, streamInterceptors } from "./grpc-devtools";
import { ChatServiceClient } from "./protos/ChatServiceClientPb";
import { SendMessageRequest, OnMessageRequest } from "./protos/chat_pb";

class ChatService {
  private chatService;
  private channel;

  constructor() {
    this.chatService = new ChatServiceClient("http://localhost:3003", null, {
      unaryInterceptors: unaryInterceptors,
      streamInterceptors: streamInterceptors,
    });

    const metadata = { "custom-header-1": "request" };
    this.channel = this.chatService.onMessage(new OnMessageRequest(), metadata);
  }

  sendMessage(message: string): void {
    const request = new SendMessageRequest();
    request.setMessage(message);

    const metadata = { "custom-header-1": "request" };
    if (Math.random() > 0.5) {
      console.log("send message by promise-based request");
      this.chatService.sendMessage(request, metadata);
    } else {
      console.log("send message by callback-based request");
      this.chatService.sendMessage(request, metadata, () => void 0);
    }
  }

  onMessage(listener: (message: string) => void): void {
    this.channel.on("data", (response) => {
      listener(response.getMessage());
    });
    this.channel.on("error", (err) => {
      console.log("onMessage", err);
    });
  }
}

export default ChatService;
