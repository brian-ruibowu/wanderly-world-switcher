export interface Question {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  userName: string;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  text: string;
  userName: string;
  createdAt: string;
  likes: number;
  questionId: string;
} 