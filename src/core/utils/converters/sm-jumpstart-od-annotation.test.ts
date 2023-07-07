import { GroundTruthBBoxManifest } from '@/core/models/ground-truth-bbox-manifest';
import { FromGroundTruthBBoxManifest } from '@/core/utils/converters/sm-jumpstart-od-annotation';

describe('core/utils/converters/sm-jumpstart-od-annotation', () => {
  describe('FromSMJumpstartODAnnotation', () => {
    let data: GroundTruthBBoxManifest[];

    beforeEach(() => {
      const text = '{"source-ref": "s3://bucket/path/to/images/image1.jpg", "job": {"image_size": [{"width": 800, "height": 600, "depth": 3}], "annotations": [{"class_id": 0, "left": 10, "top": 20, "width": 30, "height": 40}, {"class_id": 1, "left": 50, "top": 60, "width": 70, "height": 80}]}, "job-metadata": {"objects": [{"confidence": 0}, {"confidence": 0}], "class-map": {"0": "ProductA", "1": "ProductB"}, "type": "groundtruth/object-detection", "human-annotated": "yes", "creation-date": "2023-01-02T12:34:56.123456", "job-name": "labeling-job/job"}}\n'
        + '{"source-ref": "s3://bucket/path/to/images/image2.jpg", "job": {"image_size": [{"width": 600, "height": 400, "depth": 3}], "annotations": [{"class_id": 0, "left": 100, "top": 110, "width": 120, "height": 130}, {"class_id": 1, "left": 140, "top": 150, "width": 160, "height": 170}]}, "job-metadata": {"objects": [{"confidence": 0}, {"confidence": 0}], "class-map": {"0": "ProductC", "1": "ProductD"}, "type": "groundtruth/object-detection", "human-annotated": "yes", "creation-date": "2023-01-02T12:34:56.123456", "job-name": "labeling-job/job"}}\n';
      data = text.split('\n').filter(_ => !!_).map(_ => JSON.parse(_));
    });

    it('convert', () => {
      const result = new FromGroundTruthBBoxManifest(data).convert();
      expect(result).toEqual({
        images: [
          {
            id: 0,
            file_name: 'image1.jpg',
            width: 800,
            height: 600,
          },
          {
            id: 1,
            file_name: 'image2.jpg',
            width: 600,
            height: 400,
          },
        ],
        annotations: [
          { image_id: 0, bbox: [10, 20, 30 + 10, 40 + 20], category_id: 'ProductA' },
          { image_id: 0, bbox: [50, 60, 70 + 50, 80 + 60], category_id: 'ProductB' },
          { image_id: 1, bbox: [100, 110, 120 + 100, 130 + 110], category_id: 'ProductC' },
          { image_id: 1, bbox: [140, 150, 160 + 140, 170 + 150], category_id: 'ProductD' },
        ],
      });
    });

    it('toImages', () => {
      const result = new FromGroundTruthBBoxManifest(data).toImages(data[0], 0);
      expect(result).toEqual([
        {
          id: 0,
          file_name: 'image1.jpg',
          width: 800,
          height: 600,
        },
      ]);
    });

    it('toAnnotations', () => {
      const result = new FromGroundTruthBBoxManifest(data).toAnnotations(data[0], 0);
      expect(result).toEqual([
        { image_id: 0, bbox: [10, 20, 30 + 10, 40 + 20], category_id: 'ProductA' },
        { image_id: 0, bbox: [50, 60, 70 + 50, 80 + 60], category_id: 'ProductB' },
      ]);
    });

    it('getJob', () => {
      const result = new FromGroundTruthBBoxManifest(data)['getJob'](data[0]);
      expect(result).toEqual(data[0].job);
    });

    it('getMetadata', () => {
      const result = new FromGroundTruthBBoxManifest(data)['getMetadata'](data[0]);
      expect(result).toEqual(data[0]['job-metadata']);
    });
  });
});
