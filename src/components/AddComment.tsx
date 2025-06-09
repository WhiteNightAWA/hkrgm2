import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import {axios} from "../main.tsx";
import {UserContext} from "../App.tsx";
import {mobileCheck} from "../data.ts";


export default function AddComment({id}: { id: string }) {
    const [can, setCan] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [images, setImages] = useState([]);

    const upload = async () => {
        const res = await axios.post(`/comments/summit/${id}`, JSON.stringify({
            title: title,
            content: content,
            images: images
        }));

        if (res.status == 200) {
            setOpen(false);
            setCan(false);
        }
    }

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };

    const userData = useContext(UserContext);

    useEffect(() => {
        console.log("test");
        (async () => {
            if (userData !== null) {
                const res = await axios.get(`/comments/check/${id}`);
                console.log(res);
                if (res.status === 200) {
                    setCan(false);
                }
            }
        })()
    }, [userData]);

    const isMobile = mobileCheck();
    return <>
        <Button
            variant={"outlined"}
            size={"small"}
            startIcon={<Add/>}
            onClick={() => setOpen(true)}
            disabled={!can || userData === null}
        >
            留言 {userData === null && "(請登入)"}
        </Button>
        <Dialog open={open} maxWidth={"md"} fullWidth fullScreen={isMobile}>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{padding: 2}}>
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        fullWidth
                        label="Title"
                    />
                    <TextField
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        fullWidth
                        multiline
                        label="Content"
                        minRows={5}
                    />

                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={5}
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageRemove,
                              dragProps
                          }) => (
                            <Stack spacing={1}>
                                <Button variant={"outlined"} fullWidth onClick={onImageUpload} {...dragProps}>
                                    Uploads Images (max: 10)
                                </Button>
                                <Stack direction={"row"}>

                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item" onClick={() => onImageRemove(index)}>
                                            <img src={image.dataURL} style={{ height: "200px" }} alt=""/>
                                        </div>
                                    ))}
                                </Stack>
                                <Typography color={"textSecondary"} fontSize={"small"}>
                                    *click the image to delete
                                </Typography>
                            </Stack>
                        )}
                    </ImageUploading>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Typography color={"textSecondary"} fontSize={"small"}>
                    *請注意上傳後您將無法編輯您的評論（暫時）
                </Typography>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant={"contained"} color={"success"} onClick={upload}>Upload</Button>
            </DialogActions>
        </Dialog>
    </>;

}