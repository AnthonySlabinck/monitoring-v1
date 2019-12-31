export interface MessageDetail {
  id: string;
  timestamp: string;
  properties: Map<string, string>;
  content: string;
}
