import { prisma } from "../config/prisma/client.js";

export const createAuthor = async (data) => {
  return prisma.author.create({
    data
  });
};

export const getAllAuthors = async () => {
  return prisma.author.findMany({
    include: {
      books: true
    }
  });
};

export const getAuthorDetail = async (id) => {
  return prisma.author.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      books: true
    }
  });
};

export const updateAuthor = async (id, data) => {
  return prisma.author.update({
    where: {
      id: Number(id)
    },
    data
  });
};

export const deleteAuthor = async (id) => {
  return prisma.author.delete({
    where: {
      id: Number(id)
    }
  });
};
