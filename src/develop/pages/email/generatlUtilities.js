import Reac from "react";
import {
  MailOutlined,
  SendOutlined,
  EditOutlined,
  StarBorderOutlined,
  ErrorOutlineOutlined,
  DeleteOutline,
} from "@mui/icons-material";

export default function nullFunction() { };

export const getIcons = (tag, color="inherit", size="small") => {
    switch (tag) {
      case "inb":
        return <MailOutlined sx={{ color: color }} fontSize={size} />;
      case "snt":
        return <SendOutlined sx={{ color: color }} fontSize={size} />;
      case "dft":
        return <EditOutlined sx={{ color: color }} fontSize={size} />;
      case "std":
        return <StarBorderOutlined sx={{ color: color }} fontSize={size} />;
      case "spm":
        return <ErrorOutlineOutlined sx={{ color: color }} fontSize={size} />;
      case "trs":
        return <DeleteOutline sx={{ color: color }} fontSize={size} />;
      default:
        return null;
    }
};
  
export const colorsArray = (type) => {
    switch (type) {
      case 'personal': return "#56CA00";
      case 'company': return "#9155FD";
      case 'important': return "#FFB400";
      default: return "#FF4C51";
    }
  }
  
// const colorsArray = ["#9155FD", "#FF4C51", "#FFB400", "#16B1FF", "#56CA00"];
    
export const Dot = ({ title }) => {
return (
    <div
    style={{
        marginRight: "15px",
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colorsArray(title),
    }}
    />
);
};