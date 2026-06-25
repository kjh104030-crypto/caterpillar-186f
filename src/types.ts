export interface LoreDetail {
  label: string;
  value: string;
}

export interface NavItem {
  targetId: string;
  label: string;
  description: string;
}

export interface LoreEntry {
  id: string;
  title: string;
  titleEn: string;
  summary?: string;
  content?: string;
  details?: LoreDetail[];
  list?: string[];
  navItems?: NavItem[];
  renderType?: 'default' | 'genealogy' | 'navigation';
}

export interface LoreCategory {
  id: string;
  title: string;
  titleEn: string;
  entries: LoreEntry[];
}
