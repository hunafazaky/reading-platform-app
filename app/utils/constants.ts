// Interface
export interface Hashtag {
  id: number;
  name: string;
}

export interface INavList {
  icon: string,
  name: string;
  target: string;
}

// Data
export const hashtags: Hashtag[] = [
  { id: 0, name: "Teknologi" },
  { id: 1, name: "Kesehatan" },
  { id: 2, name: "Olahraga" },
  { id: 3, name: "Travel" },
  { id: 4, name: "Otomotif" },
];

export const nav_list: INavList[] = [
  {
    icon: "mdi-home",
    name: "Beranda",
    target: "/home",
  },
  {
    icon: "mdi-compass",
    name: "Eksplorasi",
    target: "/explore",
  },
  {
    icon: "mdi-bookshelf",
    name: "Rak Buku",
    target: "/bookshelf",
  },
  {
    icon: "mdi-text-box-plus",
    name: "Tulis Sesuatu",
    target: "/write",
  },
];
