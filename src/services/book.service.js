import { prisma } from "../config/prisma/client.js";

export const createBook = async (data) => {
  return prisma.book.create({
    data
  });
};

export const getAllBooks = async () => {
  return prisma.book.findMany({
    include: {
      author: true
    }
  });
};

export const getBookDetail = async (id) => {
  return prisma.book.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      author: true
    }
  });
};
export const updateBook = async (id, data) => {
  return prisma.book.update({
    where: {
      id: Number(id)
    },
    data
  });
};

export const deleteBook = async (id) => {
  return prisma.book.delete({
    where: {
      id: Number(id)
    }
  });
};
