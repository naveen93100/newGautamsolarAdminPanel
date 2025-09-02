import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

const BlogDetail = () => {
    let { id: uuid } = useParams();
    // const [blog, setBlog] = useState(null);
    // const [tags, setTags] = useState([]);

    const location = useLocation()
    const blog = location.state?.blog || null;
    const tags = JSON.parse(blog?.Tags) || [];
    console.log(blog)
    console.log(tags)

    // useEffect(() => {

    //     const getBlog = async () => {

    //         try {
    //             let res = await axios.get(`https://gautamsolar.us/admin/news/${uuid}`);
    //             console.log(res)
    //             setBlog(res?.data?.data)
    //             let val = JSON.parse(res?.data?.data.Tags);
    //             setTags(val)
    //         } catch (er) {
    //             console.log(er.message);
    //         }

    //     }
    //     getBlog();

    // }, [uuid]);


    return (
        // <div className="text-black h-screen overflow-y-auto">
        //     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        //         {/* Header */}
        //         <header className="mb-6">
        //             <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#9B2C2C]">
        //                 {blog?.Header}
        //             </h1>
        //         </header>


        //         {/* Image */}
        //         <section className="mb-6">
        //             <figure className="w-full overflow-hidden rounded-2xl shadow">
        //                 {/* eslint-disable-next-line @next/next/no-img-element */}
        //                 <img
        //                     src={blog?.ImageURL}
        //                     alt={blog?.Header}
        //                     className="w-full h-auto object-cover"
        //                     loading="lazy"
        //                 />
        //             </figure>
        //         </section>


        //         {/* Body */}

        //             <div
        //                 className="leading-7 "
        //                 dangerouslySetInnerHTML={{ __html: blog?.Body.replace(/background-color:\s*[^;]+;?/gi, '') }}
        //             />

        //         {tags.length > 0 && (
        //             <footer className="mt-8">
        //                 <div className="text-sm font-semibold mb-2">Tags</div>
        //                 <div className="flex flex-wrap gap-2">
        //                     {tags.map((tag, idx) => (
        //                         <Link key={idx} className="badge badge-outline badge-lg">
        //                             #{tag.tag}
        //                         </Link>
        //                     ))}
        //                 </div>
        //             </footer>
        //         )}
        //     </div>
        // </div>
        <div className="text-gray-900 bg-white  overflow-y-auto w-full md:max-w-6xl mx-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <header className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#9B2C2C] leading-tight">
                        {blog?.Header}
                    </h1>
                </header>

                {/* Image */}
                {blog?.ImageURL && (
                    <section className="mb-10">
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src={blog?.ImageURL}
                                alt={blog?.Header}
                                className=" h-96 object-cover"
                                loading="lazy"
                            />
                        </div>
                    </section>
                )}

                {/* Body */}
                <article className="prose prose-lg sm:prose-xl max-w-none leading-relaxed text-gray-800">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blog?.Body.replace(/background-color:\s*[^;]+;?/gi, ''),
                        }}
                    />
                </article>

                {/* Tags */}
                {tags.length > 0 && (
                    <footer className="mt-12">
                        <div className="text-sm font-semibold mb-2 uppercase tracking-wide text-gray-600">
                            Tags
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag, idx) => (
                                <Link
                                    key={idx}
                                    target='_blank'
                                    to={`${tag.link}`}
                                    className="px-3 py-1 rounded-full border border-gray-300 text-sm font-medium hover:bg-[#9B2C2C] hover:text-white transition-colors"
                                >
                                    #{tag.tag}
                                </Link>
                            ))}
                        </div>
                    </footer>
                )}
            </div>
        </div>


    )
}

export default BlogDetail