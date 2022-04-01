FROM tarampampam/node:16-alpine

LABEL name="labyrinth-solver"
LABEL version="1.0"

WORKDIR /home/node/app

COPY ./ ./

ENV NODE_ENV "development"

RUN [ "yarn" ]
RUN [ "yarn", "build" ]

ENV NODE_ENV "production"

ENTRYPOINT [ "yarn", "start" ]
CMD []
