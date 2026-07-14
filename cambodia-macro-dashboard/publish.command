#!/bin/bash
# One-click publish (macOS): copies the freshly built index.html from your
# Google Drive dashboard folder into this repo and pushes to GitHub → Vercel.
#
# SET THIS ONCE: full path to your Data Management/Governor_Ask_Hosted folder.
DRIVE_HOSTED="$HOME/Library/CloudStorage/GoogleDrive-statisticsnbc@gmail.com/My Drive/Data Management/Governor_Ask_Hosted"

set -e
cd "$(dirname "$0")"   # this repo folder

if [ ! -f "$DRIVE_HOSTED/index.html" ]; then
  echo "Cannot find $DRIVE_HOSTED/index.html"
  echo "Edit DRIVE_HOSTED at the top of this script to your correct path."
  exit 1
fi

echo "Copying latest index.html ..."
cp "$DRIVE_HOSTED/index.html" ./index.html
# Uncomment the next two lines if the Ask/track functions changed:
# cp "$DRIVE_HOSTED/api/ask.js"   ./api/ask.js
# cp "$DRIVE_HOSTED/api/track.js" ./api/track.js

git add -A
git commit -m "Update dashboard $(date +%Y-%m-%d)" || { echo "Nothing to commit."; exit 0; }
git push
echo "Pushed. Vercel will deploy in about a minute."
