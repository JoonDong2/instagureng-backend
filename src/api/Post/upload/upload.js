const _default = {
    Mutation: {
        upload: async (_, args, { prisma, me, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated");

            //console.log(me);
            //console.log(prisma);

            const { caption, files, location } = args;
            //console.log(caption);

            try {
                const post = await prisma.post.create({
                    data: {
                        caption,
                        location,
                        user: {
                            connect: {
                                id: me.id
                            }
                        }
    
                    }
                });

                
                files.forEach(
                    async file => {
                        await prisma.file.create({
                            data: {
                                url: file,
                                post: {
                                    connect: {
                                        id: post.id
                                    }
                                }
                            }
                        });
                    }
                )
                return post;
            } catch (e) {
                console.log(e);
                return e;
            }
        }
    }
}

exports.default = _default;