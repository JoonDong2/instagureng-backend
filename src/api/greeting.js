const _default = {
  Query: {
    hello: (_, args, { prisma, verification }) => {
      console.log(verification);
      //console.log(prisma);
      return 'Hello world!';
    }
  }
};
exports.default = _default;