<template>
  <div class="layout">
    <Header class="inner-width" />
    <section class="content inner-width">
      <slot />
    </section>
    <Footer />
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
import Footer from '~/components/Footer';

export default {
  components: {
    Header,
    Footer
  },

  mounted () {
    this.detectSmallWindow();
    window.addEventListener('resize', this.debounceResize);
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
}

.header {
  margin-bottom: 30px;
  width: 100%;
}

.content {
  width: 100%;
  margin-bottom: 50px;
}

.footer {
  margin-top: auto;
  width: 100%;
}
</style>