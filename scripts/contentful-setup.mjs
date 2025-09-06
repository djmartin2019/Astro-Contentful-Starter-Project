// scripts/contentful-setup.mjs
import 'dotenv/config';
import contentful from 'contentful-management';

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT = 'master',
  CONTENTFUL_MANAGEMENT_TOKEN
} = process.env;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
  console.error('Missing Contentful env vars (SPACE_ID / MANAGEMENT_TOKEN).');
  process.exit(1);
}

const client = contentful.createClient({ accessToken: CONTENTFUL_MANAGEMENT_TOKEN });

async function upsertContentType(env, id, def) {
  try {
    const ct = await env.getContentType(id);
    // overwrite fields/metadata to match current def
    ct.name = def.name;
    ct.displayField = def.displayField;
    ct.fields = def.fields;
    const updated = await ct.update();
    await updated.publish();
    return updated;
  } catch (err) {
    if (err.name === 'NotFound') {
      const created = await env.createContentTypeWithId(id, def);
      await created.publish();
      return created;
    }
    throw err;
  }
}

// Plain Text for content to match your `any` without a renderer
const blogPostDef = {
  name: 'Blog Post',
  displayField: 'title',
  fields: [
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
    { id: 'excerpt', name: 'Excerpt', type: 'Text', required: false },
    { id: 'content', name: 'Content', type: 'Text', required: true },
    { id: 'featuredImage', name: 'Featured Image', type: 'Link', linkType: 'Asset', required: false },
    { id: 'author', name: 'Author', type: 'Symbol', required: false },
    { id: 'publishDate', name: 'Publish Date', type: 'Date', required: true },
    { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' }, required: false }
  ]
};

const pageDef = {
  name: 'Page',
  displayField: 'title',
  fields: [
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
    { id: 'content', name: 'Content', type: 'Text', required: true }
  ]
};

(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE_ID);
  const env = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

  console.log('Upserting content types…');
  await upsertContentType(env, 'blogPost', blogPostDef);
  await upsertContentType(env, 'page', pageDef);
  console.log('✅ Content types ready & published.');
})();

