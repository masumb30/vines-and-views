import { formatDate } from '@/utils/functions'
import Link from 'next/link'
import React from 'react'

const PostCard = ({ post }: { post: any }) => {
    return (
        <>
            <Link href="/explore/1">
                <article
                    key={post.title}
                    // onClick={() => setSelectedPost(post)}
                    className="group flex flex-col justify-between bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                >
                    <div>
                        {/* Image Thumbnail with badge overlay */}
                        <div className="relative h-56 w-full overflow-hidden bg-stone-150 dark:bg-stone-950 border-b border-stone-100 dark:border-stone-850">
                            {post.thumbnail ? (
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100 dark:bg-stone-800">
                                    No image available
                                </div>
                            )}

                            {/* Tags list overlaid top-left */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[85%]">
                                {post.tags.slice(0, 2).map((tag: any) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-extrabold uppercase tracking-wider bg-orange-600 dark:bg-orange-400 text-stone-50 dark:text-stone-950 px-2.5 py-1 rounded-full shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {post.tags.length > 2 && (
                                    <span className="text-[10px] font-extrabold bg-stone-900/80 backdrop-blur-sm text-stone-50 px-2 py-1 rounded-full">
                                        +{post.tags.length - 2}
                                    </span>
                                )}
                            </div>

                            {/* Reading Time Badge bottom-right */}
                            <div className="absolute bottom-4 right-4 bg-stone-900/85 backdrop-blur-sm text-stone-100 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                time
                            </div>
                        </div>

                        {/* Card Content body */}
                        <div className="p-6">

                            {/* Publish Date */}
                            <span className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-2">
                                Published {formatDate(post.createdAt)}
                            </span>

                            {/* Title */}
                            <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-50 leading-snug tracking-tight mb-3 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                {post.title}
                            </h3>

                            {/* Truncated Content */}
                            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed line-clamp-3 mb-4">
                                {post.content}
                            </p>

                            {/* Author row */}
                            <div className="flex items-center gap-3 border-t border-stone-100 dark:border-stone-850 pt-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center font-extrabold text-xs shadow-inner">
                                    {post.user.name.split(" ").map((n: any) => n[0]).join("").toUpperCase().slice(0, 2)}
                                </div>
                                <div>
                                    <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                                        {post.user.name}
                                    </p>
                                    <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider">
                                        Gardener ID: {post.userId.replace("usr_", "")}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Interactive footer actions */}
                    <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">

                        {/* Likes count */}
                        <button
                            // onClick={(e) => handleLikeToggle(e, post.title)}
                            className={`flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/like focus:outline-none`}
                        // aria-label={isLiked ? "Unlike post" : "Like post"}
                        >
                            <svg
                                className={`w-4 h-4 transition-transform group-hover/like:scale-125 ${true ? "fill-orange-600 stroke-orange-600 text-orange-600 dark:fill-orange-400 dark:stroke-orange-400 dark:text-orange-400" : "currentColor"
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className={true ? "text-orange-600 dark:text-orange-400 font-bold" : ""}>
                                {post.likes}
                            </span>
                        </button>

                        {/* Comments count */}
                        <div className="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                            <svg className="w-4 h-4 text-stone-400 dark:text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.comments || 0}</span>
                        </div>

                        {/* Expand CTA */}
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
                            Read
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>

                </article>

            </Link>
        </>
    )
}

export default PostCard