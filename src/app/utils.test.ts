import { toGroundTruthBBoxManifest, toSMJumpStartODAnnotation } from '@/app/utils';
import { FromSMJumpstartODAnnotation } from '@/core/utils/converters/ground-truth-bbox-manifest';
import { FromGroundTruthBBoxManifest } from '@/core/utils/converters/sm-jumpstart-od-annotation';

jest.mock('@/core/utils/converters/ground-truth-bbox-manifest');
jest.mock('@/core/utils/converters/sm-jumpstart-od-annotation');

describe('app/utils', () => {
  it('toGroundTruthBBoxManifest - success', () => {
    // Mock
    jest.spyOn(FromSMJumpstartODAnnotation.prototype, 'convert').mockReturnValue([]);

    // Execute
    const text = `
      {
        "images": [
          {
            "id": 0,
            "file_name": "image1.jpg",
            "width": 800,
            "height": 600
          },
          {
            "id": 1,
            "file_name": "image2.jpg",
            "width": 600,
            "height": 400
          }
        ],
        "annotations": [
          {
            "image_id": 0,
            "bbox": [10, 20, 30, 40],
            "category_id": "Product1"
          },
          {
            "image_id": 1,
            "bbox": [50, 60, 70, 80],
            "category_id": "Product2"
          }
        ]
      }
    `;
    toGroundTruthBBoxManifest(text);

    // Assert
    const data = JSON.parse(text);
    expect(FromSMJumpstartODAnnotation).toBeCalledWith(data);
  });

  it('toGroundTruthBBoxManifest - error', () => {
    // Execute
    const text = 'test';
    // Assert
    expect(() => toGroundTruthBBoxManifest(text)).toThrow(Error);
  });

  it('toSMJumpStartODAnnotation - success', () => {
    // Mock
    jest.spyOn(FromGroundTruthBBoxManifest.prototype, 'convert').mockReturnValue({} as any);

    // Execute
    const text = '{"source-ref": "s3://bucket/path/to/images/image1.jpg", "job": {"image_size": [{"width": 800, "height": 600, "depth": 3}], "annotations": [{"class_id": 0, "left": 10, "top": 20, "width": 30, "height": 40}, {"class_id": 1, "left": 50, "top": 60, "width": 70, "height": 80}]}, "job-metadata": {"objects": [{"confidence": 0}, {"confidence": 0}], "class-map": {"0": "ProductA", "1": "ProductB"}, "type": "groundtruth/object-detection", "human-annotated": "yes", "creation-date": "2023-01-02T12:34:56.123456", "job-name": "labeling-job/job"}}\n'
      + '{"source-ref": "s3://bucket/path/to/images/image2.jpg", "job": {"image_size": [{"width": 600, "height": 400, "depth": 3}], "annotations": [{"class_id": 0, "left": 100, "top": 110, "width": 120, "height": 130}, {"class_id": 1, "left": 140, "top": 150, "width": 160, "height": 170}]}, "job-metadata": {"objects": [{"confidence": 0}, {"confidence": 0}], "class-map": {"0": "ProductC", "1": "ProductD"}, "type": "groundtruth/object-detection", "human-annotated": "yes", "creation-date": "2023-01-02T12:34:56.123456", "job-name": "labeling-job/job"}}\n';
    toSMJumpStartODAnnotation(text);

    // Assert
    const data = text.split('\n').filter(_ => !!_).map(_ => JSON.parse(_));
    expect(FromGroundTruthBBoxManifest).toBeCalledWith(data);
  });

  it('toSMJumpStartODAnnotation - error', () => {
    // Execute
    const text = 'test';
    // Assert
    expect(() => toSMJumpStartODAnnotation(text)).toThrow(Error);
  });
});
