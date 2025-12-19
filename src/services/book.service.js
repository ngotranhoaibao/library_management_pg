import { prisma } from "../config/prisma/client.js";
export const createBook = async (data) => {
  const { authorId } = data;
  const author = await prisma.author.findUnique({
    where: {
      id: Number(authorId),
    },
  });

  if (!author) {
    throw new Error("Author not found");
  }
  return prisma.book.create({
    data: {
      ...data,
      authorId: Number(authorId),
    },
  });
};

export const getAllBooks = async () => {
  return prisma.book.findMany({
    include: {
      author: true,
    },
  });
};

export const getBookDetail = async (id) => {
  return prisma.book.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });
};

export const updateBook = async (id, data) => {
  if (data.authorId) {
    const author = await prisma.author.findUnique({
      where: {
        id: Number(data.authorId),
      },
    });

    if (!author) {
      throw new Error("Author not found");
    }
  }

  return prisma.book.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      authorId: data.authorId ? Number(data.authorId) : undefined,
    },
  });
};
export const deleteBook = async (id) => {
  return prisma.book.delete({
    where: {
      id: Number(id),
    },
  });
};
