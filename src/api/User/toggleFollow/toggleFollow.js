const _default = {
    Mutation: {
        toggleFollow: async(_, args, { prisma, me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated");

            const { id } = args; // follower's id
            //console.log(id);

            try {
                const alreadyFollowing = (await (await prisma.user.findOne({
                    where: {id: me.id},
                    include: { following: true }
                }))
                .following
                .map(user => user.id))
                .includes(id)

                const user = await prisma.user.findOne({
                    where: {id: me.id},
                    include: { following: true }
                })

                //console.log(alreadyFollowing);

                let user;

                if(!alreadyFollowing) {
                    //console.log("팔로잉")
                    user = await prisma.user.update({
                        where: {id: me.id},
                        data: {
                            following: {
                                connect: {
                                    id
                                }
                            }
                        },
                        include: { following: true }
                    })
                    //console.log(user);
                } else {
                    //console.log("언팔로잉")
                    user = await prisma.user.update({
                        where: {id: me.id},
                        data: {
                            following: {
                                disconnect: {
                                    id
                                }
                            }
                        },
                        include: { following: true }
                    })
                    //console.log(user);
                }
                return user;
            } catch (e) {
                console.log(e);
            }
        }
    }
}

exports.default = _default;