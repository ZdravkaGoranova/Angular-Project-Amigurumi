export interface Comment {
    text: string;
    timestamp: any;
    user: {
      name: string;
      userId: string;
    };
  }