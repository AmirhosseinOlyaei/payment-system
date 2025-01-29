/*
  # Create Subscription System Tables

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
      - `price_id` (text)
      - `quantity` (int)
      - `cancel_at_period_end` (boolean)
      - `created` (timestamptz)
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `ended_at` (timestamptz)
      - `cancel_at` (timestamptz)
      - `canceled_at` (timestamptz)
      - `trial_start` (timestamptz)
      - `trial_end` (timestamptz)

    - `prices`
      - `id` (text, primary key)
      - `product_id` (text)
      - `active` (boolean)
      - `description` (text)
      - `unit_amount` (int)
      - `currency` (text)
      - `type` (text)
      - `interval` (text)
      - `interval_count` (int)
      - `trial_period_days` (int)
      - `metadata` (jsonb)

    - `products`
      - `id` (text, primary key)
      - `active` (boolean)
      - `name` (text)
      - `description` (text)
      - `image` (text)
      - `metadata` (jsonb)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create products table
CREATE TABLE products (
  id text PRIMARY KEY,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Create prices table
CREATE TABLE prices (
  id text PRIMARY KEY,
  product_id text REFERENCES products(id),
  active boolean,
  description text,
  unit_amount integer,
  currency text,
  type text,
  interval text,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);

ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON prices
  FOR SELECT USING (true);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  status text,
  price_id text REFERENCES prices(id),
  quantity integer,
  cancel_at_period_end boolean,
  created timestamptz DEFAULT timezone('utc'::text, now()),
  current_period_start timestamptz,
  current_period_end timestamptz,
  ended_at timestamptz,
  cancel_at timestamptz,
  canceled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subs" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subs" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);