FROM node:20 AS build

WORKDIR /app

RUN npm install -g @angular/cli@17.3.5

RUN rm -rf node_modules

COPY package*.json ./

RUN npm install --force

COPY . .

RUN ng build self-creation-portal  --configuration production

FROM node:20 AS final

WORKDIR /usr/projects/self-creation-portal/src/app

COPY --from=build /app/dist/self-creation-portal /app/

COPY projects/self-creation-portal/src/assets/env/env.js ./assets/env/env.js

RUN npm install -g serve

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
