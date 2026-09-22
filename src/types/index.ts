export interface PoetrySection {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  gradient: string;
  poems: Poem[];
}

export interface Poem {
  id: string;
  title?: string;
  type: string;
  verses: string[];
}
