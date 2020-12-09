import { Fragment } from 'react';
import { Button, Paragraph } from '@olivahouse/ui';
import { loadStripe } from '@stripe/stripe-js';
import { parse } from 'query-string';

import '@olivahouse/ui/lib/styles.css';

import styles from './styles.module.css';

import { Quote } from './Quote';

// const isProduction = !window.location.href.includes('localhost');
const isProduction = false;

const STRIPE_PUBLC_API_KEY = isProduction
  ? 'pk_live_51HYpBBIC0gTe0BTt1h2esyxTioSzPbrMk4vRFtV8OL8XCR0obV2Ieo18Ozw1PZoCfAtqfEAPQA2xXHeCz7mWKTqQ002QJbMlee'
  : 'pk_test_51HYpBBIC0gTe0BTtZkET4e30h4PpAgB23MVqHvN9ffoYg2oAsu1HI7QfTOuLWwUhpgOcd8oeZ6CVFcVjU4QmS28Z006bgCey7P';
const STRIPE_PRODUCT_ID = isProduction
  ? 'price_1Hw4AdIC0gTe0BTt0ryp1H41'
  : 'price_1Hw4cNIC0gTe0BTth8yw42hB';

const stripePromise = loadStripe(STRIPE_PUBLC_API_KEY);

const { result } = parse(window.location.search);

const App = () => {

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: STRIPE_PRODUCT_ID,
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}?result=success`,
      cancelUrl: window.location.origin,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
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
                  <Paragraph>You'll receive your festive gift card in the next few days.</Paragraph>
                  <img alt="success" src="https://oliva-static-assets.s3.amazonaws.com/Communication.png"/>
                  <Paragraph>Happy new year for 2021.<br/> We all need it.</Paragraph>
                </div>
                <a className={styles.homeLink} href="https://oliva.health">
                  <img src="https://oliva-static-assets.s3.amazonaws.com/5fae958234933b025f2fe5c5_logo-oliva.svg" />
                </a>
              </Fragment>
            : <Fragment>
                <div className={styles.verticalSpacer}/>
                <Paragraph>Here's how it works</Paragraph>
                <div className={styles.list}>
                  <div>
                    <h2>1</h2>
                    <Paragraph>We'll send you a beautiful, festive gift card with a unique code. You can print or forward it to your friend or loved one.</Paragraph>
                  </div>
                  <div>
                    <h2>2</h2>
                    <Paragraph>
                      They can use the code to book their first session from January 1st. They'll start with a free{' '}
                      <span className={styles.toolTip}>
                        <span className={styles.trigger}>matching session</span>
                        <span className={styles.tipContent}></span>
                      </span>
                      , then they'll have three one-hour therapy sessions via video call.
                    </Paragraph>
                  </div>
                  <div>
                    <h2>3</h2>
                    <Paragraph>Processing 2020 becomes much easier.</Paragraph>
                  </div>
                </div>
                <Quote />
                <Button role="link" onClick={handleClick}>
                  Gift 3 therapy sessions for £200
                </Button>
              </Fragment>
          }
        </div>
      </div>
      {isProduction ? null : <div className={styles.testBanner}>Test mode</div>}
    </div>
  );
}

export default App;
