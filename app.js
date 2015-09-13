var View = Vue.extend({
  route: {
    data: function (transition) {
      var name = 'index'

      if (typeof this.$route.params.name !== 'undefined') {
        name = this.$route.params.name
      }

      var url = 'json/' + name + '.json'

      $.getJSON(url).done(function(data) {
        transition.next(data)
      }).fail(function() {
        transition.next({
          name : name,
          title: 'エラー',
          body: 'ページは存在しません。'
        })
      })

    }
  },
  template: '<h1>{{title}}</h1><p>{{body}}</p>'
})

var App = Vue.extend({})

var router = new VueRouter({
  history: true,
  root: '/vue-example'
})

router.map({
  '/': {
    component: View
  },
  '/:name': {
    component: View
  }
})

router.start(App, '#app')