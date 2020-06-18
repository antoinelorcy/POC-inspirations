<template>
  <div class="layout" :class="{'layout--with-mobile-nav': hasMobileNavigation }">
    <Header :has-reading-progress="hasReadingProgress" :locale="locale" />
    <section class="content">
      <slot />
    </section>
    <SubFooter v-if="$slots['sub-footer-left'] || $slots['sub-footer-right']">
      <slot name="sub-footer-left" slot="left" />
      <slot name="sub-footer-right" slot="right" />
    </SubFooter>
    <Footer />
    <MobileNavigation v-if="hasMobileNavigation" />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import { debounce } from 'lodash-es';
import Header from '~/components/Header';
import SubFooter from '~/components/SubFooter';
import Footer from '~/components/Footer';
import MobileNavigation from '~/components/MobileNavigation';

export default {
  components: {
    Header,
    SubFooter,
    Footer,
    MobileNavigation
  },

  props: {
    hasReadingProgress: Boolean,
    locale: String
  },

  mounted () {
    this.detectSmallWindow();
    window.addEventListener('resize', this.debounceResize);
  },

  computed: {
    hasMobileNavigation () {
      return this.$store.state.isSmallWindow;
    }
  },

  methods: {
    debounceResize: debounce(function () {
			this.detectSmallWindow();
    }, 50),
  
    detectSmallWindow () {
      this.$store.commit('detectSmallWindow', window.innerWidth < 1024);
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(235, 232, 242, 0.3) 0%, rgba(196, 196, 196, 0) 100%);

  &--with-mobile-nav {
    padding-bottom: $mobile-nav-height;
  }
}

.header {
  margin-bottom: 30px;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: color(white);
  z-index: 100;

  @include breakpoint(medium) {
    position: relative;
    margin-bottom: 0;
  }
}

.content {
  width: 100%;
  margin-bottom: 50px;
}

.footer {
  margin-top: auto;
  width: 100%;
}

.mobile-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>