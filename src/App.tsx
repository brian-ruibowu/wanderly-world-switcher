
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionsProvider } from "./context/QuestionsContext";
import HelpTravelers from "./pages/HelpTravelers";
import NotFound from "./pages/NotFound";
import AskQuestion from "./pages/AskQuestion";
import QuestionPreview from "./pages/QuestionPreview";
import Inbox from "./pages/Inbox";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuestionsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HelpTravelers />} />
            <Route path="/home" element={<Index />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/question/:questionId" element={<QuestionPreview />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuestionsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
