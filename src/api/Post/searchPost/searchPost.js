const _default = {
    Query: {
        searchPost: async(_, args, { prisma }) => prisma.post.findMany({
            where: {
                OR: [
                    { 
                        caption: {
                            contains: args.term
                        } 
                    },
                    { 
                        location: {
                            contains: args.term
                        } 
                    }
                ]
            }
        })
    }
}

exports.default = _default;