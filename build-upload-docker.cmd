REM docker build -t webapi -f webapi/Dockerfile .
REM docker tag webapi djem3000/test-webapi:latest
REM docker push djem3000/test-webapi:latest

docker build -t ui -f reactapp1.client/Dockerfile .
REM docker tag webapi djem3000/test-webapi:latest
REM docker push djem3000/test-webapi:latest