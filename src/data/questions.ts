import { Question } from "@/types";

export const mockQuestions: Question[] = [
  {
    id: "1",
    title: "Best local food in Bangkok?",
    description: "I'm traveling to Bangkok next month and want to try authentic local food. Any recommendations for places that aren't too touristy?",
    location: "Bangkok, Thailand",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    userName: "TravelExplorer"
  },
  {
    id: "2",
    title: "Hidden gems in Paris?",
    description: "Looking for lesser-known spots in Paris that most tourists miss. Any suggestions from locals?",
    location: "Paris, France",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    userName: "WanderlustSpirit"
  },
  {
    id: "3",
    title: "Safe neighborhoods in Mexico City?",
    description: "Planning a solo trip to Mexico City. Which neighborhoods would you recommend staying in that are safe but still give an authentic experience?",
    location: "Mexico City, Mexico",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    userName: "GlobeTrotter"
  },
  {
    id: "4",
    title: "Transportation in Tokyo?",
    description: "What's the best way to get around Tokyo? Is it worth getting a transit pass or should I just pay as I go?",
    location: "Tokyo, Japan",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    userName: "AdventureSeeker"
  }
]; 