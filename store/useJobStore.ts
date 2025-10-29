import { create } from "zustand";

interface JobStore {
    search: string;
    setSearch: (search: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    sort: string;
    setSort: (sort: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
    search: "",
    setSearch: (search: string) => set({ search }),
    currentPage: 1,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    sort: "desc",
    setSort: (sort: string) => set({ sort }),
}));