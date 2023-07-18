import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./style.css";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useDispatch, useSelector } from "react-redux";
import { uploadFolderList, setJsonData } from "../store/reducer/userReducer";
import { RootState } from "../store/Store";
import useFetchData from "../hook/useFetchData";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { type } from "os";

interface FileUploadState {
  files: File[];
}
export interface fileAddToState {
  id: number;
  uploadedFile?: string;
  files: File[];
}

export default function ImageDisplay() {
  const dispatch = useDispatch();

  const [fileUpload, setFileUpload] = useState<FileUploadState>({
    files: [],
  });
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const uploadList = useSelector(
    (state: RootState) => state.users.uploadedFiles
  );

  const selectedFolder = useSelector(
    (state: RootState) => state.users.selectedFolder
  );

  const data = useSelector((state: RootState) => state.users.value);

  const { insertNode } = useFetchData();

  const handleDropImg = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDropSecondImg = () => {
    document.getElementById("fileInputNormal")?.click();
  };

  // select any file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const selectedFileArray = Array.from(selectedFiles || []);
    const updatedFiles = [...selectedFileArray];
    console.log("update", updatedFiles);

    if (selectedFolder) {
      for (const file of selectedFileArray) {
        const finalTree = insertNode(
          data,
          selectedFolder.id,
          file.name,
          false,
          file.size,
          file.type,
          file.lastModified
        );
        console.log("tree", finalTree);
        dispatch(setJsonData({ data: finalTree, id: selectedFolder.id }));
      }
    }
    setFileUpload((prev) => ({ ...prev, files: updatedFiles }));
  };

  // drop-any-file
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (selectedFolder) {
      for (const file of droppedFiles) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          dispatch(uploadFolderList(file));

          const finalTree = insertNode(
            data,
            selectedFolder.id,
            file.name,
            false,
            file.size,
            file.type,
            file.lastModified
          );
          dispatch(setJsonData({ data: finalTree, id: selectedFolder.id }));
        };
        reader.readAsDataURL(file);
        setIsFileUploaded(true);
      }
    } else {
      alert("Please select a folder!!");
      setFileUpload({ files: [] });
    }
  };

  //  drag-over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCloseAlert = () => {
    setIsFileUploaded(false);
  };

  return (
    <>
      {/* alert box display  */}
      <Box>
        {isFileUploaded && (
          <Alert
            onClose={() => {
              handleCloseAlert();
            }}
          >
            file uploaded successfully !!
          </Alert>
        )}
      </Box>

      <Box onDrop={handleDrop} onDragOver={handleDragOver}>
        {uploadList && uploadList.files.length > 0 ? (
          <>
            <input
              className="input_box"
              style={{ display: "none" }}
              type="file"
              id="fileInputNormal"
              onChange={handleFileChange}
              multiple
              accept="image/png, image/jpeg , .tsx , .jsx , .html , .js , .ts , .txt , .css"
            />

            <Button
              sx={{ marginTop: "7%", marginLeft: "50%" }}
              onClick={handleDropSecondImg}
            >
              <FileUploadIcon />
            </Button>
          </>
        ) : (
          []
        )}

        <Box>
          {!uploadList && (
            <Box mt={1}>
              <input
                data-cy="img_upload"
                className="input_box"
                style={{ display: "none" }}
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                multiple
                accept="image/png, image/jpeg, .tsx, .jsx, .html, .js, .ts, .txt, .css"
              />
              <IconButton className="icon_plus" onClick={handleDropImg}>
                <DriveFolderUploadIcon sx={{ fontSize: "80px" }} />
              </IconButton>
              <Typography data-cy="image_upload">
                No images / files selected
              </Typography>
            </Box>
          )}

          <Box mt={2}>
            {uploadList?.files.map((file: File, index: number) => (
              <Box
                key={index}
                sx={{
                  marginTop: "7%",
                  border: 1,
                  marginX: "10%",
                  paddingY: "4%",
                }}
              >
                {file.type.includes("image/") ? (
                  <img
                    className="image_part"
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                  />
                ) : (
                  <span>📄{file.name}</span>
                )}
                <Typography data-cy="image_name" variant="body2">
                  file-name: {file.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
