declare module "*.svelte";

declare interface MouseEvent {
  target: HTMLBaseElement;
}

declare interface IFile {
  type: "directory" | "file" | "link" | "unknown";
  hard_links: number;
  owner: string;
  group: string;
  size: number;
  last_modification_date: string;
  last_modification_hour: string;
  file_name: string;
  link_to?: string;
}

declare interface IPreview {
  type: string;
  body: string;
}
