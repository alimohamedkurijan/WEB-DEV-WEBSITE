# Supabase Integration Setup Guide

## Overview
This guide will help you connect your Web Development Learning Management System to Supabase for user authentication and data persistence.

## Prerequisites
- A Supabase account (sign up at https://supabase.com)
- Basic knowledge of SQL and database management

## Step 1: Create a Supabase Project

1. **Sign up/Login to Supabase**
   - Go to https://supabase.com
   - Create an account or sign in

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name (e.g., "webdev-lms")
   - Set a secure database password
   - Choose your region
   - Click "Create new project"

3. **Wait for Setup**
   - Supabase will set up your project (takes 1-2 minutes)

## Step 2: Get Your Credentials

1. **Go to Settings**
   - In your project dashboard, click "Settings" (gear icon)
   - Click "API" in the sidebar

2. **Copy Credentials**
   - Copy your **Project URL**
   - Copy your **anon public** key
   - Keep these secure and don't share them publicly

## Step 3: Update Your Code

1. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Update script.js**
   - Replace `YOUR_SUPABASE_URL` with your actual project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your actual anon key
   - Uncomment the Supabase client initialization line

3. **Add Supabase CDN (Alternative)**
   If you prefer CDN, add this to your HTML:
   ```html
   <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
   ```

## Step 4: Create Database Tables

Run these SQL commands in your Supabase SQL Editor:

### 1. User Profiles Table
```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gender VARCHAR(50),
    progress JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, username, email, gender)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'User'),
        NEW.email,
        NEW.raw_user_meta_data->>'gender'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 2. Progress Tracking Table (Optional)
```sql
-- Create progress_logs table for detailed tracking
CREATE TABLE progress_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    action_value TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE progress_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own progress logs" ON progress_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress logs" ON progress_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Step 5: Configure Authentication

1. **Go to Authentication Settings**
   - In your Supabase dashboard, click "Authentication"
   - Click "Settings"

2. **Configure Email Auth**
   - Enable "Enable email confirmations" if you want email verification
   - Set your site URL (e.g., `http://localhost:3000` for development)
   - Add redirect URLs for your domain

3. **Configure OAuth (Optional)**
   - If you want to integrate with Hootlabs or other providers
   - Go to "Providers" in Authentication settings
   - Configure your OAuth provider

## Step 6: Test Your Integration

1. **Update Your Credentials**
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

2. **Uncomment Supabase Code**
   - In `script.js`, uncomment the Supabase client initialization
   - Uncomment all the Supabase function calls

3. **Test Authentication**
   - Try signing up with a new email
   - Try signing in with existing credentials
   - Check your Supabase dashboard for new users

## Step 7: Environment Variables (Production)

For production, use environment variables:

1. **Create .env file**
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. **Update script.js**
   ```javascript
   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
   const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

## Database Schema Overview

### user_profiles Table
- `id`: UUID (references auth.users)
- `username`: VARCHAR(255)
- `email`: VARCHAR(255) UNIQUE
- `gender`: VARCHAR(50)
- `progress`: JSONB (stores all progress data)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### progress_logs Table (Optional)
- `id`: UUID
- `user_id`: UUID (references user_profiles)
- `action_type`: VARCHAR(50)
- `action_value`: TEXT
- `metadata`: JSONB
- `created_at`: TIMESTAMP

## Security Features

1. **Row Level Security (RLS)**
   - Users can only access their own data
   - Automatic data isolation

2. **Authentication**
   - Secure JWT tokens
   - Email verification (optional)
   - Password policies

3. **Data Validation**
   - Database constraints
   - Input validation
   - SQL injection protection

## Monitoring and Analytics

1. **Supabase Dashboard**
   - Monitor user signups
   - Track database usage
   - View logs and errors

2. **Custom Analytics**
   - Use progress_logs table for detailed tracking
   - Create custom dashboards
   - Export data for analysis

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Add your domain to Supabase allowed origins
   - Check your site URL configuration

2. **Authentication Errors**
   - Verify your API keys
   - Check email confirmation settings
   - Ensure proper redirect URLs

3. **Database Errors**
   - Check RLS policies
   - Verify table structure
   - Review SQL syntax

### Debug Mode
Enable debug logging:
```javascript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        debug: true
    }
});
```

## Next Steps

1. **Customize Authentication**
   - Add custom email templates
   - Configure password policies
   - Set up OAuth providers

2. **Enhance Security**
   - Add rate limiting
   - Implement audit logging
   - Set up monitoring alerts

3. **Scale Your Application**
   - Optimize database queries
   - Add caching layers
   - Implement CDN for static assets

## Support

- **Supabase Documentation**: https://supabase.com/docs
- **Community Forum**: https://github.com/supabase/supabase/discussions
- **Discord**: https://discord.supabase.com

## Migration from LocalStorage

When you're ready to migrate from localStorage to Supabase:

1. **Export existing data**
   ```javascript
   const existingData = localStorage.getItem('userData');
   // Upload to Supabase
   ```

2. **Update user sessions**
   - Migrate existing users to Supabase auth
   - Preserve their progress data

3. **Test thoroughly**
   - Verify all data is preserved
   - Test authentication flows
   - Ensure no data loss

---

**Note**: This setup provides a solid foundation for user authentication and data persistence. You can extend it further based on your specific requirements. 