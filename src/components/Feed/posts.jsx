"use client";

import { getPostById, getPosts, likeAction } from "@/actions/post.action";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { auth } from "@/config/auth";
import { LikeAction } from "./Actions/like-action";
import { CommentsAction } from "./Actions/comment-action";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { userAction } from "@/actions/user.action";
import { socket } from "@/app/socket";

export const Posts = () => {
    const [posts, setPost] = useState([])
    console.log('posts: ', posts);
    const [id, setId] = useState("")
    const session = useSession()

    const handleLike = async (postId, userId) => {
        socket.emit('likepost', { postId, userId })
    }

    const handleComment = async (postId, userId, comment) => {
        console.log('postId, userId, comment: ', postId, userId, comment);
        socket.emit('commentpost', { postId, userId, text: comment })
    }

    const fetchPosts = async () => {
        const data = await getPosts()
        setPost(data)
    }

    useEffect(() => {
        if (socket.connected) console.log("connected");
        socket.on("connection", () => console.log("connected"));
        socket.on("updateComment", async (data) => {
            console.log("🚀 ~ socket.on ~ data:", data);
            setPost(pre => {
                return pre.map((temppost) => {
                    if (temppost._id === data._id) {
                        return data
                    }
                    return temppost;
                })
            })
        });
        socket.on("updatePost", async (data) => {
            const { postId } = data
            const post = await getPostById(postId)
            setPost(pre => {
                return pre.map((temppost) => {
                    if (temppost._id === postId) {
                        return post
                    }
                    return temppost;
                })
            })
        });
        (async () => {
            const user = await userAction({ email: session.data.user.email })
            setId(user._id)
        })()
        fetchPosts()
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: "1rem",
        }}>
            {posts.map((post) => {
                const { _id, mediaURL, email, description, likes, comments } = post
                return (
                    <Stack sx={{ border: '1px solid #eeeeee', width: "400px", boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', }}>
                        <Stack p={2}>
                            <Typography variant="subtitle2" fontWeight={700}>{email}</Typography>
                        </Stack>
                        {mediaURL.substring('jpg') ? <img src={post.mediaURL} alt="post" width={'100%'} height={300} />
                            :
                            <video src={mediaURL} controls
                                loop
                                muted
                                autoPlay />
                        }
                        <Typography p={2}>{description}</Typography>

                        <Stack direction={'row'} gap={3} justifyContent={'space-between'} p={1}>
                            <LikeAction likes={likes} remove={likes.includes(id)} handleLike={() => handleLike(_id, id)} />
                            <CommentsAction comments={comments} handleComment={(comment) => handleComment(_id, id, comment)} />
                        </Stack>
                        {/* <Typography sx={{ pl: 2 }}>{likes.length ? likes.length : ""} {!likes.length ? "" : likes}</Typography> */}
                    </Stack>
                )
            })}
        </Box>
    );
}