
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Tag {
  name: string;
}

export interface Question {
  id: number;
  text: string;
  tags: Tag[];
  location: string;
  answers: number;
  following: number;
  isNew?: boolean;
  createdAt: Date;
}

interface QuestionsContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'answers' | 'following' | 'createdAt'>) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (question: Omit<Question, 'id' | 'answers' | 'following' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now(),
      answers: 0,
      following: 0, // Changed from random number to 0
      createdAt: new Date(),
    };
    
    setQuestions(prevQuestions => [newQuestion, ...prevQuestions]);
  };

  return (
    <QuestionsContext.Provider value={{ questions, addQuestion }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = (): QuestionsContextType => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};

