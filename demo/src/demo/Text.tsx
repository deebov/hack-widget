import React from 'react';
import { DemoPage, DemoSection } from '../components';
import { Text } from '../../../src';

export default () => (
  <DemoPage>
    <DemoSection title="Basic usage">
      <Text>text content</Text>
    </DemoSection>
    <DemoSection title="single line display">
      <Text truncate>This is a very very very very very very long text</Text>
    </DemoSection>
    <DemoSection title="Display on multiple lines">
      <Text truncate={2}>
        This is a very very very very very very very very very very very very very very very very
        very very very very very very very very very long text
      </Text>
    </DemoSection>
    <DemoSection title="word wrap">
      <Text breakWord>ThisIsVeryVeryVeryVeryVeryVeryVeryLongEnglishWord</Text>
    </DemoSection>
  </DemoPage>
);
