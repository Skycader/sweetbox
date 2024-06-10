printf 'Starting new app...\n'
printf 'Give your app a name: '
read folder_name

mkdir $folder_name
cd $folder_name
git clone https://github.com/Skycader/ngrx-template-app.git .
yarn
yarn initialize
