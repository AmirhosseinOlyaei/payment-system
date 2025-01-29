"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CreditCard, LogIn, LogOut, User } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [supabaseInitialized, setSupabaseInitialized] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    try {
      const supabaseClient = createClientComponentClient();
      setSupabase(supabaseClient);
      setSupabaseInitialized(true);
    } catch (error) {
      console.error('Supabase client initialization failed:', error);
      setSupabaseInitialized(false);
    }
  }, []);

  useEffect(() => {
    if (!supabaseInitialized || !supabase) return;

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    return () => subscription?.unsubscribe();
  }, [supabase, supabaseInitialized]);

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              <span className="font-bold">PaySystem</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!supabaseInitialized ? (
              <Button variant="ghost" disabled>
                Connecting...
              </Button>
            ) : user ? (
              <>
                <Link href="/dashboard">
                  <Button variant={pathname === '/dashboard' ? 'default' : 'ghost'}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant={pathname === '/login' ? 'default' : 'ghost'}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}