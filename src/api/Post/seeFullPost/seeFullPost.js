const _default = {
    Query: {
        seeFullPost: async (_, args, { prisma }) => {
            const { id } = args;
            return await prisma.post.findOne({ 
                where: {
                    id
                }
            });
        }
    }
}

exports.default = _default;