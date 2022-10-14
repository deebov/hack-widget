import React from 'react';
import { DemoPage, DemoSection } from '../components';
import { Card, List, ListItem, toast } from '../../../src';

export default () => (
  <DemoPage>
    <DemoSection title="Basic usage">
      <Card>
        <List>
          <ListItem
            content="text prompt"
            as="button"
            onClick={() => {
              toast.show('Tips', '');
            }}
            rightIcon="chevron-right"
          />
          <ListItem
            content="success tips"
            as="button"
            onClick={() => {
              toast.success('Successful operation');
            }}
            rightIcon="chevron-right"
          />
          <ListItem
            content="failure prompt"
            as="button"
            onClick={() => {
              toast.fail('operation failed');
            }}
            rightIcon="chevron-right"
          />
          <ListItem
            content="loading prompt"
            as="button"
            onClick={() => {
              toast.loading('Loading...', -1);
            }}
            rightIcon="chevron-right"
          />
          <ListItem
            content="long copy"
            as="button"
            onClick={() => {
              toast.success(
                "I'm glad to help your copy, to your copy, to your copy, to your copy, to your copy",
              );
            }}
            rightIcon="chevron-right"
          />
        </List>
      </Card>
    </DemoSection>
  </DemoPage>
);
