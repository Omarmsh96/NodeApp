FROM node:14 as base 

FROM base as development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4001
CMD [ "npm","run", "start-dev" ]

FROM base as production 
WORKDIR /app
COPY package.json .
RUN npm install --only= production
COPY . .
EXPOSE 4001
CMD [ "npm","start" ]



#COPY index.js .
#copy all file to container COPY . .