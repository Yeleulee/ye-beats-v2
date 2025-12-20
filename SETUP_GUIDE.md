# 🔧 Quick Setup Guide - Real Data Integration

## ⚠️ Important: API Keys Required!

Your app is set up to use real YouTube data, but you need to configure API keys first.

## Step 1: Get YouTube API Keys

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

## Step 2: Configure .env.local

Open `.env.local` and add your API key:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_api_key_here
```

**For better quota management, add more keys:**

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_YOUTUBE_API_KEY_2=AIzaSyYYYYYYYYYYYYYYYYYY
NEXT_PUBLIC_YOUTUBE_API_KEY_3=AIzaSyZZZZZZZZZZZZZZZZZZ
```

## Step 3: Restart Dev Server

After adding your API keys:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Verify It's Working

Once the server restarts, check the browser console (F12) for:

- `🚀 Fetching real data from YouTube API...`
- `✅ Data loaded successfully!`
- API key usage stats

## What You'll See

With real data connected, your app will display:

### 🎵 Home Page

- **Trending Music** - Real-time popular tracks
- **Time-Based Recommendations** - Changes based on time of day
- **Recently Played** - Latest popular songs
- **Podcasts** - Ethiopian & International podcasts

### 🎤 Featured Artists

- The Weeknd
- Drake
- Teddy Afro (Ethiopian Legend)
- Lana Del Rey

### 🇪🇹 Ethiopian Content

- Teddy Afro
- Aster Aweke
- Mahmoud Ahmed
- Seifu on EBS (Podcast)
- Zehabesha (Podcast)

## Troubleshooting

### "No Data Showing"

✅ **Solution**: Check that your API key is in `.env.local`  
✅ **Solution**: Restart the dev server after adding keys  
✅ **Solution**: Check browser console for errors (F12)

### "Quota Exceeded"

✅ **Solution**: Add more API keys (see Step 2)  
✅ **Solution**: Wait 24 hours for quota reset  
✅ **Solution**: The app will fall back to mock data automatically

### "Songs Not Playing"

✅ **Solution**: Click the play button on any track card  
✅ **Solution**: Make sure the track has loaded (check cover art)  
✅ **Solution**: Check browser console for YouTube player errors

## API Quota Info

- **Daily Limit**: 10,000 requests per key
- **With 3 keys**: 30,000 requests/day
- **Automatic rotation**: System uses keys efficiently
- **Fallback**: Mock data if API fails

## Search Functionality

Search is implemented in `App.tsx`:

1. Type in search bar
2. Press Enter or click Search icon
3. Real YouTube search results appear
4. Click any track to play

## Need Help?

1. Check the browser console (F12)
2. Look for red error messages
3. Verify API keys are correct
4. Make sure YouTube API is enabled in Google Cloud Console

---

**Pro Tip**: Use 3-5 API keys from different Google Cloud projects for best results!
