import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  addDocumentSchema,
  updateDocumentSchema,
  getDocumentByIdSchema,
  deleteDocumentSchema,
  getDocumentsByDeckIdSchema,
} from "~/server/schemas/deck";

export const documentRouter = createTRPCRouter({
  // CREATE: Add a document to a deck
  create: protectedProcedure
    .input(addDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify deck ownership
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.deckId,
        },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to add documents to this deck",
        });
      }

      // Create the document with file metadata
      const document = await ctx.db.document.create({
        data: {
          name: input.name,
          fileUrl: input.fileUrl,
          fileKey: input.fileKey,
          fileType: input.fileType,
          fileSize: input.fileSize,
          deckId: input.deckId,
        },
      });

      return document;
    }),

  // READ: Get all documents for a deck
  getByDeckId: protectedProcedure
    .input(getDocumentsByDeckIdSchema)
    .query(async ({ ctx, input }) => {
      // Verify deck ownership
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.deckId,
        },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access documents in this deck",
        });
      }

      // Get all documents
      const documents = await ctx.db.document.findMany({
        where: {
          deckId: input.deckId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return documents;
    }),

  // READ: Get a specific document by ID
  getById: protectedProcedure
    .input(getDocumentByIdSchema)
    .query(async ({ ctx, input }) => {
      const document = await ctx.db.document.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!document) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }

      // Verify ownership through deck
      if (document.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access this document",
        });
      }

      return document;
    }),

  // UPDATE: Update a document
  update: protectedProcedure
    .input(updateDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if document exists and user owns it
      const existingDocument = await ctx.db.document.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!existingDocument) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }

      if (existingDocument.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this document",
        });
      }

      // Update the document (only name can be changed - files are immutable)
      const updatedDocument = await ctx.db.document.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      return updatedDocument;
    }),

  // DELETE: Delete a document
  delete: protectedProcedure
    .input(deleteDocumentSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if document exists and user owns it
      const existingDocument = await ctx.db.document.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!existingDocument) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }

      if (existingDocument.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this document",
        });
      }

      // Delete the document
      await ctx.db.document.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
});
