import React from 'react';
import { DemoPage, DemoSection } from '../components';
import { Loading } from '../../../src';

export default () => (
  <DemoPage>
    <DemoSection title="Basic usage">
      <Loading />
    </DemoSection>
    <DemoSection title="加载文案">
      <Loading tip="加载中..." />
    </DemoSection>
  </DemoPage>
);
