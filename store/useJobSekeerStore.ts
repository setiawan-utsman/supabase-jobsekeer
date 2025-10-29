import { create } from "zustand";

interface JobSekeerStore {
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  cardActive: any;
  setCardActive: (data: any) => void;
  sort: string;
  setSort: (sort: string) => void;
}

export const useJobSekeerStore = create<JobSekeerStore>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  cardActive: null,
  setCardActive: (data: any) => set({ cardActive: data }),
  sort: "desc",
  setSort: (sort: string) => set({ sort }),
}));