import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
  draft?: boolean // Support optional draft flag
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  // Filter out drafts
  let publishedArticles = articles.filter((article) => !article.draft)

  // Sort by date descending
  return publishedArticles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
