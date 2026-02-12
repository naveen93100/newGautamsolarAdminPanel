import { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import axios from 'axios'
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import JoditEditorCompo from "../components/JoditEditorCompo";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            header: "",
            image: null
        }
    });

    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePrev, setImagePrev] = useState(null);

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const [linkInput, setLinkInput] = useState("");
    const [joditContent, setJoditContent] = useState("")
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);




    const handleDelete = async (uuid) => {
        try {

            let res = await axios.delete(`https://gautamsolar.us/admin/delete?uuid=${uuid}`);

            if (res?.status === 200) {
                toast.success(res?.data?.message);
                setBlogs((prev) => prev.filter(item => item.UUID !== uuid));
                setSelectedBlog(null);
            }

            setDeleteModal(false);
            setSelectedBlog(null);

        } catch (er) {
            console.log(er);
        }
    }

    const handleTag = () => {
        if (!tagInput) {
            toast.error('TagName is Required')
            return;
        }

        if (!linkInput) {
            toast.error('LinkName is Required')
            return;
        }

        setTags((prev) => [...prev, { tag: tagInput, link: linkInput }]);
        setTagInput('')
        setLinkInput('')
    }

    const handleImage = (e) => {
        let val = e?.target?.files[0];
        setImage(val);
        if (val) {
            let imgPrev = URL.createObjectURL(val);
            setImagePrev(imgPrev);
        }
    }

    const onSubmit = async (data) => {

        let formData = new FormData();
        console.log(data);

        if (selectedBlog) {
            formData.append('Header', data.header);
            if (data?.image?.length>0) {
                formData.append('BlogImage', data?.image[0]);
            }
            formData.append('Description', data?.Description);
            formData.append('Body', joditContent);
            formData.append('Tags', JSON.stringify(tags));

            try {
                setLoading(true);
                let res = await axios.patch(`https://gautamsolar.us/admin/updateNews/${selectedBlog?.UUID}`, formData);
                setLoading(false);
                setImage(null);
                setImagePrev(null);
                setJoditContent('')
                setShowModal(false);
                reset();

            } catch (er) {
                console.log(er)
            }
            finally {
                setLoading(false)
            }
        }
        else {

            try {
                setLoading(true);
                formData.append('Header', data.header);
                formData.append('BlogImage', data?.image[0]);
                formData.append('Description', data?.Description);
                formData.append('Body', joditContent);
                formData.append('tags', JSON.stringify(tags));

                let res = await axios.post("https://gautamsolar.us/admin/createNews", formData);

                setLoading(false);
                setImage(null);
                setImagePrev(null);
                setJoditContent('')
                setShowModal(false);
                reset();

            } catch (er) {
                console.log(er)
            }
            finally {
                setLoading(false)
            }
        }

    };

    useEffect(() => {
        const getBlog = async () => {
            try {
                setLoading(true);
                let res = await axios.get(`https://gautamsolar.us/admin/news?NoOfNews=6&Page=${page}`);
                if (res?.data?.data) {
                    setLoading(false);
                    setBlogs(res?.data?.data);
                    setHasNext(true)
                }
            } catch (er) {
                setHasNext(false);
                
                if(page<0) 
                    {setPage(1)}
                else
                    {setPage(page - 1)}
                
            }
            finally {
                setLoading(false);
            }
        }
        getBlog();
    }, [page])

    useEffect(() => {

        if (!selectedBlog) return;
        setValue('header', selectedBlog?.Header);
        setValue('Description', selectedBlog?.Description)
        setTags(JSON.parse(selectedBlog?.Tags));
        setJoditContent(selectedBlog?.Body)
        setImagePrev(selectedBlog?.ImageURL);

    }, [selectedBlog]);


    return (
        <>
            <div className="p-6 min-h-screen overflow-hidden">
                <h1 className="text-4xl font-bold mb-6 text-[#9B2C2C]">Blogs</h1>

                {/* Blog Modal */}
                {showModal && (
                    <div className="modal modal-open flex items-center justify-center ">
                        <div className="modal-box relative bg-slate-900 max-w-7xl w-full rounded-xl p-8 shadow-lg">
                            <h3 className="text-3xl font-bold mb-6 text-[#9B2C2C] text-center">
                                {selectedBlog ? 'Edit Blog' : 'Add Blog'}
                            </h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Header */}
                                <div className="flex flex-col text-black">
                                    <label className="font-medium mb-1 text-white">Blog Header</label>
                                    <input
                                        type="text"
                                        placeholder="Enter blog header"
                                        className="input input-bordered bg-slate-700 w-full text-white"
                                        {...register("header", { required: "Header is required" })}
                                    />
                                    {errors.header && <p className="text-red-500 text-sm mt-1">{errors.header.message}</p>}
                                </div>

                                {/* Image */}
                                <div className="flex flex-col text-black">
                                    <label className="font-medium mb-1 text-white">Blog Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="file-input file-input-bordered w-full text-white"
                                        {...register("image", { required: (selectedBlog ? false : "Image is required") })}
                                        onChange={handleImage}
                                    />
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                                    {imagePrev && (
                                        <img src={imagePrev} alt="Preview" className="w-40 h-40 object-cover rounded mt-2 border" />
                                    )}
                                </div>

                                {/* Tags with links */}
                                <div className="flex flex-col">
                                    <label className="font-medium mb-2 text-white">Tags</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Tag Name"
                                            className="input input-bordered bg-slate-700 w-full text-white"
                                            onChange={(e) => setTagInput(e.target.value)}
                                            value={tagInput}

                                        />
                                        <input
                                            type="text"
                                            placeholder="Tag Link"
                                            className="input input-bordered w-full bg-slate-700 text-white"
                                            value={linkInput}
                                            onChange={(e) => setLinkInput(e.target.value)}

                                        />
                                    </div>
                                    <button onClick={handleTag} type="button" className="btn btn-sm bg-[#9B2C2C] text-white hover:bg-red-700 mb-2">
                                        Add Tag
                                    </button>

                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <div key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                                                <a href={tag.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">{tag.tag}</a>
                                                <button type="button" onClick={() => setTags((prev) => prev.filter((_, idx) => idx !== index))} className="text-red-500 font-bold">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col text-black">
                                    <label className="font-medium mb-1 text-white">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Enter blog Description"
                                        className="input input-bordered w-full text-white bg-slate-700"
                                        {...register("Description", { required: "Description is required" })}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                </div>

                                {/* body */}
                                <div className="text-black">

                                    <JoditEditorCompo
                                        setJoditContent={setJoditContent}
                                        joditContent={joditContent}
                                    />

                                </div>


                                {/* Modal Actions */}
                                <div className="modal-action flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        className="btn btn-soft text-black bg-white"
                                        onClick={() => {
                                            setSelectedBlog(null)
                                            setShowModal(false)
                                            reset()
                                            setJoditContent(null)
                                            setTags([])
                                            setImagePrev(null)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    {loading ? <span className=" bg-[#9B2C2C]  loading loading-spinner"></span>
                                        :
                                        <button type="submit" className="btn bg-[#9B2C2C] text-white hover:bg-red-700">
                                            {selectedBlog ? 'Edit Blog' : 'Add Blog'}
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showDeleteModal &&
                    <div className="modal modal-open ">
                        <div className="modal-box text-white bg-slate-700 max-w-md">
                            <h3 className="text-lg font-bold mb-4">Delete Blog</h3>
                            <p className="mb-6">
                                Are you sure you want to delete the blog titled{" "}.

                                This action cannot be undone.
                            </p>

                            <div className="modal-action flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setDeleteModal(false)
                                        setSelectedBlog(null)
                                    }}
                                    className="btn  btn-sm text-white bg-black"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedBlog?.UUID)}
                                    className="btn bg-red-600 hover:bg-red-700 text-white btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                }


                <div className="w-full bg-gray-200 rounded-2xl py-12 px-4 sm:px-8 lg:px-16 max-h-[calc(100vh-100px)]  overflow-y-auto">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 border-b-1 border-black pb-2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                            Latest Blogs
                        </h2>
                        <button
                            className="btn bg-[#9B2C2C] hover:bg-[#7E2222] text-white px-6 py-2 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                            onClick={() => setShowModal(true)}
                        >
                            + Add Blog
                        </button>
                    </div>

                    {/* Blog Grid */}
                    {loading ?
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="loading loading-spinner bg-[#9B2C2C] loading-lg"></span>
                        </div>
                        :
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 ">
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <div
                                        key={blog?.UUID}
                                        className="group h-96 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col relative"
                                    >
                                        {/* Blog Image */}
                                        {blog.ImageURL && (
                                            <div className="relative h-full w-full overflow-hidden">
                                                <img
                                                    src={blog.ImageURL}
                                                    alt={blog.header}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 left-3 bg-[#9B2C2C] text-white text-xs px-3 py-1 rounded-full shadow-md">
                                                    Blog
                                                </div>
                                            </div>
                                        )}

                                        {/* Blog Content */}
                                        <div className="p-5 flex flex-col flex-1 border-t-1  border-black">
                                            <h3 className="text-sm capitalize font-semibold text-gray-900 group-hover:text-[#9B2C2C] transition-colors truncate">
                                                {blog.Header}
                                            </h3>
                                            <h3 className="text-sm capitalize font-semibold text-gray-900 group-hover:text-[#9B2C2C] transition-colors truncate">
                                                {blog.Description}
                                            </h3>


                                            {/* Footer with Edit & Delete */}
                                            <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-500">
                                                <Link
                                                    to={`/blog/${blog?.UUID}`}
                                                    state={{ blog }}
                                                    className="text-[#9B2C2C] font-medium text-xs hover:underline"
                                                >
                                                    Read More →
                                                </Link>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setSelectedBlog(blog)

                                                        }}
                                                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDeleteModal(true);
                                                            setSelectedBlog(blog)
                                                        }
                                                        }
                                                        className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center col-span-full">
                                    No blogs available yet. Click "Add Blog" to create one.
                                </p>
                            )}
                        </div>
                    }
                </div>


            </div>
            <Pagination
                page={page}
                setPage={setPage}
                hasNext={hasNext}
            />
        </>
    );
};

export default Blog;
