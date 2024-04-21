'use client';
import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { getNewsWorld } from "../api/newWorld";
import Image from "next/image";

interface PostDrawerProps {
    params: {
        slug: number;
    };
}

export default function PostDrawer({ params }: PostDrawerProps) {
    const [worldNews, setWorldNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWorldNews = async () => {
        try {
            const promise = await getNewsWorld();
            if (!promise) {
                return;
            }
            console.log(promise);
            setWorldNews(promise);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchWorldNews();
    }, []);

    const desiredPost = worldNews.find((item: any) => item.title === params.slug) as any;

    return (
        <>
            {desiredPost && (
                <Drawer key={desiredPost.title}>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Read more</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="min-h-0.5 mx-4 mb-10 gap-4">
                            <DrawerHeader>
                                <DrawerTitle>{desiredPost.title}</DrawerTitle>
                                <DrawerDescription>{desiredPost.text}</DrawerDescription>
                            </DrawerHeader>
                            <div className="flex flex-col md:flex-row items-center justify-center space-x-4 space-y-6 ">
                                <Image
                                    alt="Product image"
                                    src={desiredPost.urlToImage || "/placeholder.png"}
                                    width={500}
                                    height={300}
                                    className="rounded-lg"
                                />
                                <p className="md:tex-2xl w-1/2 px-10 ">
                                    {desiredPost.description}
                                </p>
                            </div>
                            <DrawerFooter className="items-center justify-center ">
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-fit">
                                        Back
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
}
