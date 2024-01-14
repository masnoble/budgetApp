import { Category, Method, Person, Prisma, Vendor } from "@prisma/client";

export type NavBarItem = {
  page: string;
  href: string;
};

export type TransactionEntryOptions = {
  currentUser: Person;
  people: Person[];
  vendors: Vendor[];
  categories: Category[];
  methods: Method[];
};

export type BudgetData = Prisma.CategoryGetPayload<{
  include: { budget: true; transactions: { select: { amount: true } } };
}>;

export type MonthIdentifyer = Prisma.MonthGetPayload<{
  select: { monthCode: true; year: true };
}>;
