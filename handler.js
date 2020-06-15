'use strict';

const { ApolloServer } = require('apollo-server-lambda');
const { schema } = require('./src/schema');
const { prisma } = require('./src/context'); 
const { verifier } = require('./src/verifier');


const server = new ApolloServer({
  schema,
  context: async ({ event, context }) => {
    //const { headers: {authorization} } = event;
    const authorization = event.headers.authorization || event.headers.Authorization;
    //console.log(event);
    //console.log("authorizations: " ,authorization);
    const {userName, isValid} = await verifier({token: authorization});
    //console.log(userName, isValid);
    const me = await prisma.user.findOne({
      where: {
        userName
      }
    });
    return { prisma, me, isValid }
  },
  /*playground: {
    endpoint: "/dev/apollo"
  } */
});

exports.apollo = server.createHandler({
  cors: {
    origin: '*',
    methods: [
      'POST',
      'GET'
    ], 
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept'
    ]
  },
});