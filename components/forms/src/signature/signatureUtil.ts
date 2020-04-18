import { IPointGroup } from 'signature_pad';

export function validateSignature(signaturePadData: IPointGroup[], canvasWidth: number, canvasHeight: number): boolean {
  // match Ember version https://github.com/zenefits/z-signature/blob/51115fc120982fc9fa2ad5b73c7bde4e6a46915c/vendor/jquery.signaturepad.js#L733
  if (!canvasWidth || !canvasHeight) {
    return false;
  }
  if (!signaturePadData || signaturePadData.length === 0) {
    return false;
  }

  const coverage = getSignatureCoverage(signaturePadData, canvasWidth, canvasHeight);
  // require at least 10% in both axis
  if (coverage.x < 0.1 || coverage.y < 0.1) {
    return false;
  }

  // require at least one over 25%
  if (coverage.x < 0.25 && coverage.y < 0.25) return false;

  const signatureLength = estimateSignatureLength(signaturePadData);
  return signatureLength >= 300;
}

export function getSignatureCoverage(signaturePadData: IPointGroup[], canvasWidth: number, canvasHeight: number) {
  const firstPoint = signaturePadData[0].points[0];

  let minX = firstPoint.x;
  let maxX = firstPoint.x;
  let minY = firstPoint.y;
  let maxY = firstPoint.y;
  signaturePadData.forEach(pointGroup => {
    pointGroup.points.forEach(point => {
      minX = Math.min(point.x, minX);
      minY = Math.min(point.y, minY);
      maxX = Math.max(point.x, maxX);
      maxY = Math.max(point.y, maxY);
    });
  });

  // percent of signature pad covered by signature
  const coverageX = (maxX - minX) / canvasWidth;
  const coverageY = (maxY - minY) / canvasHeight;

  return { x: coverageX, y: coverageY };
}

export function estimateSignatureLength(signaturePadData: IPointGroup[]): number {
  let signaturePixelLength = 0;

  signaturePadData.forEach(pointGroup => {
    const { points } = pointGroup;
    for (let i = 0; i < points.length; i += 1) {
      if (!points[i + 1]) break;

      const deltaX = Math.abs(points[i + 1].x - points[i].x);
      const deltaY = Math.abs(points[i + 1].y - points[i].y);
      signaturePixelLength += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  });

  return signaturePixelLength;
}
