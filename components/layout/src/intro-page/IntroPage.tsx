import React from 'react';

import { Box, BoxProps } from 'zbase';

import ValuePropositionSection from './components/ValuePropositionSection';
import FeaturesListSection from './components/FeaturesListSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import ProductPreviewSection from './components/ProductPreviewSection';
import PricingInfoSection from './components/PricingInfoSection';
import PricingPlanSection from './components/PricingPlanSection';
import VideoSection from './components/VideoSection';
import ProductFeaturePreview from './components/ProductFeaturePreview';

export { PricingInfoType } from './components/PricingInfo';

/**
 * A component for product intro/landing pages.
 */
export default class IntroPage extends React.Component<BoxProps> {
  static ValuePropositionSection = ValuePropositionSection;

  static FeaturesSection = FeaturesSection;

  static FeaturesListSection = FeaturesListSection;

  static HowItWorksSection = HowItWorksSection;

  static ProductPreviewSection = ProductPreviewSection;

  static ProductFeaturePreview = ProductFeaturePreview;

  static PricingInfoSection = PricingInfoSection;

  static PricingPlanSection = PricingPlanSection;

  static VideoSection = VideoSection;

  render() {
    return <Box bg="grayscale.white" {...this.props} />;
  }
}
