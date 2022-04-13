# Exercício 3 - Nestjs

Criar uma imagem Docker com build em múltiplos estágios.

**Requisitos:**

- A aplicação deve ser uma API escrita em typescript
- A aplicação deve ter alguma rota que retorne um conteúdo JSON
- A imagem Docker final não pode conter nenhum arquivo ‘.ts’
- Publicar a imagem no dockerhub com a tag ‘aula’

**Entregas:**

- Link com a imagem publicada no dockerhub (será utilizada posteriormente)
- Código fonte

## Executando

```bash
docker build -t nest:aula .
docker run --name nest -d -p 8080:3000 nest:aula
```

Acesse: [http://localhost:8080](http://localhost:8080)

**[Dockerhub](https://hub.docker.com/repository/docker/rafaelgiro/nest)**
