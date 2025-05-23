// Export file renderers
export { CsvRenderer } from './csv-renderer';
export { MarkdownRenderer } from './markdown-renderer';
export { GenericFileRenderer } from './generic-file-renderer';

// File type utilities
export type FileType =
  | 'image'
  | 'code'
  | 'text'
  | 'pdf'
  | 'audio'
  | 'video'
  | 'spreadsheet'
  | 'archive'
  | 'database'
  | 'markdown'
  | 'csv'
  | 'other';

// Get file type from extension
export function getFileTypeFromExtension(filename: string): FileType {
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) return 'image';
  if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'py', 'java', 'c', 'cpp'].includes(ext)) return 'code';
  if (['txt', 'log', 'env'].includes(ext)) return 'text';
  if (['md', 'markdown'].includes(ext)) return 'markdown';
  if (ext === 'pdf') return 'pdf';
  if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) return 'audio';
  if (['mp4', 'webm', 'mov', 'avi'].includes(ext)) return 'video';
  if (['csv', 'tsv'].includes(ext)) return 'csv';
  if (['xls', 'xlsx'].includes(ext)) return 'spreadsheet';
  if (['zip', 'rar', 'tar', 'gz'].includes(ext)) return 'archive';
  if (['db', 'sqlite', 'sql'].includes(ext)) return 'database';

  return 'other';
}

// Generic file renderer interface
export interface FileRenderer {
  content: string;
  previewUrl?: string;
  className?: string;
  project?: any;
}
