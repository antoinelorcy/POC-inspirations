// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const contentful = require("contentful");
const { documentToHtmlString }  = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES } = require ('@contentful/rich-text-types');

let locales = [];
const client = contentful.createClient({
	space: 'eyn4ihh29nqh',
	environment: 'master',
	accessToken: 'j-IWQuVywYvw9yz1mKvkoX1qNChKpbBBIZjNP_d0FCY'
});

async function getEntries (store, locales) {
	const cHome = store.addCollection('home');
	const cInspi = store.addCollection('inspiration');

	for (locale of locales) {
		// Home
		await client.getEntry('58MnbsmwTLwge6E9QxfSKm', {
			locale
		})
			.then((entry) => {
				cHome.addNode({
					locale,
					url: getLocaleUrl(locale),
					sysId: entry.sys.id,
					title: entry.fields.title
				});
			})

		await client.getEntries({
			locale,
			content_type: 'pageGifs'
		})
		.then(async (entry) => {
			const gifs = entry.items.map((e) => {
				return {
					sysId: e.sys.id,
					locale: locale,
					title: e.fields.title,
					preview: e.fields.preview.fields.file.url,
					gif: e.fields.gif.fields.file.url
				}
			})

			// Inspirations
			await client.getEntries({
				locale,
				content_type: 'page'
			})
			.then((entry) => {
				for (const page of getPageFormat(entry, gifs)) {
					cInspi.addNode(page)
				}
			})
		})

		
		const filters = ['goal', 'groupSize', 'length', 'level', 'timing', 'activity', 'tag'];

		for (filter of filters) {
			await client.getEntries({
				locale,
				content_type: filter
			})
				.then((entry) => {
					if (!store.getCollection(filter)) {
						store.addCollection(filter);
					}
			
					for (const item of getFilterFormat(entry)) {
						store.getCollection(filter).addNode(item)
					}
				})
		}
	}
}

function getLocaleUrl (locale) {
  return locale === 'en' ? '/' : '/fr/';
}

function getPageFormat (entry, gifs) {
  return entry.items.map((item) => {
	const locale = item.sys.locale;
	const sysId = item.sys.id;
	const createdAt = item.sys.createdAt;
	const title = item.fields.title;
	const slug = slugify(title);
	const url = `${getLocaleUrl(locale)}inspiration/${slug}`;

	const fields = {};
	for (let [key, value] of Object.entries(item.fields)) {
		if (isRichText(value)) {
			fields[key] = documentToHtmlString(value);
		} else {
			if (value.fields && value.sys.type === 'Asset') {
				fields[key] = value.fields.file.url;
			} else if (Array.isArray(value)) {
				// Transform rich content subfield as html
				const f = value.map((v) => {
					if (v.fields && v.fields.content) {
						const options = {
							renderNode: {
								[INLINES.EMBEDDED_ENTRY]: (node) => {
									return getGif(node.data.target.sys.id, locale, gifs);
								},
								[BLOCKS.EMBEDDED_ASSET]: (node) => `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />`
							}
						}
						v.fields.content = documentToHtmlString(v.fields.content, options);
					} else if (v.fields && v.sys.type === 'Asset') {
						v = v.fields.file.url;
					}
					return v;
				});

				fields[key] = f;
				fields[key] = value;
			} else {
				fields[key] = value;
			}
		}
	}

	return {
		locale,
		sysId,
		createdAt,
		title,
		url,
		slug,
		fields
	};
  });
}

function getFilterFormat (entry) {
	return entry.items.map((item) => {
		const node = {};
		node.locale = item.sys.locale;
		node.sysId = item.sys.id;

		for (let [key, value] of Object.entries(item.fields)) {
			node[key] = value;
		}

		return node;
	})
}

function getGif (sysId, locale, gifs) {
	const gif = gifs.find((g) => g.sysId === sysId && g.locale === locale);
	return `<figure class="gif"><img src="${gif.preview}" data-alt="${gif.title}" data-gif="${gif.gif}" class="gif__img" /></figure>`;
}

function isRichText (value) {
	return typeof value === 'object' && value.nodeType === 'document'
}

module.exports = function (api) {
	api.loadSource(async store => {
		// const locales = ['fr'];
		locales = await client.getLocales()
			.then((response) => {
				return response.items.map((locale) => locale.code);
			})
			.catch(console.error);
		
		
		await getEntries(store, locales);
	})

	api.createPages(async ({ graphql, createPage }) => {
		// Inspiration
		const queryInspirations = await graphql(`{
			allInspiration {
				edges {
					node {
						id
						sysId
						url
						locale
						title
						slug
					}
				}
			}
		}`)

		queryInspirations.data.allInspiration.edges.forEach(({ node }) => {
			const translations = queryInspirations.data.allInspiration.edges.filter((edge) => edge.node.sysId === node.sysId).map((page) => {
				return {
					url: page.node.url,
					locale: page.node.locale
				}
			});
			createPage({
				path: node.url,
				component: './src/templates/Inspiration.vue',
				context: {
					id: node.id,
					title: node.title,
					locale: node.locale,
					translations
				}
			})
		})

		// Home
		const queryHome = await graphql(`{
			allHome {
				edges {
					node {
						id
						sysId
						url
						locale
						title
					}
				}
			}
		}`)

		queryHome.data.allHome.edges.forEach(({ node }) => {
			const translations = queryHome.data.allHome.edges.filter((edge) => edge.node.sysId === node.sysId).map((page) => {
				return {
					url: page.node.url,
					locale: page.node.locale
				}
			});

			createPage({
				path: node.url,
				component: './src/templates/Home.vue',
				context: {
					id: node.id,
					title: node.title,
					locale: node.locale,
					translations
				}
			})
		})

		locales.forEach((locale) => {
			const url = `${getLocaleUrl(locale)}inspirations`;

			const translations = locales.map((locale) => {
				return {
					url: `${getLocaleUrl(locale)}inspirations`,
					locale: locale
				}
			});

			createPage({
				path: url,
				component: './src/templates/Inspirations.vue',
				context: {
					title: 'Inspirations',
					locale,
					translations
				}
			})
		})
	})
}

function slugify(text) {
  return text
	.toString()                     // Cast to string
	.toLowerCase()                  // Convert the string to lowercase letters
	.normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
	.trim()                         // Remove whitespace from both sides of a string
	.replace(/\s+/g, '-')           // Replace spaces with -
	.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	.replace(/\-\-+/g, '-');        // Replace multiple - with single -
}