const _default = {
    Query: {
        seeUser: async (_, args, { prisma }) => {
            const { userName } = args;
            try {
                const user = await prisma.user.findOne({ 
                    where: {
                        userName
                    }    
                });

                console.log(user);
                return user;
            } catch (e) {
                return e;
            }
        }
    }
}

exports.default = _default