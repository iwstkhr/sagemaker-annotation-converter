export type GroundTruthBBoxManifestJob = {
  image_size: {
    width: number;
    height: number;
    depth: number;
  }[];
  annotations: {
    class_id: number;
    left: number;
    top: number;
    width: number;
    height: number;
  }[];
};

export type GroundTruthBBoxManifestMetadata = {
  objects: { confidence: number }[];
  'class-map': { [key: string]: string };
  type: 'groundtruth/object-detection';
  'human-annotated': 'yes' | 'no' | undefined;
  'creation-date': string;
  'job-name': string;
};

export type GroundTruthBBoxManifest = {
  'source-ref': string;
  [key: string]: string | GroundTruthBBoxManifestJob | GroundTruthBBoxManifestMetadata;
};
