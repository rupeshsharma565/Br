npm run build
git add .
git commit -m "Script Commit 1234"
git push origin master
rm -rf ../buildfront/public
cp -frp build -T ../buildfront/public
