export type MimeType =
  | 'video/mp4' | 'image/gif' | 'text/plain' | 'text/html'
  | 'text/css' | 'text/javascript' | 'audio/midi' | 'audio/mpeg'
  | 'audio/webm' | 'audio/ogg' | 'audio/wav' | 'video/webm'
  | 'video/ogg' | 'audio/aac' | 'application/x-abiword' | 'application/x-freearc'
  | 'image/avif' | 'video/x-msvideo' | 'application/vnd.amazon.ebook' | 'application/octet-stream'
  | 'image/bmp' | 'application/x-bzip' | 'application/x-bzip2' | 'application/x-cdf' | 'application/x-csh'
  | 'text/css' | 'text/csv' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-fontobject' | 'application/epub+zip' | 'application/gzip' | 'image/vnd.microsoft.icon'
  | 'text/calendar' | 'application/java-archive' | 'image/jpeg' | 'application/json'
  | 'application/ld+json' | 'audio/x-midi' | 'video/mpeg' | 'application/vnd.apple.installer+xml'
  | 'application/vnd.oasis.opendocument.presentation' | 'application/vnd.oasis.opendocument.spreadsheet'
  | 'application/vnd.oasis.opendocument.text' | 'application/ogg' | 'audio/opus' | 'font/otf'
  | 'image/png' | 'application/pdf' | 'application/x-httpd-php' | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/vnd.rar'
  | 'application/rtf' | 'application/x-sh' | 'image/svg+xml' | 'application/x-tar' | 'image/tiff'
  | 'video/mp2t' | 'font/ttf' | 'application/vnd.visio' | 'image/webp' | 'font/woff' | 'font/woff2'
  | 'application/xhtml+xml' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.mozilla.xul+xml' | 'application/zip' | 'video/3gpp' | 'audio/3gpp' | 'video/3gpp2' | 'audio/3gpp2'
  | 'application/x-7z-compressed'

export interface PythonResultPrediction {
  best_class: string,
  best_probability: number,
  name: string,
  bbox: number[]
}

export interface PythonResult {
  file: string,
  prediction: PythonResultPrediction[],
  annotated_filename: string,
  mv_filename: string
}