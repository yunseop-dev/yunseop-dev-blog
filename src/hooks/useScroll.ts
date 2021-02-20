import { useEffect, useState } from "react";

const useInfinityScroll = (onLoadMore?: Function, condition: boolean = true) => {
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const handleScroll = () => {
        setIsBottom(false);
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight && condition) {
            setIsBottom(true);
            onLoadMore?.();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    return isBottom;
}

export default useInfinityScroll;