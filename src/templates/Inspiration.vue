<template>
  <Layout>
	{{ $page.inspiration }}
    <h1>{{ $page.inspiration.title }}</h1>
    <g-image :src="$page.inspiration.thumbnail.file.url" width="200" />
    <div>
      <small>Objectif: {{ $page.inspiration.goal.title }}</small><br/>
      <small>Durée: {{ $page.inspiration.length.title }}</small><br/>
      <small>Taille du groupe: {{ $page.inspiration.groupSize.title }}</small><br/>
      <small>Niveau: {{ $page.inspiration.level.title }}</small><br/>
      <small>Déroulé: {{ $page.inspiration.timing.title }}</small>
    </div>
    <div v-html="$page.inspiration.summary"></div>
  </Layout>
</template>

<page-query>
query page($id: ID!) {
  inspiration: contentfulPage(id: $id) {
    title
    summary(html: true)
    updatedAt
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
    	title
    }
    length {
      id
    	title
    }
    groupSize {
      id
    	title
    }
    timing {
      id
    	title
    }
  }
}
</page-query>
