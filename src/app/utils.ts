import { FromSMJumpstartODAnnotation } from '@/core/utils/converters/ground-truth-bbox-manifest';
import { FromGroundTruthBBoxManifest } from '@/core/utils/converters/sm-jumpstart-od-annotation';

export const toGroundTruthBBoxManifest = (text: string): string => {
  try {
    const data = JSON.parse(text);
    const manifests = new FromSMJumpstartODAnnotation(data).convert();
    return manifests.reduce((prev, cur) => prev + JSON.stringify(cur) + '\n', '');
  } catch (error) {
    throw error;
  }
};

export const toSMJumpStartODAnnotation = (text: string): string => {
  try {
    const data = text.split('\n').filter(_ => !!_).map(_ => JSON.parse(_));
    const annotation = new FromGroundTruthBBoxManifest(data).convert();
    return JSON.stringify(annotation);
  } catch (error) {
    throw error;
  }
};
