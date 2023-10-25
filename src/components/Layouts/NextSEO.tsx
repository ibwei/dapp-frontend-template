import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { APP_META } from 'config'

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

export const NextSEO: React.FC<SEOProps> = ({ title, description, image }) => {
  return (
    <>
      <DefaultSeo
        title={title ?? APP_META.name}
        description={description ?? APP_META.description}
        openGraph={{
          title,
          description,
          images: [{ url: image ?? APP_META.logo }],
          site_name: title ?? APP_META.name,
          url: APP_META.url,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title ?? APP_META.twitterTitle} />
        <meta name="twitter:description" content={description ?? APP_META.twitterDescription} />
        <meta name="twitter:image" content={image ?? APP_META.twitterImage} />
      </Head>
    </>
  )
}
