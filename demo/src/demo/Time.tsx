import React, { useState } from 'react';
import { DemoPage, DemoSection, LangSwitcher } from '../components';
import { Time, LocaleProvider } from '../../../src';

const now = Date.now();
const MS_A_DAY = 24 * 60 * 60 * 1000;
const MS_A_WEEK = MS_A_DAY * 7;

export default () => {
  const [lang, setLang] = useState('en-US');

  return (
    <DemoPage>
      <DemoSection title="Basic usage">
        <LangSwitcher value={lang} onChange={setLang} />
        <LocaleProvider locale={lang}>
          <p>
            <span>Now: </span>
            <Time date={now} />
          </p>
          <p>
            <span>Just now </span>
            <Time date={now - 120000} />
          </p>
          <p>
            <span>yesterday </span>
            <Time date={now - MS_A_DAY} />
          </p>
          <p>
            <span>the day before yesterday </span>
            <Time date={now - MS_A_DAY * 2} />
          </p>
          <p>
            <span>two weeks ago </span>
            <Time date={now - MS_A_WEEK * 2} />
          </p>
        </LocaleProvider>
      </DemoSection>
    </DemoPage>
  );
};
