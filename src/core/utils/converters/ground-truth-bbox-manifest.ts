import {
  GroundTruthBBoxManifest,
  GroundTruthBBoxManifestJob,
  GroundTruthBBoxManifestMetadata
} from '@/core/models/ground-truth-bbox-manifest';
import { SMJumpstartODAnnotation, SMJumpstartODAnnotationImage } from '@/core/models/sm-jumpstart-od-annotation';

export class FromSMJumpstartODAnnotation {
  readonly data: SMJumpstartODAnnotation;
  private readonly categories: { category_id: string|number, image_id: number }[];

  constructor(data: SMJumpstartODAnnotation) {
    this.data = data;
    this.categories = this.data.annotations.map(annotation => {
      return { category_id: annotation.category_id, image_id: annotation.image_id };
    });
  }

  convert(): GroundTruthBBoxManifest[] {
    return this.data.images.map(image => {
      return {
        'source-ref': this.toSourceRef(image),
        job: this.toJob(image),
        jobMetadata: this.toJobMetadata(image),
      };
    });
  }

  toSourceRef(image: SMJumpstartODAnnotationImage): any {
    return 's3://<YOUR_BUCKET>/<PATH>/<TO>/<IMAGES>/' + image.file_name;
  }

  toJob(image: SMJumpstartODAnnotationImage): GroundTruthBBoxManifestJob {
    const annotations = this.data.annotations.filter(annotation => annotation.image_id === image.id);
    const categories = this.categories.filter(category => category.image_id === image.id);

    return {
      image_size: [{ width: image.width, height: image.height, depth: 3 }],
      annotations: annotations.map(annotation => ({
        class_id: categories.findIndex(category => category.category_id === annotation.category_id),
        left: annotation.bbox[0],
        top: annotation.bbox[1],
        width: annotation.bbox[2] - annotation.bbox[0],
        height: annotation.bbox[3] - annotation.bbox[1],
      })),
    };
  }

  toJobMetadata(image: SMJumpstartODAnnotationImage): GroundTruthBBoxManifestMetadata {
    const annotations = this.data.annotations.filter(annotation => annotation.image_id === image.id);
    const categories = this.categories.filter(category => category.image_id === image.id);

    const classMap = categories.reduce((prev, cur, index) => {
      return Object.assign(prev, { [index.toString()]: cur.category_id });
    }, {});

    return {
      objects: annotations.map(() => ({ confidence: 1 })),
      'class-map': classMap,
      type: 'groundtruth/object-detection',
      'human-annotated': undefined,
      'creation-date': new Date().toISOString(),
      'job-name': '<YOUR_JOB>',
    };
  }
}
