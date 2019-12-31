import {Message} from './message';

export interface Process {
  id: string;
  pendingMessages: Message[];
  failedMessages: Message[];
}
