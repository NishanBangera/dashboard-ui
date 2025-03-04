"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function fetchUser({
  id,
  email,
  username,
}: {
  id: string;
  email: string;
  username: string;
}) {
  if(!id || !email || !username){
    return {success:false}
  }
  try {
    const fetchUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!fetchUser) {
      const user = await prisma.$transaction(async (tx) => {
        const createUser = await tx.user.create({
          data: {
            id,
            email,
            name: username,
          },
        });
        await tx.dashboard.create({
          data: {
            name: `${createUser.name} Dashboard`,
            userId: createUser.id,
            layouts:[{lg:[]}]
          },
        });
        return createUser
      });
      return { success: true, data: user };
    }
    return { success: true, data: fetchUser };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
