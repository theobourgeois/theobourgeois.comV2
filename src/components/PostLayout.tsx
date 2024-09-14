import { Post } from "../utils/posts";
import { useTheme } from "../utils/themes";

export function PostLayout({ post }: { post: Post }) {
    const theme = useTheme();

    return (
        <div
            style={{
                color: theme.screenText,
            }}
            className="h-max w-full space-y-2 mt-4 [&_h1]:text-5xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-semibold [&_a]:text-blue-600 [&_ul]:normal-nums"
        >
            <div className="h-full w-full flex flex-col pb-4 justify-between">
                <div className="">
                    <h1
                        style={{
                            color: theme.accent,
                        }}
                    >
                        {post.title}
                    </h1>
                    <p>{post.description}</p>
                </div>
                <img
                    className="mt-2 aspect-video h-auto w-[750px]"
                    src={post.image}
                    alt={post.title}
                />
                <div className="flex flex-col my-2">
                    {post.website && (
                        <p className="font-semibold">
                            Wesbite:{" "}
                            <a
                                style={{
                                    color: theme.accent,
                                }}
                                className="font-normal"
                                href={post.website}
                            >
                                {post.website}
                            </a>
                        </p>
                    )}
                    {post.github && (
                        <p className="font-semibold">
                            Github:{" "}
                            <a
                                style={{
                                    color: theme.accent,
                                }}
                                className="font-normal"
                                href={post.github}
                            >
                                {post.github}
                            </a>
                        </p>
                    )}
                </div>
            </div>
            {post.content}
            <div className="h-4"></div>
        </div>
    );
}
