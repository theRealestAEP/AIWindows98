export const dynamic = 'force-dynamic';

interface Post {
    title: string,
    content: string,
    slug: string
}

interface Props {
    params: { slug: string }
}


export default async function BlogPostPage({params}: Props) {
    //I need to actuall make this workxw
    // const posts: Post[] = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
    //     res.json()
    //     )

    // const post = posts.find(post => post.slug === params.slug)!

    return (
        // <div>
        //     <h1>{post.title}</h1>
        //     <p>{post.content}</p>
        // </div>
        <>
        </>
    )
}