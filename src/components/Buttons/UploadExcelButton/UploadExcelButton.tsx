import React, { useRef } from 'react';
import { Button, Icon, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosClient from './../../../config/axios';

interface Props {
  getCars: () => void;
  setOpenExcelSuccessModal: (open: boolean) => void;
}

const UploadExcelButton = ({getCars, setOpenExcelSuccessModal}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnChangeAndUploadFile = async () => {
    const file = inputRef.current?.files?.[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const responseExcel = await axiosClient.post('/api/cars/upload-excel', data);
      if (responseExcel.status === 201) {
        setOpenExcelSuccessModal(true);
      }
      getCars();
    }
  }

  return (
    <>
    <Tooltip title="Sube un archivo .xlsx o .csv">
      <Button sx={{mt:4, mr:2, mb: 2}} size="medium" variant="contained"  onClick={handleClick} endIcon={<CloudUploadIcon />} >
        Subir Excel
      </Button>
    </Tooltip>
      <input onChange={handleOnChangeAndUploadFile} hidden accept=".xlsx, .csv" type="file" ref={inputRef} />
    </>
  );
};

export default UploadExcelButton;

