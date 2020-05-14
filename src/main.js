// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex'
import '~/assets/scss/main.scss'

import DefaultLayout from '~/layouts/Default.vue'

import Button from '~/components/ui/Button.vue'
import Icon from '~/components/ui/Icon.vue'
import Link from '~/components/ui/Link.vue'
import Checkbox from '~/components/ui/Checkbox.vue'
import Radio from '~/components/ui/Radio.vue'
import Input from '~/components/ui/Input.vue'
import Textarea from '~/components/ui/Textarea.vue'
import Select from '~/components/ui/Select.vue'

export default function (Vue, { router, head, isClient, appOptions }) {
  // Layouts
  Vue.component('Layout', DefaultLayout)

  // Components
  Vue.component('Button', Button)
  Vue.component('Icon', Icon)
  Vue.component('Link', Link)
  Vue.component('Checkbox', Checkbox)
  Vue.component('Radio', Radio)
  Vue.component('Input', Input)
  Vue.component('Textarea', Textarea)
  Vue.component('Select', Select)

  // Vuex store
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store({
    state:{
      isSmallWindow: false,
    },
    mutations: {
      detectSmallWindow (state, bool) {
        state.isSmallWindow = bool;
      }
    }
  });
}
