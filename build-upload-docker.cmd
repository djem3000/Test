 docker build -t webapi -f webapi/Dockerfile .
 docker tag webapi djem3000/test-webapi:latest
 docker push djem3000/test-webapi:latest

docker build -t ui -f reactapp1.client/Dockerfile .
docker tag ui djem3000/test-ui:latest
docker push djem3000/test-ui:latest