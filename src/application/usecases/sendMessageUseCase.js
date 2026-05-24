export class SendMessageUseCase {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(message, history) {
    return await this.chatRepository.sendMessage(message, history);
  }
}
