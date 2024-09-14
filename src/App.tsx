import { useEffect, useRef, useState } from "react";
import { Dial } from "./components/Dial";
import { PostLayout } from "./components/PostLayout";
import { usePost } from "./utils/posts";
import { ThemeKey, useTheme, useThemeStore } from "./utils/themes";
import { PostSelector } from "./components/PostSelector";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";

function App() {
    const theme = useTheme();
    const selectedPost = usePost();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { setTheme, theme: themeKey } = useThemeStore((state) => state);

    // scroll to top when navigate to new post because it doesn't do that for some reason
    useEffect(() => {
        containerRef.current?.scrollTo({
            top: 0,
        });
    }, [selectedPost]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const theme = localStorage.getItem("theme") as ThemeKey;
        if (theme) {
            setTheme(theme);
        }
    }, [setTheme]);

    const handleToggleDarkMode = () => {
        const theme = themeKey === "default" ? "blue" : "default";
        setTheme(theme);
        localStorage.setItem(
            "theme",
            themeKey === "default" ? "blue" : "default"
        );
    };

    if (isMobile) {
        return (
            <div
                className="p-2 bg-gradient-to-b"
                style={{
                    background: `linear-gradient(180deg, ${theme.backgroundLight} 0%, ${theme.backgroundDark} 100%)`,
                }}
            >
                <div
                    className="mb-2 flex flex-wrap justify-between items-center px-1 rounded-sm"
                    style={{
                        background: `linear-gradient(180deg, ${theme.screenTopBarDark} 0%, ${theme.screenTopBarLight} 50%, ${theme.screenTopBarDark} 100%)`,
                    }}
                >
                    <p
                        className="flex gap-2 text-2xl"
                        style={{
                            color: theme.text,
                            fontFamily: "Lexend Zetta",
                        }}
                    >
                        théobourgeois
                    </p>
                    <div className="flex gap-2 py-1 px-2 items-center">
                        <a href="https://www.github.com/theobourgeois">
                            <FaGithub
                                className="text-lg sm:text-xl"
                                style={{
                                    color: theme.text,
                                }}
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/theobourgeois/">
                            <FaLinkedin
                                className="text-lg sm:text-xl"
                                style={{
                                    color: theme.text,
                                }}
                            />
                        </a>
                        <div
                            className="h-4 w-[1px]"
                            style={{
                                backgroundColor: theme.text,
                                opacity: 0.4,
                            }}
                        ></div>

                        <CgDarkMode
                            style={{
                                color: theme.text,
                            }}
                            className="text-lg sm:text-xl cursor-pointer"
                            onClick={handleToggleDarkMode}
                        />
                    </div>
                </div>
                <div
                    className="bg-white"
                    style={{
                        border: `5px solid ${theme.screenOutline}`,
                        borderRadius: "1px",
                        background: `linear-gradient(180deg, ${theme.screenTopBarDark} 0%, ${theme.screenTopBarLight} 50%, ${theme.screenTopBarDark} 100%)`,
                    }}
                >
                    <p
                        style={{
                            background: `linear-gradient(180deg, ${theme.screenTopBarDark} 0%, ${theme.screenTopBarLight} 50%, ${theme.screenTopBarDark} 100%)`,
                            color: theme.screenTopBarText,
                        }}
                        className="text-sm font-medium pl-1 text-center"
                    >
                        My Posts
                    </p>
                    <PostSelector />
                </div>
                <div
                    className="h-max px-4 py-2 mt-2"
                    style={{
                        background: `linear-gradient(180deg, ${theme.screenTopBarDark} 0%, ${theme.screenTopBarLight} 50%, ${theme.screenTopBarDark} 100%)`,
                    }}
                >
                    <PostLayout post={selectedPost} />
                </div>
            </div>
        );
    }

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
                        background: `linear-gradient(100deg, transparent 0%, transparent 65%, #FFFFFF30 71.2%, #FFFFFF30 79%, transparent 83%, transparent 100%)`,
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
                    className="h-[75%] justify-start relative flex flex-row items-start"
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
                        className="relative z-20 w-full h-[95%] mb-8 mx-8 mt-4 p-4 flex overflow-auto"
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
                            className="flex-1 select-none w-full sm:w-64 m-4 overflow-auto flex flex-col justify-between"
                        >
                            <div>
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
                                <PostSelector />
                            </div>
                            <div
                                style={{
                                    background: `linear-gradient(180deg, ${theme.screenTopBarDark} 0%, ${theme.screenTopBarLight} 50%, ${theme.screenTopBarDark} 100%)`,
                                }}
                                className="flex gap-2 py-1 px-2 items-center"
                            >
                                <a href="https://www.github.com/theobourgeois">
                                    <FaGithub
                                        className="text-lg sm:text-xl"
                                        style={{
                                            color: theme.text,
                                        }}
                                    />
                                </a>
                                <a href="https://www.linkedin.com/in/theobourgeois/">
                                    <FaLinkedin
                                        className="text-lg sm:text-xl"
                                        style={{
                                            color: theme.text,
                                        }}
                                    />
                                </a>
                                <div
                                    className="h-4 w-[1px]"
                                    style={{
                                        backgroundColor: theme.text,
                                        opacity: 0.4,
                                    }}
                                ></div>

                                <CgDarkMode
                                    style={{
                                        color: theme.text,
                                    }}
                                    className="text-lg sm:text-xl cursor-pointer"
                                    onClick={handleToggleDarkMode}
                                />
                            </div>
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
                    <div className="w-full h-full relative">
                        <p
                            className="flex gap-2 items-center text-xl xs:text-2xl sm:text-3xl select-none absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2 transform"
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
