# RUN IN DOCKER CONTAINER
1. docker build -f Dockerfile.prod -t portfolio-site-backend .
2. docker run -p 80:8000 <image-id>