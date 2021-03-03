APPNAME="cdb-simulator"
HOST=

ssh -tt $HOST "mkdir $APPNAME && cd $APPNAME && sudo chmod 777 * -R"
rsync --progress --exclude-from '.deployignore' -avz -e "ssh" . $HOST:$APPNAME

ssh -tt $HOST "cd $APPNAME && docker build -t $APPNAME ."
ssh -tt $HOST "cd $APPNAME && docker stop $APPNAME"
ssh -tt $HOST "cd $APPNAME && docker rm $APPNAME"
ssh -tt $HOST "cd $APPNAME && docker run --name=$APPNAME -p 80:3000 -d --restart=unless-stopped $APPNAME"
