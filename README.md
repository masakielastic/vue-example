Vue Router の例
===============

ナビゲーションのリンクをクリックすると、ページのコンテンツが切り替わります。コンテンツの内容は json フォルダーに保存されており、
ルートが変わるたびに Ajax 通信で読み込まれます。

解説
----

History API を利用するために、`VueRouter` のコンストラクターの引数で `history: true` を指定します。

```js
var router = new VueRouter({
  history: true,
  root: '/vue-example'
})
```

ルートのパラメーターは `$route.params` で受け取ります。


```js
router.map({
  '/:name': {
    component: {
      template: '<p>{{$route.params.name}}</p>'
    }
  }
})

```

`template` で使う変数を加工するために、トランジションフックの `data` メソッドを使います。

```js
router.map({
  '/': {
    component: MyComponent
  },
  '/:name': {
    component: {
      route: {
        data: function (transition) {
          transition.next({name: this.$route.params.name})
        }
      },
      template: '<p>{{name}}</p>'
    }
  }
})
```

