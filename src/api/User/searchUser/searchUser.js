const _default = {
    Query: {
        searchUser: async (_, args, {prisma, me, isValid}) => {
            try {
                return (
                    await prisma.user.findMany({
                        where: {
                            OR:[
                                {
                                    email: {
                                        contains: args.term
                                    } 
                                },
                                {
                                    userName: {
                                        contains: args.term
                                    } 
                                },
                                { 
                                    firstName: {
                                        contains: args.term
                                    } 
                                },
                                { 
                                    lastName: {
                                        contains: args.term
                                    } 
                                },
                            ]
                        }
                    })
                )
            } catch (e) {
                console.log(e);
            }
        }
            
    }
}

exports.default = _default;