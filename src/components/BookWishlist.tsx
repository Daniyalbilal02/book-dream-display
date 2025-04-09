
import React, { useState } from "react";
import { Book, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

type BookItem = {
  id: string;
  title: string;
};

const BookWishlist = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  
  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBookTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a book title",
        variant: "destructive",
      });
      return;
    }
    
    const newBook: BookItem = {
      id: Date.now().toString(),
      title: newBookTitle.trim(),
    };
    
    setBooks((prev) => [...prev, newBook]);
    setNewBookTitle("");
    
    toast({
      title: "Book added",
      description: `"${newBookTitle}" has been added to your wishlist`,
    });
  };
  
  const removeBook = (id: string, title: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
    
    toast({
      title: "Book removed",
      description: `"${title}" has been removed from your wishlist`,
    });
  };
  
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-center mb-8">
        <Book className="w-8 h-8 text-book mr-2" />
        <h1 className="text-3xl font-bold text-center">Book Wishlist</h1>
      </div>
      
      <form onSubmit={addBook} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter book title..."
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            className="rounded-lg"
          />
          <Button type="submit" className="bg-book hover:bg-book-dark">
            <Plus className="w-5 h-5 mr-1" /> Add
          </Button>
        </div>
      </form>
      
      <div className="space-y-3">
        {books.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground bg-secondary">
            <p>Your wishlist is empty. Add some books!</p>
          </Card>
        ) : (
          books.map((book) => (
            <Card
              key={book.id}
              className="p-4 flex justify-between items-center book-item-appear"
            >
              <span className="font-medium">{book.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeBook(book.id, book.title)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </Card>
          ))
        )}
      </div>
      
      {books.length > 0 && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          {books.length} {books.length === 1 ? "book" : "books"} in your wishlist
        </p>
      )}
    </div>
  );
};

export default BookWishlist;
