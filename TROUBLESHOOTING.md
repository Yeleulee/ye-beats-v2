# 🔧 Troubleshooting - Localhost Not Showing

## Quick Fixes

### 1. Hard Refresh the Browser

Press `Ctrl + Shift + R` (Windows) or `Cmd +Shift + R` (Mac) to clear cache and reload

### 2. Check Browser Console

1. Open Developer Tools: Press `F12`
2. Go to "Console" tab
3. Look for errors (red text)
4. Look for these messages:
   - `🚀 Fetching real data from YouTube API...`
   - `✅ Data loaded successfully!`

### 3. Check the URL

Make sure you're visiting: `http://localhost:5173` (or whatever port Vite shows)

### 4. Common Issues & Solutions

#### White/Blank Screen

- **Cause**: JavaScript error
- **Fix**: Check console (F12) for red errors
- **Fix**: Make sure all packages installed: `npm install`

#### "Module not found" errors

- **Cause**: Missing dependencies
- **Fix**: Run `npm install clsx tailwind-merge framer-motion`

#### Stuck on "Loading tracks..."

- **Cause**: No API key configured
- **Fix**: Add YouTube API key to `.env.local`
- **Fix**: Server will show mock data after timeout

#### Changes not appearing

- **Cause**: Browser cache
- **Fix**: Hard refresh (`Ctrl + Shift + R`)
- **Fix**: Clear browser cache completely

### 5. Restart Everything

```bash
# Stop the dev server (Ctrl+C)

# Clear node modules and reinstall
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### 6. Check These Files Exist

- ✅ `/utils/apiKeyManager.ts`
- ✅ `/services/youtubeService.ts`
- ✅ `/lib/utils.ts`
- ✅ `/components/ui/animated-artists.tsx`

### 7. Verify Imports in HomeContent.tsx

Should have these imports at the top:

```typescript
import { fetchTrendingMusic, fetchArtistTracks, ... } from '../services/youtubeService';
import { apiKeyManager } from '../utils/apiKeyManager';
```

## What Should Be Working

Even WITHOUT API keys, you should see:

- ✅ Landing page (login screen)
- ✅ After login: Home page with mock data
- ✅ Navigation bar
- ✅ Mock tracks displayed
- ✅ Podcast section with placeholder images

## Still Not Working?

### Check Terminal Output

Look at your terminal where `npm run dev` is running:

- Should show: `Local: http://localhost:5173`
- Look for compilation errors
- Red error messages

### Check Network Tab

1. Press `F12`
2. Go to "Network" tab
3. Reload page
4. Look for failed requests (red status codes)

### Last Resort - Clean Start

```bash
# Delete everything and start fresh
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Need More Help?

1. **Share the error** - Take a screenshot of the console (F12)
2. **Share terminal output** - Copy any red error messages
3. **Check browser** - Try in a different browser (Chrome, Firefox)

---

**Quick Test**: After opening `localhost:5173`, you should see the Ye Beats landing page with the big "Ye Beats Redefined" title. If you don't see this, there's a critical error that needs debugging.
