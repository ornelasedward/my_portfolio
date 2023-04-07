import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug);

  return (
    <div>
      <h1 className="bg-gray-900 bg-clip-text text-transparent text-9xl font-extralight">
        {page.title}
      </h1>
      <div className="text-4xl text-gray-700 mt-10">
        <PortableText value={page.content} />
      </div>
      // Include the Tally widget script in the <head> section of your page
<script src="https://tally.so/widgets/embed.js"></script>

// Add the embed in your HTML
<iframe data-tally-src="https://tally.so/embed/3jZYQ9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="200" frameborder="0" marginheight="0" marginwidth="0" title="Contact Form"></iframe>

// Load all embeds on the page
Tally.loadEmbeds();
    </div>
  );
}
