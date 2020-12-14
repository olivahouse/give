import { Fragment, useState } from 'react';
import { Button, Paragraph, SmallPrint } from '@olivahouse/ui';
import { loadStripe } from '@stripe/stripe-js';
import { parse } from 'query-string';

import '@olivahouse/ui/lib/styles.css';

import styles from './styles.module.css';

import { Tooltip } from './Tooltip';
import { Quote } from './Quote';

const isProduction = !window.location.href.includes('localhost');

const STRIPE_PUBLC_API_KEY = isProduction
  ? 'pk_live_51HYpBBIC0gTe0BTt1h2esyxTioSzPbrMk4vRFtV8OL8XCR0obV2Ieo18Ozw1PZoCfAtqfEAPQA2xXHeCz7mWKTqQ002QJbMlee'
  : 'pk_test_51HYpBBIC0gTe0BTtZkET4e30h4PpAgB23MVqHvN9ffoYg2oAsu1HI7QfTOuLWwUhpgOcd8oeZ6CVFcVjU4QmS28Z006bgCey7P';
const STRIPE_PRICE_ID = isProduction
  ? 'price_1HyHgOIC0gTe0BTtBuLkv2Up'
  : 'price_1HyHC6IC0gTe0BTts6l9Dact';

const stripePromise = loadStripe(STRIPE_PUBLC_API_KEY);

const { result } = parse(window.location.search);

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = async (event) => {

    if (!isChecked) {
      setIsError(true);
      return;
    }

    setIsLoading(true);
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: STRIPE_PRICE_ID,
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}?result=success`,
      cancelUrl: window.location.origin,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      setIsLoading(false);
    }
  };

  const handleChangeCheckbox = ({ target }) => {
    setIsChecked(!isChecked);
    setIsError(false);
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.leftPane}>
        <div className={styles.content}>
          {result === 'success'
            ? <a href="https://oliva.health"><img alt="logo" src="https://oliva-static-assets.s3.amazonaws.com/5f4625e7bfab83f32de77fe9_Oliva-logo-svg.svg" /></a>
            : <Quote />
          }
        </div>
      </div>
      <div className={styles.rightPane}>
        <div className={styles.content}>
          {result === 'success'
            ? <Fragment>
                <div className={styles.success}>
                  <Paragraph>Thanks!</Paragraph>
                  <Paragraph>Your payment was successful. We just emailed you a receipt.</Paragraph>
                  <Paragraph>You'll receive your festive gift card within 2 working days and before Dec 24th.</Paragraph>
                  <img alt="success" src="https://oliva-static-assets.s3.amazonaws.com/Communication.png"/>
                  <Paragraph>Happy new year for 2021.<br/> We all need it.</Paragraph>
                </div>
                <a className={styles.homeLink} href="https://oliva.health">
                  <img src="https://oliva-static-assets.s3.amazonaws.com/5fae958234933b025f2fe5c5_logo-oliva.svg" />
                </a>
              </Fragment>
            : <Fragment>
                <div className={styles.verticalSpacer}/>
                <Quote />
                <h2 className={styles.heading}>How it works:</h2>
                <div className={styles.list}>
                  <div>
                    <h2>1</h2>
                    <Paragraph>We'll send you a beautiful, festive gift card with a unique code. You can print or forward it to your friend or loved one.</Paragraph>
                  </div>
                  <div>
                    <h2>2</h2>
                    <Paragraph>
                      They can use the code to book their first session from January 1st. They'll start with a{' '}
                      <Tooltip content="The goal of the matching session is to find your friend the right therapist">
                        matching session
                      </Tooltip>
                      , then they'll have two one-hour therapy sessions via video call.
                    </Paragraph>
                  </div>
                  <div>
                    <h2>3</h2>
                    <Paragraph>Processing 2020 becomes much easier.</Paragraph>
                  </div>
                </div>
                <div className={styles.checkbox}>
                  <input name="legal" type="checkbox" checked={isChecked} onChange={handleChangeCheckbox} />
                  <SmallPrint>
                    I agree to the{' '}
                    <Tooltip content={
                      <Fragment>
                        <SmallPrint>Recipients must be 18 years or older to receive therapy from Oliva.</SmallPrint>
                        <SmallPrint>Offer valid for the UK and EU only.</SmallPrint>
                        <SmallPrint>Oliva is not suitable for people in a crisis. Please see our website for helplines.</SmallPrint>
                        <SmallPrint>Therapy sessions from this offer must be redeemed by March 31st 2021.</SmallPrint>
                      </Fragment>
                    }>
                      terms of the offer
                    </Tooltip>
                  </SmallPrint>
                  {isError && <div className={styles.errorMessage}><SmallPrint>We need you to agree to the terms.</SmallPrint></div>}
                </div>
                <Button isLoading={isLoading} role="link" onClick={handleClick}>
                  Gift 3 sessions for £150
                </Button>
                <div className={styles.verticalSpacer}/>
              </Fragment>
          }
        </div>
      </div>
      {isProduction ? null : <div className={styles.testBanner}>Test mode</div>}
    </div>
  );
}

export default App;
