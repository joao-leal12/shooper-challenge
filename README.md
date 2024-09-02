# Shopper-challenge

API de Medição de Contadores de Água e Gás
Esta API permite a medição de contadores de água e gás a partir de imagens processadas por Inteligência Artificial (IA). O objetivo é extrair informações precisas de leitura dos contadores a partir de imagens fornecidas.

Funcionalidades
Envio de Imagem: Envie uma imagem do contador para a API.
Processamento de Imagem: A imagem é processada por um modelo de IA para identificar e extrair os dados do contador.
Retorno de Leitura: Receba a leitura do contador extraída da imagem em formato JSON.

## Pré-requisitos

Antes de começar, certifique-se de que você tem o [Docker](https://www.docker.com/get-started) e o [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina.

## Clonando o Repositório

Primeiro, clone o repositório do projeto usando o Git:

```bash
git clone https://github.com/joao-leal12/shopper-challenge.git
cd shopper-challenge
docker-compose up 
