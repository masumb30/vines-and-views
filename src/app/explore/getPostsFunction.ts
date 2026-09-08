import { ApiResponse } from "./types";


export async function getPosts(page: number = 1, search: string = ''): Promise<ApiResponse> {
    const limit = 10;
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
    });

    try {
        console.log(process.env.NEXT_PUBLIC_API_URL);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${params.toString()}`); 
        console.log('Fetched posts response: ', res);

        if (!res.ok) {
            throw new Error(`Failed to fetch posts, res not okay (${res.status})`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching posts: caught error: ', error);
        return { totalPages: 1, currentPage: 1, data: [] };
    }
}