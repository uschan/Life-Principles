export type Category = 'CORE' | 'STRATEGY' | 'MINDSET' | 'RELATION' | 'SYSTEM';

export interface PrincipleItem {
  id: number;
  category: Category;
  title: string;
  content: string;
  points: string[];
}

export interface AnalysisSection {
  title: string;
  content: string[];
}

export interface MetaLogicRule {
  title: string;
  description: string;
  points: string[];
}

export interface MetaLogic {
  title: string;
  description: string;
  rules: MetaLogicRule[];
}

export interface CoreFrameworkPoint {
  label: string;
  ids: number[];
  description: string;
}

export interface CoreFramework {
  title: string;
  description: string;
  points: CoreFrameworkPoint[];
}

export interface MethodologyItem {
  id: string | number;
  title: string;
  content: string;
  points: string[];
}

export interface Methodology {
  title: string;
  description: string;
  items: MethodologyItem[];
}

export interface KeyInsight {
  title: string;
  description: string;
  points: string[];
  highlight: string;
}

export interface AnalysisData {
  intro: string;
  metaLogic?: MetaLogic;
  coreFramework: CoreFramework;
  sections: AnalysisSection[];
  methodology?: Methodology;
  keyInsight?: KeyInsight;
  summary: string;
}