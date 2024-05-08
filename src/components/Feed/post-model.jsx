'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState, useTransition } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ref as firebseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { getPosts, postAction } from '@/actions/post.action';
import { useSession } from 'next-auth/react';
import { storage } from '@/config/firebase';
import LoadingButton from '@mui/lab/LoadingButton';
import { Posts } from './posts';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const PostModal = () => {
    const session = useSession()
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [isVideo, setIsVideo] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleMediaPreview = (e) => {
        const selectedMedia = e.target.files[0];
        if (selectedMedia.size > 5 * 1024 * 1024) {
            return alert("Selected file is too large only max 5MB is allowed");
        }
        setIsVideo(selectedMedia.type.startsWith("video/")); // Returns true if the selected media is a video
        setMedia(selectedMedia);
        setMediaPreview(URL.createObjectURL(selectedMedia));
    };

    const submit = async () => {
        const description = ref?.current.value;
        if (!description || !media) return;
        setLoading(true)

        try {
            const mediaRef = firebseRef(storage, `${media.name + v4()}`);
            await uploadBytes(mediaRef, media);

            const downloadURL = await getDownloadURL(mediaRef);
            await postAction({
                description,
                mediaURL: downloadURL,
                email: session?.data?.user?.email,
            })
            setOpen(false)
            await getPosts()
            console.log('reaaaaaaaa')
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)

    }

    return (
        <>
            <Dialog
                open={open}
                fullWidth
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Create a Post</DialogTitle>
                <DialogContent>
                    <Stack pt={1} gap={2}>
                        <TextField inputRef={ref} label='Description' placeholder='Description' />
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file" accept=".jpg,.png,.mp4 .mkv"  onChange={handleMediaPreview} />
                        </Button>

                    </Stack>
                    {mediaPreview && <Typography variant='h6'>Preview</Typography>}
                    {mediaPreview && isVideo && (
                        <video
                            src={mediaPreview}
                            alt=""
                            style={{ width: "100%", height: "400px", marginTop: "10px" }}
                            controls
                        />
                    )}
                    {mediaPreview && !isVideo && (
                        <img
                            src={mediaPreview}
                            alt=""
                            style={{ width: "100%", height: "400px", marginTop: "10px" }}
                        />
                    )}

                </DialogContent>

                <DialogActions>
                    {!loading ? <Button disabled={!media || !(ref.current && ref.current.value)} onClick={submit} variant='contained'>
                        Add
                    </Button> :
                        <LoadingButton loading variant="outlined">
                            Submit
                        </LoadingButton>
                    }
                </DialogActions>
            </Dialog>
            <Stack position={'fixed'} bottom={30} right={40}>
                <Button variant='contained' onClick={() => setOpen(true)}>Add A Post</Button>
            </Stack>
        </>
    )
}

export default PostModal