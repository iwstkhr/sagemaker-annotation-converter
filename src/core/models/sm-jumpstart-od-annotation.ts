export type SMJumpstartODAnnotationImage = {
  id: number;
  file_name: string;
  width: number;
  height: number;
};

export type SMJumpstartODAnnotationAnnotation = {
  image_id: number;
  bbox: number[];
  category_id: string | number;
};

export type SMJumpstartODAnnotation = {
  images: SMJumpstartODAnnotationImage[];
  annotations: SMJumpstartODAnnotationAnnotation[];
};
