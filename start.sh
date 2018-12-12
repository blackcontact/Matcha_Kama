export BACK_HOSTNAME=`hostname`
export FRONT_HOSTNAME="localhost"

serv_ip=VUE_APP_SERV_ADDR=\'http://`ipconfig getifaddr en0`:3000\'

echo $serv_ip > matcha_front/.env

cd matcha_front
npm install
npm run build
cd ..
cp .htaccess matcha_front/dist/

docker-compose up