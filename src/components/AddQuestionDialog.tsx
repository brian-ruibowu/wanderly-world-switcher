import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { Question } from "@/types";

interface AddQuestionDialogProps {
  onAddQuestion: (question: Omit<Question, "id" | "createdAt" | "userId">) => void;
}

export function AddQuestionDialog({ onAddQuestion }: AddQuestionDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddQuestion({
      title,
      description,
      location,
      userName: userName || "Anonymous"
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setLocation("");
    setUserName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full shadow-lg fixed bottom-6 right-6 bg-travel-accent hover:bg-travel-accent-dark">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-travel-blue-dark">Ask a Question</DialogTitle>
            <DialogDescription>
              Get insights from locals about your destination.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Question Title</Label>
              <Input 
                id="title" 
                placeholder="E.g., Best local restaurants in Rome?" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Details</Label>
              <Textarea 
                id="description" 
                placeholder="Provide some context or details about your question..." 
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="E.g., Rome, Italy" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userName">Your Name (Optional)</Label>
              <Input 
                id="userName" 
                placeholder="How you'll appear to others" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-travel-blue hover:bg-travel-blue-dark">
              Post Question
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
