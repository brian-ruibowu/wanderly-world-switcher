import { Answer } from "@/types";

export const mockAnswers: Answer[] = [
  {
    id: "1",
    text: "For authentic Bangkok street food, try Chinatown (Yaowarat) at night. The seafood stalls near the Chinatown gate are amazing but not too touristy. Also check out Or Tor Kor Market for incredible Thai food in a cleaner market setting.",
    userName: "LocalExpert",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 5,
    questionId: "1"
  },
  {
    id: "2",
    text: "Chatuchak Weekend Market has some great food stalls in the center area. For sit-down meals, try Soei Restaurant or Krua Apsorn - both are where locals eat and prices are reasonable.",
    userName: "BangkokFoodie",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    likes: 3,
    questionId: "1"
  },
  {
    id: "3",
    text: "The Jardins du Palais Royal and Buttes-Chaumont park are beautiful hidden gems in Paris that tourists often miss. Also check out Passage des Panoramas for a historic covered passage with great restaurants.",
    userName: "ParisianLocal",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    likes: 7,
    questionId: "2"
  }
]; 