import { useEffect } from "react";
import { PostSlug, posts, usePostStore } from "../utils/posts";
import { useSkipFirstRenderEffect } from "../utils/hook";
import { useTheme } from "../utils/themes";

export function PostSelector() {
    const selectedPostSlug = usePostStore((state) => state.post);
    const theme = useTheme();
    const setPost = usePostStore((state) => state.setPost);

    useSkipFirstRenderEffect(() => {
        window.history.replaceState(null, "", `?post=${selectedPostSlug}`);
    }, [selectedPostSlug]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const post = params.get("post") as PostSlug;
        if (post && Object.keys(posts).includes(post)) {
            setPost(post);
        }
    }, [setPost]);

    const handleChangePost = (post: PostSlug) => () => {
        setPost(post);
    };

    return (
        <div className="overflow-auto h-[220px] sm:h-auto">
            {(Object.keys(posts) as PostSlug[]).map((postSlug) => (
                <div
                    key={postSlug}
                    style={{
                        background:
                            postSlug === selectedPostSlug
                                ? `linear-gradient(180deg, ${theme.accentLight} 0%, ${theme.accentDark} 100%)`
                                : "none",
                        color:
                            postSlug === selectedPostSlug
                                ? theme.screenTextAlt
                                : theme.screenText,
                    }}
                    className="py-1 text-lg hover:underline cursor-pointer font-medium px-2"
                    onClick={handleChangePost(postSlug)}
                >
                    {posts[postSlug].title}
                </div>
            ))}
        </div>
    );
}
