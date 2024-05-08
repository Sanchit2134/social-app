'use client'
import { likeAction } from '@/actions/post.action';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { IconButton, Typography } from "@mui/material"
import { useState } from 'react';

export const LikeAction = (props) => {
    const { likes, remove, handleLike } = props

    return (
        <>
        <IconButton onClick={handleLike} >
            {!remove ? <FavoriteBorder color={likes.length ? "error" : undefined} /> : <Favorite sx={{ color: "red" }} />}
        </IconButton>
        <Typography pt={1.5}>{likes.length ? `${likes.length} ${likes.length == 1 ? 'like' : 'likes'}` : ""}</Typography>
        </>
    )
}