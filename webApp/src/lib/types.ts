import { Category, Method, Person, Vendor } from "@prisma/client";

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
