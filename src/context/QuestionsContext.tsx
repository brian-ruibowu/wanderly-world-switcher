import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Question, Answer } from '@/types';
import { mockQuestions } from '@/data/questions';
import { mockAnswers } from '@/data/answers';

interface QuestionsContextType {
  questions: Question[];
  answers: Answer[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => string;
  addAnswer: (answer: Omit<Answer, 'id' | 'createdAt' | 'likes'>) => void;
  getQuestionById: (id: string) => Question | undefined;
  getAnswersForQuestion: (questionId: string) => Answer[];
  likeAnswer: (answerId: string) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // Initialize with mock data
  useEffect(() => {
    setQuestions(mockQuestions);
    setAnswers(mockAnswers);
  }, []);

  const addQuestion = (question: Omit<Question, 'id' | 'createdAt'>): string => {
    const id = Date.now().toString();
    const newQuestion: Question = {
      ...question,
      id,
      createdAt: new Date().toISOString(),
    };
    
    setQuestions(prevQuestions => [newQuestion, ...prevQuestions]);
    return id;
  };

  const addAnswer = (answer: Omit<Answer, 'id' | 'createdAt' | 'likes'>) => {
    const newAnswer: Answer = {
      ...answer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    
    setAnswers(prevAnswers => [newAnswer, ...prevAnswers]);
  };

  const getQuestionById = (id: string) => {
    return questions.find(question => question.id === id);
  };

  const getAnswersForQuestion = (questionId: string) => {
    return answers.filter(answer => answer.questionId === questionId);
  };

  const likeAnswer = (answerId: string) => {
    setAnswers(prevAnswers => 
      prevAnswers.map(answer => 
        answer.id === answerId 
          ? { ...answer, likes: answer.likes + 1 } 
          : answer
      )
    );
  };

  return (
    <QuestionsContext.Provider value={{ 
      questions, 
      answers, 
      addQuestion, 
      addAnswer, 
      getQuestionById, 
      getAnswersForQuestion,
      likeAnswer
    }}>
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

