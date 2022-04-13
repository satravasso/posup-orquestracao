# ATIVIDADE 3

ATIVIDADE 3 - Criar uma imagem Docker com build em múltiplos estágios.
○ Requisitos:
■ A aplicação deve ser uma API escrita em typescript
■ A aplicação deve ter alguma rota que retorne um conteúdo JSON
■ A imagem Docker final não pode conter nenhum arquivo ‘.ts’
■ Publicar a imagem no dockerhub com a tag ‘aula’
○ Entregas:
■ Link com a imag

## Comandos utilizados

$ docker build -t satravasso/atividade3-express .
$ docker run -d -p 8080:3000 satravasso/atividade3-express

$ docker push satravasso/atividade3-express

**[Dockerhub](https://hub.docker.com/repository/docker/satravasso/atividade2-react-myapp)**
