import Layout from '../components/Layout'
import Head from 'next/head'
import Content from '../interfaces/content'
import { getContentBySlug, getContentType } from 'outstatic/server'
import ContentGrid from '../components/ContentGrid'
import markdownToHtml from '../lib/markdownToHtml'

type Props = {
  page: Content
  allPosts: Content[]
  allProjects: Content[]
}

export default function Index({ page, allPosts, allProjects }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with Outstatic</title>
        </Head>
        <div className="max-w-6xl mx-auto px-5">
          <section className="mt-16 mb-16 md:mb-12">
            <div
              className="prose lg:prose-2xl"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </section>
          {allPosts.length > 0 && (
            <ContentGrid title="Posts" items={allPosts} contentType="posts" />
          )}
          {allProjects.length > 0 && (
            <ContentGrid
              title="Projects"
              items={allProjects}
              contentType="projects"
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const page = getContentBySlug('pages', 'home', ['content'])

  const allPosts = getContentType('posts', [
    'title',
    'publishedAt',
    'slug',
    'coverImage',
    'description'
  ])

  const allProjects = getContentType('projects', [
    'title',
    'slug',
    'coverImage'
  ])

  const content = await markdownToHtml(page.content || '')

  return {
    props: { page: { content }, allPosts, allProjects }
  }
}