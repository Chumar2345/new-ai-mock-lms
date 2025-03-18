import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

// Users table to store plan and usage information
export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    plan: varchar('plan').notNull(), // free, basic, or pro
    mockUsed: integer('mockUsed').default(0), // Tracks used interviews
    mockLimit: integer('mockLimit'), // Null for unlimited
    createdAt: varchar('createdAt'),
    endDate: varchar('endDate'),
    is_delete: integer('is_delete').default(0),
    paymentStatus: varchar('paymentStatus',{ length: 255 }).default('Null'),
});

// Existing MockInterview table
export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});

// Existing UserAnswer table
export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
});


export const Plan = pgTable('plans', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(), // free, basic, or pro
    price: integer('price').notNull(), // free, basic, or pro
    features: varchar('feature').notNull(),
    limit: varchar('limit'),
    createdAt: varchar('createdAt'),
});

export const Admin = pgTable('admins', {
    id: serial('id').primaryKey(), // Auto-incrementing primary key
    name: varchar('name', { length: 100 }).notNull(), // Admin's name
    email: varchar('email', { length: 255 }).notNull().unique(), // Admin's email, must be unique
    password: varchar('password', { length: 255 }).notNull(), // Encrypted password
    createdAt: varchar('createdAt'), // Timestamp with default as current time
});
