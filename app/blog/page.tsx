"use client";
import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getNewsWorld } from "../api/newWorld";
import PostDrawer from "../[id]/page";
import { PrismaClient } from "@prisma/client";



export default function BlogPage() {
  const [worldNews, setWorldNews] = useState([]);
  const [loading, setLoading] = useState(true);


      const prisma = new PrismaClient();

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

  async function test() {
      const user = await prisma.user.create({
        data: {
          email: "chegecolins@gmail.com",
          name: "colins chege",
          posts: {
            create: { title: "Hello World" },
          },
        },
      });
    }
    test();

 return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">News Blog</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-4">
            {worldNews.map((item: any) => (
              <div key={item.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.text}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        src={item.urlToImage || "/placeholder.png"}
                        width={500}
                        height={300}
                      />
                      <p>{item.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <PostDrawer params={{
                      slug: item.title,
                    }} />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

