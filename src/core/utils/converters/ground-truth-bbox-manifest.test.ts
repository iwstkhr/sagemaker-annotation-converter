import { SMJumpstartODAnnotation } from '@/core/models/sm-jumpstart-od-annotation';
import { FromSMJumpstartODAnnotation } from '@/core/utils/converters/ground-truth-bbox-manifest';

describe('core/utils/converters/ground-truth-bbox-manifest', () => {
  describe('FromSMJumpstartODAnnotation', () => {
    let data: SMJumpstartODAnnotation;

    beforeEach(() => {
      data = JSON.parse(`{
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
          },
          {
            "image_id": 1,
            "bbox": [100, 110, 120, 130],
            "category_id": "Product3"
          }
        ]
      }`);

      jest.useFakeTimers().setSystemTime(new Date('2023-01-02 12:34:56'));
    });

    it('constructor', () => {
      const converter = new FromSMJumpstartODAnnotation(data);
      expect(converter['categories']).toEqual([
        { category_id: 'Product1', image_id: 0 },
        { category_id: 'Product2', image_id: 1 },
        { category_id: 'Product3', image_id: 1 },
      ]);
    });

    it('convert', () => {
      const result = new FromSMJumpstartODAnnotation(data).convert();
      expect(result).toEqual([
        {
          'source-ref': 's3://<YOUR_BUCKET>/<PATH>/<TO>/<IMAGES>/image1.jpg',
          job: {
            image_size: [{ width: 800, height: 600, depth: 3 }],
            annotations: [
              { class_id: 0, left: 10, top: 20, width: 30 - 10, height: 40 - 20 },
            ],
          },
          jobMetadata: {
            objects: [{ confidence: 1 }],
            'class-map': { '0': 'Product1' },
            type: 'groundtruth/object-detection',
            'human-annotated': undefined,
            'creation-date': new Date().toISOString(),
            'job-name': '<YOUR_JOB>',
          },
        },
        {
          'source-ref': 's3://<YOUR_BUCKET>/<PATH>/<TO>/<IMAGES>/image2.jpg',
          job: {
            image_size: [{ width: 600, height: 400, depth: 3 }],
            annotations: [
              { class_id: 0, left: 50, top: 60, width: 70 - 50, height: 80 - 60 },
              { class_id: 1, left: 100, top: 110, width: 120 - 100, height: 130 - 110 },
            ],
          },
          jobMetadata: {
            objects: [{ confidence: 1 }, { confidence: 1 }],
            'class-map': { '0': 'Product2', '1': 'Product3' },
            type: 'groundtruth/object-detection',
            'human-annotated': undefined,
            'creation-date': new Date().toISOString(),
            'job-name': '<YOUR_JOB>',
          },
        },
      ]);
    });

    it('toSourceRef', () => {
      const result = new FromSMJumpstartODAnnotation(data).toSourceRef(data.images[0]);
      expect(result).toBe('s3://<YOUR_BUCKET>/<PATH>/<TO>/<IMAGES>/image1.jpg');
    });

    it('toJob', () => {
      const result = new FromSMJumpstartODAnnotation(data).toJob(data.images[0]);
      expect(result).toEqual({
        image_size: [{ width: 800, height: 600, depth: 3 }],
        annotations: [
          { class_id: 0, left: 10, top: 20, width: 30 - 10, height: 40 - 20 },
        ],
      });
    });

    it('toJobMetadata', () => {
      const result = new FromSMJumpstartODAnnotation(data).toJobMetadata(data.images[0]);
      expect(result).toEqual({
        objects: [{ confidence: 1 }],
        'class-map': { '0': 'Product1' },
        type: 'groundtruth/object-detection',
        'human-annotated': undefined,
        'creation-date': new Date().toISOString(),
        'job-name': '<YOUR_JOB>',
      });
    });
  });
});
