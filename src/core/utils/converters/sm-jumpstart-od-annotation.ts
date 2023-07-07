import {
  GroundTruthBBoxManifest,
  GroundTruthBBoxManifestJob,
  GroundTruthBBoxManifestMetadata
} from '@/core/models/ground-truth-bbox-manifest';
import {
  SMJumpstartODAnnotation,
  SMJumpstartODAnnotationAnnotation,
  SMJumpstartODAnnotationImage
} from '@/core/models/sm-jumpstart-od-annotation';

export class FromGroundTruthBBoxManifest {
  readonly data: GroundTruthBBoxManifest[];

  constructor(data: GroundTruthBBoxManifest[]) {
    this.data = data;
  }

  convert(): SMJumpstartODAnnotation {
    const initial = { images: [], annotations: [] } as SMJumpstartODAnnotation;
    return this.data.reduce((prev, cur, index) => {
      prev.images = prev.images.concat(this.toImages(cur, index));
      prev.annotations = prev.annotations.concat(this.toAnnotations(cur, index));
      return prev;
    }, initial);
  }

  toImages(data: GroundTruthBBoxManifest, index: number): SMJumpstartODAnnotationImage[] {
    const imageSize = this.getJob(data).image_size[0];
    return [
      {
        id: index,
        file_name: data['source-ref'].split('/').at(-1) as string,
        width: imageSize.width,
        height: imageSize.height,
      }
    ];
  }

  toAnnotations(data: GroundTruthBBoxManifest, index: number): SMJumpstartODAnnotationAnnotation[] {
    const annotations = this.getJob(data).annotations;
    const metadata = this.getMetadata(data);

    return annotations.map(annotation => {
      return {
        image_id: index,
        bbox: [annotation.left, annotation.top, annotation.left + annotation.width, annotation.top + annotation.height],
        category_id: metadata['class-map'][annotation.class_id.toString()],
      };
    });
  }

  private getJob(data: GroundTruthBBoxManifest): GroundTruthBBoxManifestJob {
    const key = Object.keys(data).filter(key => (data[key] as any).image_size)[0];
    return data[key] as GroundTruthBBoxManifestJob;
  }

  private getMetadata(data: GroundTruthBBoxManifest): GroundTruthBBoxManifestMetadata {
    const key = Object.keys(data).filter(key => (data[key] as any)['class-map'])[0];
    return data[key] as GroundTruthBBoxManifestMetadata;
  }
}
