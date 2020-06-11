<template>
  <Layout class="single" has-reading-progress :data-activity-type="$page.inspiration.activity.activityType.key">
    <div class="single__breadcrumb inner-width hide-sm">
      <g-link to="/">Accueil</g-link> > <g-link to="/inspirations">Tous les templates</g-link> > {{ $page.inspiration.title }}
    </div>

    <div ref="coverMobile" class="single__cover-mobile" :class="{'single__cover-mobile--collapsed': isCoverMobileCollapse}">
      <div class="single__cover" :style="{backgroundImage: `url(${$page.inspiration.thumbnail.file.url})`}">
         <h1 class="single__title">{{ $page.inspiration.title }}</h1>
      <span class="single__goal">> {{ $page.inspiration.goal.title }}</span>
        <div class="single__cm__footer">
          <Button icon="burger" color="white" />
          <Button label="Utiliser ce modèle" color="primary" />
        </div>
      </div>
     
    </div>

    <div class="single__cover-wrapper hide-sm">
      <div class="single__cover" :style="{backgroundImage: `url(${$page.inspiration.thumbnail.file.url})`}"></div>
    </div>
  
    <div class="single__wrapper inner-width">
      <section class="single__content">
        <h1 class="single__title hide-sm">{{ $page.inspiration.title }}</h1>
        <span class="single__goal hide-sm">> {{ $page.inspiration.goal.title }}</span>
        <div class="single__summary" v-html="$page.inspiration.summary"></div>

        <div class="single__prequisite m--b-6">
          <h2>Pré-requis</h2>
          <div v-html="$page.inspiration.prerequisite"></div>
        </div>

        <div class="single__settings m--b-6">
          <h4 v-if="$page.inspiration.activity">
            <BorderedIcon><Icon name="cog" :size="20" /></BorderedIcon> 
            Paramétrage de l'activité {{ $page.inspiration.activity.title }} 
            <ActivityIcon :name="$page.inspiration.activity.key" :type="$page.inspiration.activity.activityType.key" />
          </h4>

          <ul>
            <li v-for="setting in $page.inspiration.settings" :key="setting.id">
              <Icon name="checkbox" />{{ setting.label }}
            </li>
          </ul>
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

        <div class="single__suggestions m--b-6">
          <h2>Suggestions et variantes</h2>

          <div v-for="suggestion in $page.inspiration.suggestions" :key="suggestion.id" class="ssu__item">
            <Icon name="idea" />
            <div v-html="suggestion.content"></div>
          </div>
        </div>

        <div class="single__ressources">
          <h2>Ressources</h2>

          <ul>
            <li v-for="ressource in $page.inspiration.ressources" :key="ressource.id">
              <a :href="ressource.url" target="_blank"><Icon name="external-link" /> {{ ressource.label }}</a>
            </li>
          </ul>
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
            :timing="$page.inspiration.timing.title"
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
    settings {
      id
      label
    }
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
      title
    }
    activity {
      key
      title
      activityType {
        key
        title
      }
    }
    ressources {
      id
      label
      url
    }
    suggestions {
      id
      content (html: true)
    }
  }
}
</page-query>

<script>
import { throttle } from 'lodash-es';
import SubFooterVideo from '~/components/SubFooterVideo';
import SubFooterSignup from '~/components/SubFooterSignup';
import SingleCard from '~/components/SingleCard';
import ActivityIcon from '~/components/ActivityIcon';
import BorderedIcon from '~/components/BorderedIcon';

export default {
  metaInfo() {
    return {
      title: this.$page.inspiration.title
    }
  },

  components: {
    SubFooterVideo,
    SubFooterSignup,
    SingleCard,
    ActivityIcon,
    BorderedIcon
  },

  data () {
    return {
      cardTopPosition: 0,
      isCoverMobileCollapse: false
    };
  },

  mounted () {
    this.$nextTick(() => {
      const $header = document.querySelector('.header');
      const $breadcrumb = document.querySelector('.single__breadcrumb');
        this.cardTopPosition = $header.offsetHeight + $breadcrumb.offsetHeight;
      
      
      if (this.$store.state.isSmallWindow) {
        document.addEventListener('scroll', this.throttleScroll);
      }
    });

    
  },

  beforeDestroy () {
    document.removeEventListener('scroll', this.throttleScroll);
  },

  methods: {
		throttleScroll: throttle(function () {
				this.scroll();
		}, 30),

		scroll () {
      this.isCoverMobileCollapse = document.documentElement.scrollTop > this.$refs.coverMobile.getBoundingClientRect().top + this.$refs.coverMobile.offsetHeight * .5;
		}
	}
}
</script>

<style lang="scss" scoped>
.single {
  @each $key, $value in $colors-activity-types {
    &[data-activity-type="#{$key}"] {
      .ss__number span {
        border-color: $value;
      }

      .single__settings:before {
        background-color: $value;
      }
    }
  }

  /deep/ .content {
    background: url('../assets/images/single-bg.svg') center right no-repeat;
  }
}

.single__wrapper {
  position: relative;
  display: flex;
  
  @include breakpoint(medium) {
    display: block;
  }
}

.single__content {
  padding-top: 15rem;

  @include breakpoint(medium) {
    padding-top: 2rem;
  }
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

.single__cover-mobile {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 300px;
  display: none;

  @include breakpoint(medium) {
    display: block;
  }

  .single__cover {
    top: 0;
    z-index: 0;
    height: 300px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .single__title,
  .single__goal {
    position: relative;
    z-index: 1;
  }

  .single__goal {
    transition: opacity 0.3s ease;
  }

  &--collapsed {
    .single__cover {
      height: 150px;
      box-shadow: 0 0px 30px rgba(0, 0, 0, 0.5);
    }

    .single__goal {
      opacity: 0;
    }
  }
}

.single__cm__footer {
  position: absolute;
  bottom: -2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
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

  @include breakpoint(medium) {
    margin: 0;
  }

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

    @include breakpoint(medium) {
      content: none;
    }
  }
}

.single__settings {
    position: relative;
    background: white;
    border: 1px dashed color(grey-light);
    padding: 2rem;

    &:before {
      content: '•';
      width: 25px;
      height: 30px;
      background-color: color(grey);
      border-radius: 5px 0 0 5px;
      position: absolute;
      top: -1px;
      left: -25px;
      color: color(grey-lighter);
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    > h4 {
      color: color(grey);
      display: flex;
      align-items: center;

      > .bordered-icon {
        margin-right: 1rem;
      }

      > .activity-icon {
        margin-left: 1rem;
      }
    }

    ul {
      list-style: none;

      > li {
        display: flex;
        align-items: center;

        > .icon {
          margin-right: 1rem;
        }
      }
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
      font-weight: fw(medium);
    }
  }

  .ss__content {
    padding-left: 1rem;
  }
}

.single__ressources {
  ul {
    list-style: none;
    padding: 0;

    a {
      display: flex;
      align-items: center;
      color: $body-font-color;

      > .icon {
        margin-right: 1rem;
      }
    }
  }
}

.single__suggestions {
  .ssu__item {
    display: flex;
    align-items: flex-start;

    > .icon {
      margin-right: 1rem;
    }
  }
}
</style>