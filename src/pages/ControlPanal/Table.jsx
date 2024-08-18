import React, { useEffect, useState } from "react";
import "./Table.css";
import { Checkbox } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import setting from "../../assets/Images/control/Vector.svg";
import menu from "../../assets/Images/control/menu-vertical.svg";
import htmlicon from "../../assets/Images/control/xxx-word (1).svg";
import txticon from "../../assets/Images/control/txt-file-type-svgrepo-com 1 (1).svg";
import pdficon from "../../assets/Images/control/pdf-file-type-svgrepo-com 2.svg";
import docxicon from "../../assets/Images/control/pdf-file-type-svgrepo-com 1.svg";
import editicon from "../../assets/Images/control/edit-1.svg";
import delicon from "../../assets/Images/control/shape.svg";
import Menu from "@mui/material/Menu";
import { exportToFile } from "@/helpers/exportToFile";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useDispatch } from "react-redux";
import html2pdf from 'html2pdf.js';
import {deleteData,updateData,patchData }from "../../redux/slices/apiSlice"

import Modal from '@mui/material/Modal';
import { Box, Typography, Button, TextField } from '@mui/material';
import jsPDF from 'jspdf';
import Tajawal from '../../assets/fonts/GESSTwoMedium-Medium.ttf'; // Adjust the path to your font file
import toast from "react-hot-toast";
import { useLazyDeleteTableItemQuery } from "../../redux/api/mutqinApi";
import MarkdownIt from "markdown-it";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 
  boxShadow: 10,
  p: 4,
};

