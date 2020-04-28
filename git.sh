npm run build
git add .
git commit -m "Script Commit 1234"
git push origin master
git push originlocal master
rm -rf ../build/public
cp -frp build -T ../build/public
