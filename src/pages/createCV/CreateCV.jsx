import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  DecoupledEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  List,
  Heading,
  Link,
  Image,
  ImageInsert,
  Base64UploadAdapter,
  Table,
  BlockQuote,
  MediaEmbed,
  Indent,
  IndentBlock,
  Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

// === Import Icons ===
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import DescriptionIcon from "@mui/icons-material/Description";
import Header from "../../components/Header";

const CreateCV = () => {
  // Dữ liệu HTML mẫu ban đầu của CV
  const initialCVData = `
    <div style="display: flex; gap: 20px; align-items: flex-start; margin-bottom: 20px;">
      <div style="width: 130px; height: 160px; background-color: #cbd5e1; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #fff;">
        Ảnh 3x4
      </div>
      <div style="flex: 1;">
        <h1 style="margin: 0; color: #212f3f; font-size: 28px;">Họ và Tên</h1>
        <p style="margin: 5px 0 15px 0; color: #64748b; font-size: 16px;">Vị trí ứng tuyển</p>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #4b5563; line-height: 1.8;">
          <li><strong>Ngày sinh:</strong> DD/MM/YYYY</li>
          <li><strong>Giới tính:</strong> Nam/Nữ</li>
          <li><strong>Số điện thoại:</strong> 0123 456 789</li>
          <li><strong>Email:</strong> email@example.com</li>
          <li><strong>Website:</strong> facebook.com/TopCV.vn</li>
          <li><strong>Địa chỉ:</strong> Quận A, Thành phố Hà Nội</li>
        </ul>
      </div>
    </div>
    
    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">MỤC TIÊU NGHỀ NGHIỆP</h3>
    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Mục tiêu nghề nghiệp của bạn, bao gồm mục tiêu ngắn hạn và dài hạn...</p>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">HỌC VẤN</h3>
    <div style="display: flex; margin-bottom: 15px; font-size: 14px;">
      <div style="width: 150px; color: #64748b;">Bắt đầu - Kết thúc</div>
      <div style="flex: 1;">
        <strong style="color: #212f3f;">Tên trường học</strong>
        <div style="color: #4b5563;">Ngành học / Môn học</div>
        <div style="color: #64748b; margin-top: 5px;">Mô tả quá trình học tập hoặc thành tích của bạn</div>
      </div>
    </div>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">KINH NGHIỆM LÀM VIỆC</h3>
    <div style="display: flex; margin-bottom: 15px; font-size: 14px;">
      <div style="width: 150px; color: #64748b;">Bắt đầu - Kết thúc</div>
      <div style="flex: 1;">
        <strong style="color: #212f3f;">Tên công ty</strong>
        <div style="color: #4b5563;">Vị trí công việc</div>
        <div style="color: #64748b; margin-top: 5px;">Mô tả kinh nghiệm làm việc của bạn</div>
      </div>
    </div>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">HOẠT ĐỘNG</h3>
    <div style="display: flex; margin-bottom: 15px; font-size: 14px;">
      <div style="width: 150px; color: #64748b;">Bắt đầu - Kết thúc</div>
      <div style="flex: 1;">
        <strong style="color: #212f3f;">Tên tổ chức</strong>
        <div style="color: #4b5563;">Vị trí của bạn</div>
        <div style="color: #64748b; margin-top: 5px;">Mô tả hoạt động</div>
      </div>
    </div>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">CHỨNG CHỈ</h3>
    <div style="display: flex; margin-bottom: 15px; font-size: 14px;">
      <div style="width: 150px; color: #64748b;">Thời gian</div>
      <div style="flex: 1;">
        <div style="color: #4b5563;">Tên chứng chỉ</div>
      </div>
    </div>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">DANH HIỆU VÀ GIẢI THƯỞNG</h3>
    <div style="display: flex; margin-bottom: 15px; font-size: 14px;">
      <div style="width: 150px; color: #64748b;">Thời gian</div>
      <div style="flex: 1;">
        <div style="color: #4b5563;">Tên giải thưởng</div>
      </div>
    </div>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">KỸ NĂNG</h3>
    <div style="display: flex; margin-bottom: 15px; font-size: 14px;">
      <div style="width: 150px; color: #64748b;">Tên kỹ năng</div>
      <div style="flex: 1;">
        <div style="color: #4b5563;">Mô tả kỹ năng</div>
      </div>
    </div>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">NGƯỜI GIỚI THIỆU</h3>
    <p style="color: #64748b; font-size: 14px; margin-bottom: 10px;">Thông tin người tham chiếu bao gồm tên, chức vụ và thông tin liên hệ</p>

    <hr style="border: 0; border-bottom: 2px solid #212f3f; margin: 20px 0;" />
    <h3 style="color: #212f3f; margin-bottom: 10px;">SỞ THÍCH</h3>
    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Điền các sở thích của bạn</p>
  `;

  const [editorData, setEditorData] = useState(initialCVData);

  const toolbarContainerRef = useRef(null);

  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          bgcolor: "#f4f5f5",
        }}
      >
        {/* ================= KHU VỰC CHÍNH (BÊN PHẢI) ================= */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* === Thanh Sub-header (Lưu, Xem trước) === */}
          <Box
            sx={{
              height: "60px",
              bgcolor: "#fff",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DescriptionIcon sx={{ color: "#00b14f" }} />
              <Typography
                sx={{ fontWeight: 600, color: "#212f3f", fontSize: "16px" }}
              >
                CV chưa đặt tên
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton size="small">
                <UndoIcon />
              </IconButton>
              <IconButton size="small">
                <RedoIcon />
              </IconButton>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1, my: 1.5 }}
              />
              <Button
                startIcon={<VisibilityOutlinedIcon />}
                sx={{
                  color: "#4b5563",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Xem trước
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  bgcolor: "#00b14f",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "20px",
                  px: 3,
                }}
              >
                Lưu CV
              </Button>
            </Box>
          </Box>

          <Box
            ref={toolbarContainerRef}
            sx={{
              borderBottom: "1px solid #e5e7eb",
              bgcolor: "#fafafa",
              py: 0.5,

              // Xóa viền và nền của thanh công cụ
              "& .ck-toolbar": {
                border: "none",
                bgcolor: "transparent",
              },

              // 🚨 THÊM DÒNG NÀY: Ép các nút bấm bên trong ra giữa
              "& .ck-toolbar__items": {
                justifyContent: "center",
              },
            }}
          />

          {/* === Vùng chứa Tờ giấy A4 (Khu vực cuộn) === */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              py: 4,
            }}
          >
            {/* Tờ giấy A4 */}
            <Box
              sx={{
                width: "210mm", // Chuẩn chiều ngang A4
                minHeight: "297mm", // Chuẩn chiều dọc A4
                height: "max-content",
                bgcolor: "#fff",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                p: "40px",
                "& .ck-editor__editable": {
                  border: "none !important", // Ẩn viền của CKEditor
                  boxShadow: "none !important",
                  minHeight: "100%",
                },
                "& .ck-editor__editable:focus": {
                  border: "none !important",
                  outline: "none !important",
                },
              }}
            >
              {/* CKEDITOR 5 INLINE */}
              <CKEditor
                editor={DecoupledEditor}
                config={{
                  licenseKey: "GPL",
                  // Nạp toàn bộ chức năng vào đây
                  plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic,
                    List,
                    Heading,
                    Link,
                    Image,
                    ImageInsert,
                    Base64UploadAdapter,
                    Table,
                    BlockQuote,
                    MediaEmbed,
                    Indent,
                    IndentBlock,
                    Alignment,
                  ],
                  // Sắp xếp thứ tự hiển thị các nút trên thanh công cụ
                  toolbar: [
                    "undo",
                    "redo",
                    "|",
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "|",
                    "alignment",
                    "|",
                    "link",
                    "insertImage",
                    "insertTable",
                    "blockQuote",
                    "mediaEmbed",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "outdent",
                    "indent",
                  ],
                }}
                data={editorData}
                onReady={(editor) => {
                  if (toolbarContainerRef.current) {
                    toolbarContainerRef.current.innerHTML = "";
                    toolbarContainerRef.current.appendChild(
                      editor.ui.view.toolbar.element,
                    );
                  }
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

// Component con để render nút bấm trên Sidebar
const SidebarItem = ({ icon, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      py: 2,
      cursor: "pointer",
      color: "#4b5563",
      "&:hover": { bgcolor: "#f4f5f5", color: "#00b14f" },
    }}
  >
    {React.cloneElement(icon, { fontSize: "medium" })}
    <Typography sx={{ fontSize: "12px", fontWeight: 600, textAlign: "center" }}>
      {label}
    </Typography>
  </Box>
);

export default CreateCV;
