npm run build
git add .
git commit -m "Script Commit 1234"
git push origin master
rm -rf ../jeetomyteamfrontbuild/public
cp -frp build -T ../jeetomyteamfrontbuild/public
