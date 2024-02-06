import prisma from "@/lib/prisma";

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

const userRepository = {
  findByEmail,
  create: prisma.user.create,
};

export default userRepository;
