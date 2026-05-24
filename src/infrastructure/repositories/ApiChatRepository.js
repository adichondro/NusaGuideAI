import { ChatRepository } from '../../domain/repositories/ChatRepository';

export class ApiChatRepository extends ChatRepository {
  constructor(customApiKeyGetter = null) {
    super();
    this.customApiKeyGetter = customApiKeyGetter;
  }

  async sendMessage(message, history) {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.customApiKeyGetter) {
      const customKey = this.customApiKeyGetter();
      if (customKey) {
        headers['x-gemini-api-key'] = customKey;
      }
    }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ message, history })
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get response from server.';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (_) {
        try {
          errorMessage = await response.text();
        } catch (_) {}
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  }
}
