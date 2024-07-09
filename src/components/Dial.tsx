import { useEffect, useState } from "react";
import { useTheme } from "../utils/themes";
import { PostSlug, posts, usePostStore } from "../utils/posts";

export function Dial() {
    const theme = useTheme();
    const [rotation, setRotation] = useState(0);
    const setPost = usePostStore((state) => state.setPost);

    useEffect(() => {
        const rotationRatio = (Math.abs(rotation) % 360) / 360;
        const postSlugs = Object.keys(posts);
        const numOfPost = postSlugs.length;
        const postIndex = Math.floor(numOfPost * rotationRatio) % numOfPost;
        const post = postSlugs[postIndex] as PostSlug;
        setPost(post);
    }, [rotation, setPost]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const dialElement = e.currentTarget;
        let y = e.clientY;
        const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
            const deltaY = e.clientY - y;
            const dialBoundingBox = dialElement.getBoundingClientRect();
            const middleOfDial = dialBoundingBox.x + dialBoundingBox.width / 2;
            const isOnLeftSide = e.clientX < middleOfDial;
            if (isOnLeftSide) {
                setRotation((prev) => {
                    return prev - deltaY;
                });
            } else {
                setRotation((prev) => {
                    return prev + deltaY;
                });
            }
            y = e.clientY;
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        handleMouseMove(e);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(white, ${theme.primary} 80deg, ${theme.primaryDarker},  ${theme.primary}, ${theme.primary}, ${theme.primaryDarker}, white, ${theme.primary}, white)`,
                boxShadow: `0px 0px 4px 1px #00000040`,
            }}
            className="rounded-full hidden sm:flex w-44 h-44 mb-6 bg-black justify-center items-center p-1"
        >
            <div
                style={{
                    background: `conic-gradient(white, ${theme.primary}, ${theme.primaryDarker} 80deg, ${theme.primary}, white, ${theme.primary}, ${theme.primaryDarker}, ${theme.primary}, white)`,
                }}
                className="rounded-full w-full h-full bg-white"
            ></div>
        </div>
    );
}
