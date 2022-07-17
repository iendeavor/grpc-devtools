import { unaryInterceptors } from "./grpc-devtools";
import { ChatServiceClient } from "./protos/ChatServiceClientPb";
import { SendMessageRequest, OnMessageRequest } from "./protos/chat_pb";

class ChatService {
  private chatService;
  private channel;

  constructor() {
    this.chatService = new ChatServiceClient("http://localhost:3003", null, {
      unaryInterceptors: unaryInterceptors,
    });

    this.channel = this.chatService.onMessage(new OnMessageRequest());
  }

  sendMessage(message: string): void {
    const request = new SendMessageRequest();
    request.setMessage(message);
    this.chatService.sendMessage(request, null);
  }

  onMessage(listener: (message: string) => void): void {
    this.channel.on("data", (response) => {
      listener(response.getMessage());
    });
  }
}

export default ChatService;