export default function TableC({datatable,loading,handleDeleteUpdate }) {
  const md = new MarkdownIt();

  const [editIndex, setEditIndex] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [inputText, setInputText] = useState('');
  const [openMenus, setOpenMenus] = React.useState({});
  const dispatch = useDispatch() 
  const navigate = useNavigate();
  
  const [deleted, setDeleted] = useState(false); // State to track deletion
  const handleMenuClick = (id) => (event) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: event.currentTarget,
    }));
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleUpdate = (endpoint, title) => {
    dispatch(patchData({ endpoint, title:title }))
      .then(() => {
        toast.success('تم التعديل بنجاح');
        handleDeleteUpdate(true)
        handleCloseModal(true)
        
      })
      .catch((error) => {
        toast.error(' خطأ في التعديل إعد المحاولة');
      });
  };
  


  const handleClose = (id) => () => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: null,
    }));
  };
  
  const handleRenameInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleSubmitRename = (endpoint) => {
    // Do something with the submitted text, e.g., send it to a server
    handleUpdate(endpoint,inputText)

    setEditIndex(null);
    // Reset the input field
    setInputText('');
  };
  const downloadTxtFile = (text, filename ) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTextAsHtml = (text, fileName) => {
    const htmlContent = `<html><head><title>${fileName}</title></head><body>${text}</body></html>`;
    const dataUri = `data:text/html,${encodeURIComponent(htmlContent)}`;
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `${fileName}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadhtml = (text) => {
    
    const fileName = 'example';
    downloadTextAsHtml(text, fileName);
  };

  const handleRenameItemClick = (index) => {
    handleClose(); // Close the modal
    handleOpenModal(); // Open the modal
    setEditIndex(index);
   
  };

  const [pdf, setPdf] = React.useState(null);
  function stripHtml(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }
  const handleConvertAndDownload = (text) => {
    const doc = new jsPDF();
  
    doc.addFont(Tajawal, 'ge_ss_two', 'normal'); // Register the font
    doc.setFontSize(14); // Set the font size to 14
    doc.setFont('ge_ss_two', 'normal'); // Set the font
  
    const lineHeight = 6; // Set the line height for the text
  
    let y = 20; // Initial y-coordinate
    let lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20); // Split text into lines
  
    // Set text direction to RTL
    doc.setLanguage('ar');
    doc.setDocumentProperties({
      language: 'ar',
    });
  
    lines.forEach((line) => {
      if (y + lineHeight > doc.internal.pageSize.height - 20) {
        doc.addPage(); // Add a new page if the text exceeds the page height
        y = 20; // Reset y-coordinate for the new page
      }
      doc.text(line, doc.internal.pageSize.width - 10, y, { align: 'right' }); // Add the line of text
      y += lineHeight; // Increment y-coordinate for the next line
    });
  
    const pdfBlob = doc.output('blob');
  
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  
  const convertTextToDocxAndDownload = (text) => {
    const content = `<p>${text}</p>`;
    const template = new Docxtemplater(content);
    const buffer = template.render().getZip().generate({ type: 'nodebuffer' });
  
    saveAs(new Blob([buffer]), 'document.docx');
  };

  const theme = createTheme({
  direction: 'rtl', // Set the direction to RTL
    typography: {
    
      fontFamily: "Tajawal, sans-serif",
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "15px",
            fontWeight: 600,
          },
        },
      },
    },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

const[handledelete,{error,data}]=useLazyDeleteTableItemQuery() 
  const handleDelete = (delete_url) => {
  
    handledelete(`https://backend.mutqinai.com/api/${delete_url}`) 
    .then(() => {
          toast.success('تم الحذف بنجاح');
          setDeleted(true); // Set the state to trigger re-render
          handleDeleteUpdate(true)
        })
        .catch((error) => {
          toast.error('يرجى إعادة المحاولة مره أخرى');
        });

  };
  useEffect(() => {
    if (deleted) {
      // Call any necessary functions or API calls here
      // Reset the state after re-rendering
      setDeleted(false); 
    }
  }, [deleted]);

  if (loading)
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center  justify-content-center"
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return (
    <ThemeProvider theme={theme}>
      <div className="table-c mt-5 font-basic>">
        <div className="d-flex w-100  mt-3 ">
          <div className="d-flex ">
        
          </div>
          <div className="d-flex w-100  rounded align-items-center py-2 pb-0 ">
            <div className=" col-xl-7 col-lg-7 col-xxl-7 col-md-6 col-5 pb-0   ">
              <p
                className=" pe-3  pb-0 me-md-0 "
                style={{ color: "rgba(0, 27, 121, 1)" }}
              >
                {"الاسم"}
              </p>
            </div>
            <div className="col-4  text-center  pb-0">
              <p>
                <p
                  className=" w-50 me-3 me-md-0 me-xl-0 me-lg-0 me-xxl-0  text-center "
                  style={{ color: "rgba(0, 27, 121, 1)" }}
                >
                  الحالة
                </p>
              </p>
            </div>
            <div className="col-lg-1 col-xl-1 col-xxl-1 col-md-1 col-3  text-center   pb-0  text-muted">
              <p style={{ color: "rgba(0, 27, 121, 1)" }}>{"تم إنشاءه"}</p>
            </div>
          </div>
          <div className=" ">
            <div className=" d-flex justify-content-center  p-0">
              <div>
                <Button>
                  <LazyLoadImage
                    src={setting}
                    className="img d-block text-end me-auto "
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {!datatable ? (
          <h6 className="py-4 opacity-75 text-center text-muted">سجل الأنشطة فارغ الان</h6>
        ) : (
          <>
          {datatable?.map((item, i) => {
            const menuId = `menu-${i}`;
            const isOpen = Boolean(openMenus[menuId]);
            return (
              <div className="d-flex w-100  mt-3 " key={i}>
           
                <div className="d-flex ">
                
                </div>
                { editIndex !== i ?   <div className="d-flex w-100 border  rounded align-items-center py-2 pb-0 ">
                <div className=" col-xl-7 col-lg-7 col-xxl-7 col-md-6 col-5 pb-0   " onClick={() => handleNavigate(`/${item?.reteive_url}`)}>
             
                <div className=" row  justify-content-start ">
                <div className=" col-3 p-0 col-md-1 col-xxl-1 col-lg-1 col-xl-1  ">
                <img src={item?.icon_url}  className=" me-3  me-xl-4 me-xxl-4 me-lg-4 me-md-4 " style={ {width:"20px"}} />
              
            
                </div>
              
             <div className=" col-9 col-md-11 col-xxl-11 col-lg-11 col-xl-11 ps-4 p-md-0 p-lg-0 p-xxl-0 p-xl-0  ">          
             <p className="   pb-0 me-md-0 text-muted">
             
            {  item?.title.slice(0, 40)}...

            

            
             
             
             
             </p>
               </div>
   
                </div>
    
                </div>
                <div className="col-4  text-center  pb-0">
                  <p>
                    {!item.state ? (
                      <p>{" "}</p>
                    ) : (
                      <p className=" w-50 text-center text-muted"> {`كلمة ${item.state}`} </p>
                    )}
                  </p>
                </div>
                <div className="col-1 text-center   pb-0  text-muted">
                  <p className="text-muted">
                  {item.created_at}
                  
                  </p>
                </div>
              </div>:   <>
                 
              <div className="d-flex w-100 border border-4 rounded align-items-center  pb-0 ">
              <div className=" col-xl-7 col-lg-7 col-xxl-7 col-md-6 col-5 pb-0   " >
              <div className=" text-decoration-none">
              <form className=" row  justify-content-start ">
              <div className=" col-3 p-0 col-md-1 col-xxl-1 col-lg-1 col-xl-1  ">
              <img src={editicon}  className=" me-3  me-xl-4 me-xxl-4 me-lg-4 me-md-4 " style={ {width:"20px"}} />
            
          
              </div>
            
           <div className=" col-9 col-md-11 col-xxl-11 col-lg-11 col-xl-11 ps-4 p-md-0 p-lg-0 p-xxl-0 p-xl-0  ">          
          
        
           <input className="   bg-white  outline-0 border border-0  pb-0 me-md-0 text-muted"   id="outlined-basic"
           placeholder="تعديل إسم الملف  "
          
           value={inputText}
           onChange={handleRenameInputChange}/>
          
     
          

          
           
           
           
          
             </div>
 
              </form>
            </div>
              </div>
              <div className="col-4  text-center  pb-0">
      
              </div>
              <div className="col-1 text-center   pb-0  text-muted">
              <Button
              onClick={() => handleSubmitRename(item.update_url)}
              sx={{
                width: 'auto',
                color: 'rgba(0, 27, 121, 1)',
                pointerEvents: inputText.trim() === '' ? 'none' : 'auto',
                opacity: inputText.trim() === '' ? 0.5 : 1,
              }}
            >
            حفظ
            </Button>
              </div>
            </div> 
                  
                  </>}
              
                <div className=" ">
                  <div className=" d-flex justify-content-center  p-0">
                    <div>
                      <Button
                      id={menuId}
                      className="basic-button text-move"
                      aria-controls={isOpen ? menuId : undefined}
                      aria-haspopup="true"
                      aria-expanded={isOpen ? "true" : undefined}
                      onClick={handleMenuClick(menuId)}
  
                      >
                        <LazyLoadImage
                          src={menu}
                          className="img d-block text-end me-auto "
                        />
                      </Button>
                      <Menu
                      id={menuId}
                      anchorEl={openMenus[menuId]}
                      open={isOpen}
                      className="text-move"
                      onClose={handleClose(menuId)}
                      dir="rtl"
                      MenuListProps={{
                        "aria-labelledby": menuId,
                      }}
                      PaperProps={{
                        elevation: 1, // Adjust the elevation as per your requirement
                      }}
  
                      >
                        <MenuItem onClick={()=>handleRenameItemClick(i)} className=" text-move">
                          <img src={editicon}  className="ps-2" />
                          اعاده تسميه
                        </MenuItem>
           
                        <span className=" text-move fw-light ms-5 p-3">
                          تصدير
                        </span>
                        
                        <Typography variant="body1" onClick={()=>handleDownloadhtml(item.content_to_export)}>
  
                          <MenuItem onClick={handleClose} className=" text-move">
                            <img src={htmlicon} className="ps-2" />
                            HTML
                          </MenuItem>
                        </Typography>
                        <Typography variant="body1"  onClick={()=>downloadTxtFile(item.content_to_export ,"text")}>
                          <MenuItem onClick={handleClose} className=" text-move">
                            <img src={txticon} className="ps-2" />
                            TXT
                          </MenuItem>
                        </Typography>
                        <Typography variant="body1">
                          <MenuItem onClick={handleClose} className=" text-move">
                          <div>
   
                          <img src={pdficon} className="ps-2"  onClick={()=>handleConvertAndDownload(stripHtml(item.content_to_export))}/>
                          <span >PDF</span>
                          </div>
                        
                          </MenuItem>
                        </Typography>
                        <Typography variant="body1"  onClick={()=>exportToFile(item.content_to_export,"word")}>
  
                          <MenuItem
                            onClick={handleClose}
                            className=" text-move fw-bold "
                          >
                            <img src={docxicon} className="ps-2" />
                            DOCX
                          </MenuItem>
                        </Typography>
                        <MenuItem onClick={handleClose(menuId)} className=" text-danger">
                        <div onClick={() => handleDelete(item.delete_url)}>
                          <img src={delicon} className="ps-2" />
                          حذف
                        </div>
                      </MenuItem>
                      </Menu>
                    </div>
                  </div>
          
                </div>
              </div>
            );
          })}
          </>
        )}
      
      </div>
    </ThemeProvider>
  );
}
