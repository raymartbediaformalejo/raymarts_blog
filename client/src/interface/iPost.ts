import { Topic } from "./ITopic";

export interface iPost {
  category: string | null;
  topic: Topic[];
  title: string;
  summary: string;
  coverPhoto: string;
  isFeatured: boolean;
  content: string;
  status?: string;
  visibility: string;
}
