# tslint-strict-window-access

Rule to restrict access to different properties than `postMessage` from Window objects like `parent`, 
`opener`, `top`.

This kind of restriction is helpful to avoid cross-domain issues when your code is injected into some other page or
tries to access opening window for any reason.

Its hard to identify such issues during local development and they can hurt after deployed to production.

This rule will throw you error when you try to access something else than `postMessage` from:

* `window.parent`
* `window.opener`
* `window.top`

### How to use

Add `tslint-strict-window-access` to `extends` list in your `tslint.json`:

    {
      "extends": ["tslint-strict-window-access"],
      "rules": {
        // override tslint-react rules here
        "jsx-wrap-multiline": false
      }
    }
    

If You want to disable this rule, either remove it from `extends` or disable directly in rules:

    {
      "rules": {
        "strict-window-access": false
      }
    }