<template>
  <Layout class="single" has-reading-progress>
    <div class="single__breadcrumb inner-width">
     *TODO Breadcrumb*
    </div>

    <div class="single__cover-wrapper">
      <div class="single__cover" :style="{backgroundImage: `url(${$page.inspiration.thumbnail.file.url})`}"></div>
    </div>
  
    <div class="single__wrapper inner-width">
      <section class="single__content">
        <h1 class="single__title">{{ $page.inspiration.title }}</h1>
        <span class="single__goal">> {{ $page.inspiration.goal.title }}</span>
        <div class="single__summary" v-html="$page.inspiration.summary"></div>

        <div class="single__prequisite m--b-6">
          <h2>Pré-requis</h2>
          <div v-html="$page.inspiration.prerequisite"></div>
        </div>

        <div class="single__steps m--b-6">
          <h2>Déroulé de l'activité</h2>

          <div class="single__step" v-for="(step, index) in $page.inspiration.steps" :key="step.id">
            <div class="ss__number"><span>{{ index + 1 }}</span></div>
            <div class="ss__content p--b-6">
              <h3>{{ step.label }}</h3>
              <div v-html="step.content"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="single__sidebar">
        <SingleCard
            ref="card"
            class="single__card"
            :activity="$page.inspiration.activity"
            :goal="$page.inspiration.goal"
            :level="$page.inspiration.level"
            :group-size="$page.inspiration.groupSize"
            :length="$page.inspiration.length"
            :goal-label="$page.inspiration.goalLabel"
            :added-value="$page.inspiration.addedValue"
            :style="{top: cardTopPosition + 'px'}"
          />
      </section>
    </div>

    <SubFooterVideo slot="sub-footer-left" />
    <SubFooterSignup slot="sub-footer-right" />
  </Layout>
</template>

<page-query>
query page($id: ID!) {
  inspiration: contentfulPage(id: $id) {
    title
    goalLabel
    addedValue
    summary(html: true)
    prerequisite(html: true)
    steps {
      id
      label
      content (html: true)
    }
    thumbnail {
      file {
        url
      }
    }
    goal {
      id
      title
    }
    level {
      id
    }
    length {
      id
      minValue
      maxValue
    }
    groupSize {
      id
    }
    timing {
      id
    }
    activity {
      key
      title
      activityType {
        key
        title
      }
    }
  }
}
</page-query>

<script>
import SubFooterVideo from '~/components/SubFooterVideo';
import SubFooterSignup from '~/components/SubFooterSignup';
import SingleCard from '~/components/SingleCard';

export default {
  metaInfo() {
    return {
      title: this.$page.inspiration.title
    }
  },

  components: {
    SubFooterVideo,
    SubFooterSignup,
    SingleCard
  },

  data () {
    return {
      cardTopPosition: 0
    };
  },

  mounted () {
    this.$nextTick(() => {
      const $header = document.querySelector('.header');
      const $breadcrumb = document.querySelector('.single__breadcrumb');
        this.cardTopPosition = $header.offsetHeight + $breadcrumb.offsetHeight;
    });
  }
}
</script>

<style lang="scss" scoped>
.single {
  background: linear-gradient(180deg, rgba(235, 232, 242, 0.3) 0%, rgba(196, 196, 196, 0) 100%);
}

.single__wrapper {
  position: relative;
  display: flex;
}

.single__content {
  padding-top: 15rem;
}

.single__sidebar {
  padding: 0 2rem;
  flex: 0 0 400px;
}

.single__cover-wrapper {
  position: relative;
  width: 100%;
  z-index: 0;
}

.single__cover {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: absolute;
  top: 4rem;
  left: 0;
  right: 0;
  height: 300px;
}

.single__title {
  color: color(white);
  margin: 0;
  font-size: 46px;
  text-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.single__goal {
  color: color(white);
  font-size: 20px;
  margin-bottom: 2rem;
  display: block;
  text-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.single__card {  
  position: -webkit-sticky;
  position: sticky;
  z-index: 90;
  top: 0;
  right: 0;
}

.single__summary {
  position: relative;
  background: linear-gradient(180deg, #FFFFFF 55.21%, rgba(255, 255, 255, 0) 100%);
  padding: 3rem;
  margin: 0 0 0 -3rem;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 50px;
    right: 0;
    width: 100%;
    box-shadow: 0px -7px 14px rgba(0, 0, 0, 0.25);
  }
}

.single__step {
  display: flex;

  &:last-child {
    .ss__number:after {
      display: none;
    }
  }

  $ss-number-size: 25px;
  .ss__number {
    flex: 0 0 $ss-number-size;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:after {
      content: '';
      flex: 1;
      width: 1px;
      border-left: 1px dashed color(grey-light);
    }

    > span {
      position: relative;
      z-index: 1;
      width: $ss-number-size;
      height: $ss-number-size;
      border-radius: $ss-number-size/2;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid color(grey);
      font-size: fs(large);
      font-weight: fw(medium);
    }
  }

  .ss__content {
    padding-left: 1rem;
  }
}
</style>