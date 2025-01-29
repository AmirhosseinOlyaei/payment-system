import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Check, CreditCard, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-background to-muted">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Accept payments with ease
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Integrate our payment system into your applications and start accepting payments in minutes.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button size="lg">
              <CreditCard className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4">
        <Card className="p-6 space-y-4">
          <Shield className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-bold">Secure Payments</h3>
          <p className="text-muted-foreground">
            Industry-standard security with PCI compliance and fraud protection.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <Zap className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-bold">Quick Integration</h3>
          <p className="text-muted-foreground">
            Simple API and SDKs that make integration a breeze.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <Check className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-bold">Global Support</h3>
          <p className="text-muted-foreground">
            Accept payments in multiple currencies from customers worldwide.
          </p>
        </Card>
      </div>
    </div>
  );
}