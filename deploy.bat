@echo off
cd /d "c:\Users\Adam\Documents\GitHub\macroecon-game\frontend"
echo Building...
npm run build
echo.
echo Deploying to Netlify...
npx netlify deploy --prod --dir=dist --site=macroecon3beta
echo.
echo Done!
pause
