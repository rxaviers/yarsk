import Globalize from 'globalize';
import React from 'react';
import Header from '../Header';
import { FormatMessage } from 'react-globalize';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

export default class Application extends React.Component {
  render() {
    return <div className={styles.main}>
      <div className={styles.wrap}>
        <Header />

        <main className={styles.body}>
          <p><FormatMessage>Seems like creating your own React starter kit is a right of passage. So, here's mine.</FormatMessage></p>
          <p>
            <FormatMessage
              elements={{
                globalize: <a href='https://github.com/jquery/globalize/'></a>,
                reactGlobalize: <a href='https://github.com/kborchers/react-globalize'></a>,
                yarsk: <a href='https://github.com/bradleyboy/yarsk#yarsk'></a>
              }}
            >
            For more information, see the [yarsk]Readme[/yarsk].
            </FormatMessage>
          </p>
          <p><FormatMessage variables={{ price: Globalize.formatCurrency(0, "USD") }}>
            Get all this for free {price}.
          </FormatMessage></p>
        </main>
      </div>
    </div>;
  }
}
