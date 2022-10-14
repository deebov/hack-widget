import React from 'react';
import { DemoPage, DemoSection } from '../components';
import { SystemMessage } from '../../../src';

export default () => (
  <DemoPage>
    <DemoSection title="Basic usage">
      <SystemMessage content="88VIP专属智能客服小蜜 为您服务" />
    </DemoSection>
  </DemoPage>
);
