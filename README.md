# Payment System with Stripe Integration

A modern payment system built with Next.js, Supabase, and Stripe.

## Features

- User Authentication with Supabase
- Stripe Payment Integration
- Subscription Management
- Modern UI with Tailwind CSS
- Responsive Design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PRICE_ID=your_stripe_price_id
   NEXT_PUBLIC_APP_URL=your_app_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is deployed on Netlify. You can visit it at: https://paywithstripe.netlify.app/

## Tech Stack

- Next.js
- Supabase
- Stripe
- Tailwind CSS
- TypeScript
