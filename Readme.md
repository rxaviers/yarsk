# React Example Using Globalize For Internationalization (using webpack)

This demo is built on top of the YARSK (Yet Another React Starter Kit) setup. For YARSK features and details, please see its README [here](https://github.com/bradleyboy/yarsk). In this README, the instructions and explanations focus in the i18n part using React Globalize.

This example assumes you're sold to React already and it focuses on the Globalize integration.

> Globalize is a JavaScript library for internationalization and localization that leverages the Unicode CLDR data. Its core principles are stability (runs in browsers and Node.js, consistently across all of them), flexibility (allows developers to load as much or as little data as they need; allows developers to load the i18n functionalities they need) and efficiency (generates precompiled production code for optimal speed and size).

> React-Globalize is an experimental JavaScript library that takes the power of Globalize and makes it React friendly. Its core principle is to allow declarative code. Simply specify your messages using ICU Messageformat syntax with plural and gender support and specify your formatters (numbers, currencies, datetimes, relative time) conveniently independent of the locale conventions and React-Globalize will do the rest. Our tooling automatically generates translation table and provides defaul language as fallback.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

> _[Globalize - jquery/globalize#fix-398-runtime](https://github.com/jquery/globalize/tree/fix-398-runtime)_

> _[ReactGlobalize - rxaviers/react-globalize#b0.3.0](https://github.com/rxaviers/react-globalize/tree/b0.3.0)_

> _[YARSK - bradleyboy/yarsk](https://github.com/bradleyboy/yarsk)_

> _[GlobalizeCompiler - jquery-support/globalize-compiler#b0.0.1](https://github.com/jquery-support/globalize-compiler/tree/b0.0.1)_

> _[ReactGlobalizeCompiler - rxaviers/react-globalize-compiler#b0.0.1](https://github.com/rxaviers/react-globalize-compiler/tree/b0.0.1)_

> _[GlobalizeWebpackPlugin - rxaviers/globalize-webpack-plugin#b0.0.1](https://github.com/rxaviers/globalize-webpack-plugin/tree/b0.0.1)_

> _[ReactGlobalizeWebpackPlugin - rxaviers/react-globalize-webpack-plugin#b0.0.1](https://github.com/rxaviers/react-globalize-webpack-plugin/tree/b0.0.1)_


## Goals

### Production

- Small. Avoid including unnecessary i18n data. For example, doesn't include unnecessary translation messages, doesn't include unnecessary functionality data (e.g., doesn't include calendar information if not formatting dates, doesn't include currency data if not formatting currencies, etc), doesn't include unnecessary data within the same functionality (e.g., doesn't include month names if formatting dates using numbered months only). Thefore, no bandwidth is wasted.
- Fast. Have all formatters (numbers, currencies, datetimes, relative time) generated/preprocessed at built time. This is, traversing CLDR data and generating the formatters will happen during build time and will be precompiled for runtime. Therefore, no CPU clocks are wasted on the client.
- Reliable. Runs in browsers (Chrome, Firefox, IE8 using ES5 shim, IE9+, Safari 5.1+, Opera 12.1, iOS 6.1+, Android 2.3, 4+) and Node.js, consistently across all of them.
- Up-to-date. Use the CLDR data of your preference (and have the runtime bundles built with them). For example, use the latest available CLDR (JSON format) directly from Unicode without having to wait for any pipeline on the Globalize project side or even use CLDR with your custom modifications.

### Development

- Declarative and disposable i18n code (in other words, React friendly code).
- Automatically generates (initialize and manage) the translation messages (JSON files with translation data).
- Doesn't require a build step on development. In other words, get fast live reload refreshs. Formatters are constructed on the fly (traversing CLDR data on demand). It also means that you can update the CLDR data version (or even customize it) and get live updates.

## Usage (development mode)

    npm install
    npm run start

***Declarative and disposable i18n code***

A regular (non-localized) message looks like `<p>Double-click to edit a todo</p>`. A localized message using Globalize (and ReactGlobalize) looks like this:

```js
<p><FormatMessage>Double-click to edit a todo</FormatMessage></p>
```

By default, the message itself is used as key for translation. But, obviously you want can use your own keys if you want to (not covered here).

Globalize supports ICU Message Format. So, yeap it supports pluralization and gender inflections. More details can be found at [jquery/globalize/doc/api/message](https://github.com/jquery/globalize/blob/master/doc/api/message/message-formatter.md).

```js
<FormatMessage variables={{count: this.props.count}}>{
  "{count, plural," +
  "  one {# item left}" +
  "other {# items left}" +
  "}"
}</FormatMessage>
```

When you need your localized message as a String rather than a React Element, use Globalize directly.

```diff
<input placeholder={Globalize.formatMessage("What needs to be done?")} />
```

When you need to include React Elements in your messages, use the pseudo `[empty-tag/]` or `[tag]content[/tag]`.

```js
<FormatMessage elements={{
  TodoMVC: <a href="http://todomvc.com">TodoMVC</a>
}}>
  Part of [TodoMVC/]
</FormatMessage>
```

*Disclosure*: It could be possible to deduce elements from a structure like `<FormatMessage>Part of <a href="http://todomvc.com">TodoMVC</a></FormatMessage>`, which is cleaner. Although, it would make ReactGlobalize code more complex.

***Automatically generates the translation messages***

The ReactGlobalize compiler statically parses the application code and generates translation messages like the below. *Disclosure*: The static parsers has been implemented. Although, the webpack plugin that uses it has not (work in progress).

```
Running "react-globalize" task
Generated `src/translations/en.json` using the default translation.
Populated the new fields of `src/translations/pt.json` using the default translation.
...
```

src/translations/en.json
```
{
  "en": {
    "Double-click to edit a todo": "Double-click to edit a todo"
  }
}
```

src/translations/pt.json
```
{
  "pt": {
    "Double-click to edit a todo": "Double-click to edit a todo"
  }
}
```

For the next example, let's suppose we had translated the `pt` message above and we have new code with new messages available. Re-running the ReactGlobalize tool to extract the messages will result in the below.

```
Running "react-globalize" task
Generated `src/translations/en.json` using the default translation.
Populated the new fields of `src/translations/pt.json` using the default translation.
...
```

src/translations/en.json
```
{
  "en": {
    "Double-click to edit a todo": "Double-click to edit a todo",
    "Part of [TodoMVC|]": "Part of [TodoMVC/]",
    "What needs to be done?": "What needs to be done?",
    "(count, plural, one (# item left) other (# items left) )": [
      "{count, plural,",
      "   one {# item left}",
      " other {# items left}",
      "}"
    ]
  }
}
```

src/translations/pt.json (only new messages are added)
```
{
  "pt": {
    "Double-click to edit a todo": "Clique duas vezes para editar uma tarefa",
    "Part of [TodoMVC|]": "Part of [TodoMVC/]",
    "What needs to be done?": "What needs to be done?",
    "(count, plural, one (# item left) other (# items left) )": [
      "{count, plural,",
      "   one {# item left}",
      " other {# items left}",
      "}"
    ]
  }
}
```

## Build (production mode)

    npm install
    npm run build

In this example, we've arranged the files as follows. But, obviously this could be arranged to best suite your needs. *Disclosure*: Changing the layout requires changing webpack configurations and tweaking globalize webpack plugin.

All external libraries have been bundled into `dist/vendor.[hash].js`, all application code has been bundled into `dist/app.[hash].js`, and all the necessary i18n formatters have been put into `dist/app-<locale>.[hash].js`. *Disclosure*: Currently, some Globalize Runtime modules are inside `dist/app.[hash].js` yet. They should be moved into `dist/vendor.[hash].js` as well.

    dist/
    ├── index.html
    ├── app.[hash].js (application code)
    ├── app-en.[hash].js (extra application code for English - configured as the default locale)
    ├── app-ar.[hash].js (extra application code for Arabic)
    │   ...
    ├── app-zh.[hash].js (extra application code for Chinese)
    ├── app-zh-TW.[hash].js (extra application code for Chinese as spoken in Tawain)
    └── vendor.[hash].js (external libraries code)

The extra application code for locales could be loaded incrementally (in addition of the `app-en.[hash].js`) or alone. For example, all you need to load in order to serve the application for the Spanish `es` locale is:

```html
<script src="dist/vendor.[hash].js"></script>
<script src="dist/app-es.[hash].js"></script>
<script src="dist/app.[hash].js"></script>
```
*N.B.*: `index.html` is generated using the default locale `en`.

In 7.81KB (~7.3KB for the Globalize and ReactGlobalize runtime libraries, plus 0.5KB for the `en` application precompiled formatters), you have everything you need to localize your application for the English locale.

| File | Minified + gzipped size | Summary |
|---|--:|---|
| dist/app.[hash].js | 12.2KB | Demo application code. *Disclosure*: Currently, it includes 5.31KB of Globalize runtime lib code that should be moved into vendor |
| dist/app-\<locale\>.[hash].js | ~0.5KB | Precompiled formatters used in this demo. |
| dist/vendor.[hash].js | 119KB | All the external libraries needed for this demo. Note that Globalize and ReactGlobalize runtime libraries currently accounts for 2KB in this file (note that 5.31KB is wrongly at app.[hash].js currently and should be moved into here). |

*Disclosure*: As more i18n messages are created (and the more features they use, e.g., relative time, date, number, currency formatting), the sizes above will increase. Although, note that the compiler is smart enough not to duplicate code, i.e., no modules are duplicated and formatters are reused among themselves.

As important as being easy to use is that the final product is great. Above, we've mentioned our goal for production code was being small, fast, reliable, and up-to-date. Below, I want to show how changes affect your final production code.

Suppose that we include the following message in `components/Application/index.jsx`.

```jsx
<p><FormatMessage>Get all this for free.</FormatMessage></p>
```

Such change is going to produce the following impact on the production code.

| File | Minified + gzipped size | Change |
|---|--:|---|
| dist/app.[hash].js | 12.3KB | +0.1KB (the new message) |
| dist/app-\<locale\>.[hash].js | ~0.6KB | +0.1KB ([the new message formatter](https://gist.github.com/rxaviers/86dbc0a2e4dd15b019a2)) |
| dist/vendor.[hash].js | 119.0KB | +0.0KB (no change) |

The only addition to `dist/app-en.[hash].js` (and analogous for other locales) is below. See the [full diff here](https://gist.github.com/rxaviers/86dbc0a2e4dd15b019a2).

```js
Globalize.b690639996 = messageFormatterFn((function() {
  return function (d) { return "Get all this for free."; }
})());
```

Now, suppose we include a localized `$0.00` in the message.

```jsx
<FormatMessage variables={{ price: Globalize.formatCurrency(0, "USD") }}>{
  "Get all this for free {price}"
}</FormatMessage>
```

Such change is going to produce the following impact on the production code.

| File | Minified + gzipped size | Change |
|---|--:|---|
| dist/app.[hash].js | 17.4KB | +5.2KB *Disclosure*: it should be the same as before in here, since very little was added to the message itself. It happens that the currency and number external runtime libraries have been added in here |
| dist/app-\<locale\>.[hash].js | ~1.0KB | +0.5KB ([the new message and currency formatters](https://gist.github.com/rxaviers/56b3b2716c97a30a1994)) |
| dist/vendor.[hash].js | 119KB | +0.0KB *Disclosure*: the above 5.2KB should be moved in here |

The new formatters added to `dist/app-en.[hash].js` (and analogous for other locales) are below. See the [full diff here](https://gist.github.com/rxaviers/56b3b2716c97a30a1994).

```js
Globalize.b957349717 = numberFormatterFn(["'$'",,1,2,2,,,0,3,,"","'$'#,##0.00","-'$''$'#,##0.00","-'$'","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);

Globalize.b1223214380 = currencyFormatterFn(Globalize("en").numberFormatter({"raw":"'$'#,##0.00"}));

Globalize.a2053015180 = messageFormatterFn((function(  ) {
  return function (d) { return "Get all this for free " + d.price; }
})());
```

Now, suppose you are going to use currency formatting in various other places in your code (either via `<FormatCurrency>` element or `Globalize.formatCurrency()` directly). In your final production code, as you might have guessed, there won't be duplicate currency formatters, only the new messages will be included. They will reuse the currency formatter above.

## Learning Globalize

The [Globalize getting started documentation](https://github.com/jquery/globalize/#getting-started) is a great way to get started.

Here are some links you may find helpful:

* [Documentation](https://github.com/jquery/globalize/#globalize)
* [API Reference](https://github.com/jquery/globalize/#api)
* [Globalize on GitHub](https://github.com/jquery/globalize)
* [Support on IRC](http://irc.jquery.org/)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._

