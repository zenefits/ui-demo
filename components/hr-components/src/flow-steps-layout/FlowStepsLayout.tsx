import React, { StatelessComponent } from 'react';

import { Box, Flex } from 'zbase';
import { NavBar } from 'z-frontend-layout';
import { Hide } from 'z-frontend-theme';

interface FlowStepsLayoutProps {
  steps: {
    url: string;
    text: string;
    disabled?: boolean;
  }[];
}

const FlowStepsLayout: StatelessComponent<FlowStepsLayoutProps> = props => {
  // Accumulating the disabled state. e.g. if step 1 is disabled, step 2 should be disabled too.
  const steps = props.steps.map((step, idx, accumulatedSteps) => ({
    ...step,
    disabled: accumulatedSteps[idx - 1]?.disabled || step.disabled,
  }));

  return (
    <Flex wrap>
      <Hide forBreakpoints={[true]}>
        <Box w={[1, 1 / 4, 1 / 4, 1 / 6]}>
          <NavBar mode="side" useMobileDropdown={false}>
            {steps.map(step => (
              <Box key={step.url}>
                <NavBar.RouterNavLink to={step.url} disabled={step.disabled}>
                  {step.text}
                </NavBar.RouterNavLink>
              </Box>
            ))}
          </NavBar>
        </Box>
      </Hide>
      <Box w={[1, 3 / 4, 3 / 4, 2 / 3]}>{props.children}</Box>
    </Flex>
  );
};

export default FlowStepsLayout;
