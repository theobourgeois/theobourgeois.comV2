import { useEffect, useRef } from "react";
import { Dial } from "./components/Dial";
import { PostLayout } from "./components/PostLayout";
import { PostSlug, posts, usePost, usePostStore } from "./utils/posts";
import { useTheme } from "./utils/themes";
import { useSkipFirstRenderEffect } from "./utils/hook";

function App() {
    const theme = useTheme();
    const selectedPost = usePost();
    const selectedPostSlug = usePostStore((state) => state.post);
    const setPost = usePostStore((state) => state.setPost);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChangePost = (post: PostSlug) => () => {
        setPost(post);
    };

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

    // scroll to top when navigate to new post because it doesn't do that for some reason
    useEffect(() => {
        containerRef.current?.scrollTo({
            top: 0,
        });
    }, [selectedPost]);

    return (
        <div
            style={{
                background: `linear-gradient(180deg, ${theme.backgroundLight} 0%, ${theme.backgroundDark} 100%)`,
            }}
            className="w-screen h-screen flex items-center justify-center"
        >
            <div
                style={{
                    filter: "drop-shadow(10px 10px 10px #00000050)",
                }}
                className="w-[98%] h-[97%]"
            >
                <div
                    className="w-full h-full absolute z-30"
                    style={{
                        background: `linear-gradient(100deg, transparent 0%, transparent 70%, #FFFFFF30 71.2%, #FFFFFF30 79%, transparent 81%, transparent 100%)`,
                        mixBlendMode: "overlay",
                        pointerEvents: "none",
                    }}
                ></div>
                <div
                    className="w-full h-full absolute z-10"
                    style={{
                        background: `url(/brushedmetal.jpg)`,
                        backgroundSize: "cover",
                        mixBlendMode: "soft-light",
                        clipPath:
                            "polygon(1% 0, 99% 0, 100% 5%, 100% 92%, 99.5% 100%, 0.5% 100%, 0.1% 92%, 0 5%)",
                        pointerEvents: "none",
                    }}
                ></div>

                <div
                    className="h-[5%]"
                    style={{
                        backgroundColor: theme.primaryDark,
                        clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)",
                        overflow: "hidden",
                    }}
                ></div>
                <div
                    className="h-[75%] relative flex flex-col-reverse sm:flex-row items-start"
                    style={{
                        background: `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primaryLight} 50%, ${theme.primaryDark} 100%)`,
                        backgroundSize: "cover",
                        boxShadow: `inset -2px -2px 2px 2px ${theme.primaryDark},inset 2px 2px 2px 2px ${theme.primaryLight}`,
                    }}
                >
                    <div
                        style={{
                            border: `10px solid ${theme.screenOutline}`,
                            borderRadius: "2px",
                            background: `linear-gradient(180deg, ${theme.screenLight} 0%, ${theme.screen} 100%)`,
                        }}
                        ref={containerRef}
                        className="relative z-20 flex-1 sm:h-[95%] m-4 flex overflow-auto"
                    >
                        <PostLayout post={selectedPost} />
                    </div>

                    <div className="flex-row-reverse sm:w-auto w-full flex sm:flex-col items-end sm:items-center sm:h-full relative z-20">
                        <div
                            style={{
                                border: `10px solid ${theme.screenOutline}`,
                                borderRadius: "2px",
                                background: `linear-gradient(180deg, ${theme.screenLight} 0%, ${theme.screen} 100%)`,
                            }}
                            className="flex-1 select-none w-full sm:w-64 m-4 overflow-auto flex flex-col"
                        >
                            <div
                                style={{
                                    background: `linear-gradient(180deg, ${theme.screenTopBarDark} 0%, ${theme.screenTopBarLight} 50%, ${theme.screenTopBarDark} 100%)`,
                                }}
                                className="flex justify-center items-center"
                            >
                                <p
                                    style={{
                                        color: theme.screenTopBarText,
                                    }}
                                    className="text-sm font-medium"
                                >
                                    My Posts
                                </p>
                            </div>
                            {(Object.keys(posts) as PostSlug[]).map(
                                (postSlug) => (
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
                                )
                            )}
                        </div>
                        <Dial />
                    </div>
                </div>
                <div
                    className="h-[0.5%] mx-auto w-[99.8%] bg-black"
                    style={{
                        backgroundColor: theme.screenOutline,
                    }}
                ></div>
                <div
                    className="h-[12%] relative"
                    style={{
                        background: `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primaryLight} 50%, ${theme.primaryDark} 100%)`,
                        boxShadow: `inset -2px 0px 2px 2px ${theme.primaryDark},inset 2px -2px 2px 2px ${theme.primaryLight}`,
                    }}
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <p
                            className="text-3xl select-none"
                            style={{
                                color: theme.text,
                                fontFamily: "Lexend Zetta",
                            }}
                        >
                            théobourgeois
                        </p>
                    </div>
                </div>
                <div
                    className="h-[7.5%]"
                    style={{
                        backgroundColor: theme.primaryDark2,
                        clipPath:
                            "polygon(0 0%, 100% 0, 99.5% 100%, 0.5% 100%)",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default App;
