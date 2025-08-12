# Quick Start: Supabase Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Choose organization and enter project name
4. Set database password and region
5. Wait for setup to complete

### Step 2: Get Your Credentials
1. In your project dashboard, go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon public** key

### Step 3: Update Configuration
1. Open `supabase-config.js`
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

### Step 4: Create Database Tables
1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL:

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

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);
```

### Step 5: Enable Supabase
1. Open `script.js`
2. Find the line: `// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {`
3. Remove the `//` to uncomment it
4. Uncomment all the Supabase function calls in the file

### Step 6: Test It!
1. Open your website
2. Try signing up with a new email
3. Check your Supabase dashboard for the new user
4. Try signing in with the same credentials

## ✅ What's Ready

- ✅ **User Authentication**: Email/password signup and signin
- ✅ **Profile Management**: Username, email, gender storage
- ✅ **Progress Tracking**: All user progress saved to database
- ✅ **Data Persistence**: Stats saved across devices and sessions
- ✅ **Security**: Row Level Security (RLS) enabled
- ✅ **Local Backup**: localStorage fallback for offline use

## 🔧 Current Features

### Authentication
- Email/password signup and signin
- Automatic user profile creation
- Session persistence
- Secure JWT tokens

### Data Storage
- User profiles with progress tracking
- JSONB storage for flexible progress data
- Automatic timestamps
- Data validation

### Security
- Row Level Security (RLS)
- Users can only access their own data
- SQL injection protection
- Secure authentication

## 📱 Mobile Ready
- Responsive design
- Touch-friendly interfaces
- Offline capability with localStorage
- Cross-device synchronization

## 🎯 Next Steps

1. **Customize Authentication**
   - Add email verification
   - Configure password policies
   - Set up OAuth providers

2. **Enhance Features**
   - Add progress analytics
   - Implement achievements system
   - Create admin dashboard

3. **Production Deployment**
   - Set up environment variables
   - Configure custom domain
   - Add monitoring and logging

## 🆘 Need Help?

- Check the full setup guide: `SUPABASE_SETUP.md`
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Community: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)

---

**Your website is now ready for Supabase integration!** 🎉 