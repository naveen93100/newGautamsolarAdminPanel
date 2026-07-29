import axios from 'axios';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Pagination from '../components/Pagination';

const Media = () => {
    const [showModal, setShowModal] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    const [imagePrev, setImagePrev] = useState(null);
    const [media, setMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false)
    const [loading, setLoading] = useState(false);

    const onSubmit = async (d) => {

        let formData = new FormData();
        formData.append('title', d.title)
        formData.append('link', d.link)
        if (d.image.length > 0) {
            formData.append('image', d.image[0])
        }
        try {
            setLoading(true);
            if (selectedMedia) {
                let res = await axios.patch(`https://gautamsolar.us/media/${selectedMedia?._id}`, formData);
                if (res?.data?.success) {
                    setLoading(false);
                    toast.success(res?.data?.message);
                    setShowModal(false);
                    setImagePrev(null);
                    reset();
                }
            }
            else {
                let res = await axios.post('https://gautamsolar.us/media', formData);

                if (res?.data?.success) {
                    setLoading(false);
                    toast.success(res?.data?.message);
                    setShowModal(false);
                    setImagePrev(null);
                    reset();

                }
            }

        } catch (er) {
            console.log(er?.message);
            toast.error(er?.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleImagePrev = (e) => {
        console.log(e.target.files);
        let img = e.target.files[0]
        const blob = URL.createObjectURL(img)
        console.log(blob)
        setImagePrev(blob);
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            let res = await axios.delete(`https://gautamsolar.us/media/${id}`);
            if (res?.data?.success) {
                setLoading(false)
                toast.success(res?.data?.message);
                setShowDeleteModal(false);
                setSelectedMedia(null);
            }

        } catch (er) {
            console.log(er);
            toast.error(er?.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getMedia = async () => {
            try {
                setLoading(true);
                // let res = await axios.get(`http://localhost:1008/media?page=${page}`);
                let res = await axios.get(`https://gautamsolar.us/media?page=${page}`);

                if (res?.data?.success) {
                    setLoading(false);
                    setHasNext(res?.data?.hasNext);
                    setMedia(res?.data?.media);
                }

            } catch (er) {
                toast.error(er?.message)
                console.log(er?.message);
            }
            finally {
                setLoading(false);
            };
        }
        getMedia();

    }, [page])

    useEffect(() => {
        setValue('title', selectedMedia?.mediaTitle)
        setValue('link', selectedMedia?.mediaLink)

    }, [selectedMedia]);


    return (
        <>
            <div className="p-6 min-h-screen overflow-hidden ">
                <h1 className="text-4xl font-bold mb-6 text-[#9B2C2C]">Media</h1>

                <div className="w-full bg-gray-200 rounded-2xl py-12 px-4 sm:px-8 lg:px-16 max-h-[calc(100vh-100px)]  overflow-y-auto">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 border-b-1 border-black pb-2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                            All Media
                        </h2>
                        <button
                            className="btn bg-[#9B2C2C] hover:bg-[#7E2222] text-white px-6 py-2 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                            onClick={() => setShowModal(true)}
                        >
                            + Add Media
                        </button>
                    </div>

                    {loading ?
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="loading loading-spinner bg-[#9B2C2C] loading-lg"></span>
                        </div>
                        :
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 ">
                            {media.length > 0 ? media.map((item) => (
                                <div
                                    key={item?._id}
                                    className="group h-96 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col relative"
                                >
                                    <div className="relative h-full w-full overflow-hidden">
                                        <img

                                            src={item?.mediaImg}
                                            alt={item?.mediaTitle}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-[#9B2C2C] text-white text-xs px-3 py-1 rounded-full shadow-md">
                                            Media
                                        </div>
                                    </div>

                                    {/* Blog Content */}
                                    <div className="p-5 flex flex-col flex-1 border-t-1  border-black">
                                        <h3 className="text-sm capitalize font-semibold text-gray-900 group-hover:text-[#9B2C2C] transition-colors truncate">
                                            {item?.mediaTitle}
                                        </h3>

                                        {/* Footer with Edit & Delete */}
                                        <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-500">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setSelectedMedia(item)
                                                    }}
                                                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedMedia(item)
                                                        setShowDeleteModal(true)
                                                    }}
                                                    className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                                <div className='text-gray-500 text-center col-span-full'>
                                    No media found
                                </div>

                            }


                        </div>
                    }

                </div>
            </div>

            {showModal && (
                <div className="modal modal-open flex items-center justify-center ">
                    <div className="modal-box relative bg-slate-900 max-w-2xl mx-auto w-full rounded-xl p-8 shadow-lg">
                        <h3 className="text-3xl font-bold mb-6 text-[#9B2C2C] text-center">
                            {selectedMedia ? 'Edit' : 'Add'}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Title */}
                            <div className="flex flex-col text-black">
                                <label className="font-medium mb-1 text-white">Media Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    className="input input-bordered bg-slate-700 w-full text-white"
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>

                            {/* Link */}
                            <div className="flex flex-col text-black">
                                <label className="font-medium mb-1 text-white">Media Link</label>
                                <input
                                    type="text"
                                    placeholder="Enter Link"
                                    className="input input-bordered bg-slate-700 w-full text-white"
                                    {...register("link", { required: "Link is required" })}
                                />
                                {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
                            </div>

                            {/* Image */}
                            <div className="flex flex-col text-black">
                                <label className="font-medium mb-1 text-white">Media Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full text-white"
                                    {...register("image", { required: selectedMedia ? false : "Image is required" })}
                                    onChange={handleImagePrev}
                                />
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                                {imagePrev && (
                                    <img src={imagePrev} alt="Preview" className="w-40 h-40 object-cover rounded mt-2 border" />
                                )}
                            </div>



                            {/* Modal Actions */}
                            <div className="modal-action flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    className="btn btn-soft text-black bg-white"
                                    onClick={() => {
                                        setShowModal(false)
                                        setSelectedMedia(null);
                                        setImagePrev(null);
                                        reset()
                                    }}
                                >
                                    Cancel
                                </button>
                                {loading ? <span className=" bg-[#9B2C2C]  loading loading-spinner"></span>
                                    :
                                    <button type="submit" className="btn bg-[#9B2C2C] text-white hover:bg-red-700">
                                        {selectedMedia ? 'Edit' : 'Add'}
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
                        <h3 className="text-lg font-bold mb-4">Delete Media</h3>
                        <p className="mb-6">
                            Are you sure you want to delete the Media.

                            This action cannot be undone.
                        </p>

                        <div className="modal-action flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    setSelectedMedia(null)
                                }}
                                className="btn  btn-sm text-white bg-black"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(selectedMedia?._id)}
                                className="btn bg-red-600 hover:bg-red-700 text-white btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            }


            <Pagination
                page={page}
                setPage={setPage}
                hasNext={hasNext}
            />

        </>
    )
}

export default Media