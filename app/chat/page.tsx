import React from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Logo } from '@/components/ui/logo';

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="flex flex-col items-center gap-6 text-center mb-8">
          <Logo className="h-12 w-auto" />
          <h1 className="text-3xl font-bold tracking-tighter">
            Chat with SapnousAI
          </h1>
          <p className="max-w-[600px] text-muted-foreground">
            Your intelligent AI assistant powered by AIRAS
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto p-4">
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <img src="/images/sapnous-dark.png" alt="SapnousAI" className="h-6 w-6" />
              </div>
              <div className="rounded-lg bg-muted p-3 text-sm">
                Hello! I'm SapnousAI by AIRAS, founded by Atah Alam. How can I assist you today?
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-2">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
