declare global {
  namespace BetterAuth {
    interface Session {
      user: {
        id: string;
        email: string;
        name: string;
        role?: string;
      };
    }
  }
}

export {};
