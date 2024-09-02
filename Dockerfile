FROM node:21-alpine 

RUN apk add --no-cache \
    g++ \
    make \
    python3 \
    vips-dev

WORKDIR /app    

COPY package*.json ./

RUN npm install --verbose

RUN npm rebuild sharp

COPY . .

RUN npx prisma generate


EXPOSE 3000 

ENTRYPOINT ["npm", "run","dev"]











