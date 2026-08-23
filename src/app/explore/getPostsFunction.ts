import { ApiResponse } from "./types";


export async function getPosts(page: number = 1, search: string = ''): Promise<ApiResponse> {
    const limit = 10;
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
    });

    try {
        const res = await fetch(`https://vine-and-views-backend.vercel.app/posts?${params.toString()}`, {
            // Next.js caching: revalidate every hour (3600s) or customize as needed
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts (${res.status})`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { totalPages: 1, currentPage: 1, data: [] };
    }
}