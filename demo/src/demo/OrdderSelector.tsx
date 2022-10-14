import React, { useState } from 'react';
import { Popup, Card, Goods, Tabs, Tab, Button, Search, Confirm } from '../../../src';

export default () => {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Popup
      className="OrdderSelector"
      active={active}
      onClose={() => {
        setActive(false);
      }}
      title="Please select the order you want to consult"
      actions={[{ label: 'no corresponding order' }]}
    >
      <div>
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <Tab label="bought">
            <div>
              <Search
                placeholder="Enter baby keywords, etc."
                onSearch={(q) => {
                  console.log(q);
                }}
                onClear={() => {
                  console.log('cancel');
                }}
              />
              <Card className="OrderGroup">
                <div className="OrderGroup-header">
                  <h3>Nike's official flagship store has the largest number of words...</h3>
                  <span className="OrderGroup-status">trading status</span>
                </div>
                <div className="OrderGroup-list">
                  <Goods
                    type="order"
                    img="//gw.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png"
                    name="Air Joden 2019 limited barb brown high-top basketball shoes with the most words…"
                    desc="Color classification: brown; 42 yards"
                    currency="¥"
                    price={30000.04}
                    count={1}
                    onClick={() => {
                      setOpen(true);
                    }}
                  />
                </div>
                <div className="OrderGroup-actions">
                  <Button size="sm">order details</Button>
                  <Button color="primary" size="sm">
                    send
                  </Button>
                </div>
              </Card>
            </div>
          </Tab>
          <Tab label="shopping cart">
            <p>Content 2</p>
          </Tab>
          <Tab label="Favorites">
            <p>Content 3</p>
          </Tab>
          <Tab label="footprint">
            <p>Content 4</p>
          </Tab>
        </Tabs>
        <Confirm
          active={open}
          title="Are you sure you want to send?"
          onClose={() => {
            setOpen(false);
          }}
          actions={[
            {
              label: 'confirm',
              color: 'primary',
            },
            {
              label: 'Cancel',
            },
          ]}
        >
          <div>Content 1</div>
        </Confirm>
      </div>
    </Popup>
  );
};
