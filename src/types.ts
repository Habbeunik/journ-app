import { Prisma } from "@prisma/client";

export type User = Prisma.UserMinAggregateOutputType;
export type CreateUserType = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt">
>;
