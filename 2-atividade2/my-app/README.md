# ATIVIDADE 2

Criar uma imagem Docker para um site utilizando qualquer framework/biblioteca frontend e que
disponibilize o site em alguma porta http. Entregar a URL da imagem, Dockerfile, e comando de execução da imagem

## Comandos utilizados

$ docker build -t satravasso/atividade2-react-myapp .
$ docker run -d -p 8080:3000 satravasso/atividade2-react-myapp
$ para acessar: localhost:8080
$ docker push satravasso/atividade2-react-myapp

**[Dockerhub](https://hub.docker.com/repository/docker/satravasso/atividade2-react-myapp)**
