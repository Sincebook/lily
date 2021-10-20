mkdir dist
cd dist
tar zxvf ./../frontend.tar.gz
cd ..
docker build -f ./ci/Dockerfile -t $IMAGE_REPO_PREFIX-master:$IMAGE_VER .
docker stop $CONTAINER_NAME_PREFIX-master || true && docker rm $CONTAINER_NAME_PREFIX-master || true
docker run -d -p 0.0.0.0:21366:80 --name $CONTAINER_NAME_PREFIX-master $IMAGE_REPO_PREFIX-master:$IMAGE_VER
