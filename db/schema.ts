import { sqliteTable,text,integer } from 'drizzle-orm/sqlite-core';
export const profiles=sqliteTable('profiles',{id:text('id').primaryKey(),owner:text('owner').notNull(),visibility:text('visibility').notNull(),data:text('data').notNull(),createdAt:text('created_at').notNull()});
export const uploads=sqliteTable('uploads',{id:text('id').primaryKey(),owner:text('owner').notNull(),createdAt:text('created_at').notNull()});
export const limits=sqliteTable('limits',{id:text('id').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
